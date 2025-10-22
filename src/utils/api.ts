// API 서비스 함수들

const INTERNAL_API_BASE_URL = '/api';

export interface FoodSearchResult {
  id: number;
  brand_name: string;
  product_name: string;
  crude_protein: string;
  crude_fat: string;
  crude_fiber: string;
  crude_ash: string;
  moisture: string;
  calcium: string;
  phosphorus: string;
  omega3: string;
  omega6: string;
  dha: string | null;
  epa: string | null;
  thumbnail_url: string;
  description: string;
  country_of_origin: string;
}

export interface FoodSearchResponse {
  success: boolean;
  data: FoodSearchResult[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// 사료 검색 API (내부 API Routes 사용)
export const searchFoods = async (
  query: string,
  limit: number = 10,
  offset: number = 0
): Promise<FoodSearchResponse> => {
  try {
    const response = await fetch(
      `${INTERNAL_API_BASE_URL}/foods/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('사료 검색 API 에러:', error);
    throw error;
  }
};

// 품종 검색 API (내부 API Routes 사용)
export const searchDogBreeds = async (query: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `${INTERNAL_API_BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('품종 검색 API 에러:', error);
    // 에러 시 빈 배열 반환
    return [];
  }
};

// API 헬스 체크 (내부 API Routes 사용)
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${INTERNAL_API_BASE_URL}/foods/search?q=test&limit=1`);
    return response.ok;
  } catch (error) {
    console.error('API 헬스 체크 실패:', error);
    return false;
  }
};

// 사료 등급 평가 요청 (내부 API Routes 사용)
export interface RatingFeedInput {
  name: string;
  amount: string; // g
}

export interface RatingRequestBody {
  dogName: string;
  dogWeight: string;
  dogBreed: string;
  feeds: RatingFeedInput[]; // 1~3개
}

export const submitRating = async (payload: RatingRequestBody) => {
  const response = await fetch(`${INTERNAL_API_BASE_URL}/rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || `HTTP error! status: ${response.status}`;

    // 404 에러인 경우 특별히 처리
    if (response.status === 404) {
      const error = new Error(message);
      (error as any).status = 404;
      throw error;
    }

    throw new Error(message);
  }

  return response.json();
};

// 사료 상세 조회 API
export interface FoodDetail extends FoodSearchResult {
  target_age?: string;
  manufacturer?: string;
  importer?: string;
  package_sizes?: string;
  crawled_from?: string;
  data_quality_score?: number;
  created_at?: string;
  updated_at?: string;
  product_type?: string;
  additional_images?: string[];
  price?: number;
  category?: string;
  ingredients_text?: string;
  nutrition_text?: string;
}

export const getFoodDetail = async (id: number): Promise<{ success: boolean; data: FoodDetail }> => {
  const resp = await fetch(`${INTERNAL_API_BASE_URL}/foods/${id}`);
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error || `HTTP error! status: ${resp.status}`);
  }
  return resp.json();
};
