import { NextRequest, NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'pageId is required' },
        { status: 400 }
      );
    }

    // NotionAPI를 사용하여 페이지 데이터 가져오기 (서버 사이드에서만 작동)
    const recordMap = await notion.getPage(pageId);

    return NextResponse.json({
      success: true,
      recordMap,
    });
  } catch (error) {
    console.error('[Notion API] Error fetching page:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Notion page'
      },
      { status: 500 }
    );
  }
}

