import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const searchParams = request.nextUrl.searchParams;

    // URL 파라미터에서 에러 정보 추출
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    const orderId = searchParams.get('orderId');

    // 또는 formData에서 추출
    const resultCode = formData.get('resultCode') as string;
    const resultMsg = formData.get('resultMsg') as string;
    const tid = formData.get('tid') as string;

    // 결제 취소/실패 처리
    if (error === 'approve_failed' || (resultCode && resultCode !== '0000')) {
      const redirectUrl = `/payment/result?error=approve_failed&message=${encodeURIComponent(message || resultMsg || '결제에 실패했습니다.')}&orderId=${orderId || ''}`;

      // HTML 응답으로 클라이언트 측 리다이렉트 수행
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>결제 처리 중...</title>
          </head>
          <body>
            <script>
              window.location.href = '${redirectUrl}';
            </script>
            <noscript>
              <meta http-equiv="refresh" content="0;url=${redirectUrl}">
            </noscript>
          </body>
        </html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        }
      );
    }

    // 결제 성공 처리
    const successUrl = `/payment/result?tid=${tid || ''}&orderId=${orderId || ''}&amount=${formData.get('amount') || ''}`;

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>결제 처리 중...</title>
        </head>
        <body>
          <script>
            window.location.href = '${successUrl}';
          </script>
          <noscript>
            <meta http-equiv="refresh" content="0;url=${successUrl}">
          </noscript>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );

  } catch (error) {
    console.error('Payment result processing error:', error);

    const errorUrl = '/payment/result?error=server_error&message=' + encodeURIComponent('결제 처리 중 오류가 발생했습니다.');

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>결제 처리 중...</title>
        </head>
        <body>
          <script>
            window.location.href = '${errorUrl}';
          </script>
          <noscript>
            <meta http-equiv="refresh" content="0;url=${errorUrl}">
          </noscript>
        </body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }
}

// GET 요청 처리
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');
  const tid = searchParams.get('tid');
  const amount = searchParams.get('amount');

  let redirectUrl: string;

  if (error) {
    redirectUrl = `/payment/result?error=${error}&message=${encodeURIComponent(message || '결제에 실패했습니다.')}&orderId=${orderId || ''}`;
  } else {
    redirectUrl = `/payment/result?tid=${tid || ''}&orderId=${orderId || ''}&amount=${amount || ''}`;
  }

  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>결제 처리 중...</title>
      </head>
      <body>
        <script>
          window.location.href = '${redirectUrl}';
        </script>
        <noscript>
          <meta http-equiv="refresh" content="0;url=${redirectUrl}">
        </noscript>
      </body>
    </html>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  );
}
