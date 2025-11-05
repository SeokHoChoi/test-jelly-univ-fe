export interface FoodInfo {
  // 기본 정보
  brand_name: string;
  product_name: string;

  // 영양 성분 (DM% 또는 as-fed%)
  crude_protein: number | null;
  crude_fat: number | null;
  crude_fiber: number | null;
  crude_ash: number | null;
  moisture: number | null;
  calcium: number | null;
  phosphorus: number | null;
  omega_6: number | null;
  omega_3: number | null;

  // 원재료 및 제조 정보
  ingredients_text?: string;
  country_of_origin?: string;
  certifications?: string;
}

export interface DogInfo {
  name: string;
  breed: string;
  weight: number;
  age?: number;
}

export interface EvaluationResult {
  grade: string;
  score: number;
  details: Record<string, unknown>;
  fatalFlaws?: string[];
  displayText?: string; // 리포트에 표시될 설명 텍스트
}

export interface CategoryResults {
  '1-1_nutrition_reliability': EvaluationResult;
  '1-2_transparency': EvaluationResult;
  '2-1_macro_balance': EvaluationResult;
  '2-2_mineral_balance': EvaluationResult;
  '2-3_fatty_acid_balance': EvaluationResult;
  '3-1_ingredient_quality': EvaluationResult;
  '3-2_manufacturing_quality': EvaluationResult;
  '4_safety_certification': EvaluationResult;
}

export interface SectionResult {
  grade: string;
  score: number;
}

export interface SectionResults {
  nutrition_reliability: SectionResult;
  nutrition_balance: SectionResult;
  ingredient_quality: SectionResult;
  manufacturing_quality: SectionResult;
}

export interface FoodEvaluation {
  categoryResults: CategoryResults;
  sectionResults: SectionResults;
  overallScore: number;
  overallGrade: string;
}
