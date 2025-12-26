"use client";

import { Suspense } from "react";
import SurveyForm from "./SurveyForm";

export default function SurveyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003DA5] mx-auto mb-4"></div>
            <p className="text-gray-600">설문 페이지를 불러오는 중...</p>
          </div>
        </div>
      }
    >
      <SurveyForm />
    </Suspense>
  );
}
