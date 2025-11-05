import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // admin-portal API로 프록시
    const adminApiUrl = process.env.ADMIN_API_URL || 'https://admin-three-pearl.vercel.app';
    const response = await fetch(`${adminApiUrl}/api/reports/${id}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Report not found' },
          { status: 404 }
        );
      }
      throw new Error(`Admin API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;
