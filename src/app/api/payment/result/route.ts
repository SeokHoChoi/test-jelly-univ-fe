import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== 나이스페이 POST 요청 수신 ===');
    
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    let resultData: Record<string, string> = {};

    // FormData로 시도
    if (contentType?.includes('form')) {
      const formData = await request.formData();
      console.log('FormData 항목들:');
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
        resultData[String(key)] = String(value);
      }
    }
    // JSON으로 시도
    else if (contentType?.includes('json')) {
      resultData = await request.json();
      console.log('JSON 데이터:', resultData);
    }
    // 일반 텍스트로 시도
    else {
      const text = await request.text();
      console.log('Raw text:', text);
      
      const params = new URLSearchParams(text);
      for (const [key, value] of params.entries()) {
        console.log(`  ${key}:`, value);
        resultData[key] = value;
      }
    }

    console.log('파싱된 resultData:', resultData);

    // 필드명 수정: authResultCode, authResultMsg 사용
    const tid = resultData.tid || resultData.TID || resultData.transactionId || null;
    const orderId = resultData.orderId || resultData.orderNo || resultData.ORDERID || null;
    const amount = resultData.amount || resultData.Amt || resultData.AMOUNT || null;
    const resultCode = resultData.authResultCode || resultData.resultCode || resultData.ResultCode || null;
    const resultMsg = resultData.authResultMsg || resultData.resultMsg || resultData.ResultMsg || null;
    const authToken = resultData.authToken || null;

    console.log('추출된 값들:', { tid, orderId, amount, resultCode, resultMsg, authToken });

    // 결제 성공 시 (authResultCode가 0000이면 성공)
    if (resultCode === '0000' && tid) {
      console.log('✅ 결제 성공 - 리다이렉트');
      const redirectUrl = new URL('/payment/result', request.url);
      redirectUrl.searchParams.set('success', 'true');
      redirectUrl.searchParams.set('tid', tid as string);
      redirectUrl.searchParams.set('orderId', orderId as string);
      redirectUrl.searchParams.set('amount', amount as string);
      if (authToken) {
        redirectUrl.searchParams.set('authToken', authToken as string);
      }

      return NextResponse.redirect(redirectUrl);
    }

    // TID가 없거나 실패
    console.log('❌ 결제 실패 또는 TID 없음');
    const errorUrl = new URL('/payment/result', request.url);
    errorUrl.searchParams.set('error', 'approve_failed');
    errorUrl.searchParams.set('message', resultMsg || 'TID를 받지 못했습니다');
    errorUrl.searchParams.set('orderId', orderId || '');

    return NextResponse.redirect(errorUrl);

  } catch (error) {
    console.error('결제 결과 처리 오류:', error);
    const errorUrl = new URL('/payment/result', request.url);
    errorUrl.searchParams.set('error', 'server_error');
    return NextResponse.redirect(errorUrl);
  }
}

export async function GET(request: NextRequest) {
  console.log('=== GET 요청 수신 ===');
  const searchParams = request.nextUrl.searchParams;
  
  console.log('모든 파라미터:');
  for (const [key, value] of searchParams.entries()) {
    console.log(`  ${key}:`, value);
  }
  
  return NextResponse.redirect(new URL(`/payment/result${request.nextUrl.search}`, request.url));
}
