'use client';

import AutocompleteInput, { AutocompleteOption } from './AutocompleteInput';
import { searchFoods, FoodSearchResult } from '@/utils/api';

interface FoodSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (food: FoodSearchResult | null) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

const FoodSearchInput = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className = '',
  disabled = false
}: FoodSearchInputProps) => {

  const searchFunction = async (query: string) => {
    try {
      const response = await searchFoods(query, 10);

      // API 응답을 AutocompleteOption 형태로 변환
      const options: AutocompleteOption[] = response.data.map((food: FoodSearchResult) => ({
        id: food.id.toString(),
        label: `${food.brand_name} ${food.product_name}`,
        subtitle: `단백질 ${food.crude_protein}% 지방 ${food.crude_fat}%`,
        thumbnail: food.thumbnail_url,
        originalData: food
      }));

      // 직접 입력 옵션 추가
      if (query.length >= 1) {
        options.unshift({
          id: 'direct',
          label: '직접 입력하기',
          subtitle: `"${query}"`,
          thumbnail: '',
          isDirectInput: true,
          originalData: null
        } as AutocompleteOption);
      }

      return options;
    } catch (error) {
      console.error('사료 검색 에러:', error);
      // 에러 시에도 직접 입력 옵션 제공
      return [{
        id: 'direct',
        label: '직접 입력하기',
        subtitle: `"${query}"`,
        thumbnail: '',
        isDirectInput: true,
        originalData: null
      } as AutocompleteOption];
    }
  };

  const handleSelect = (option: AutocompleteOption) => {
    if (option.isDirectInput) {
      // 직접 입력 선택 시
      onSelect(null);
    } else {
      // 사료 선택 시
      const food = option.originalData as FoodSearchResult;
      onChange(`${food.brand_name} ${food.product_name}`);
      onSelect(food);
    }
  };

  return (
    <AutocompleteInput
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
      placeholder={placeholder}
      searchFunction={searchFunction}
      minSearchLength={1}
      className={className}
      disabled={disabled}
    />
  );
};

export default FoodSearchInput;
