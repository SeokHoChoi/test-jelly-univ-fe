'use client';

import AutocompleteInput from './AutocompleteInput';
import { searchDogBreeds } from '@/utils/api';

interface BreedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (breed: string | null) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

const BreedSearchInput = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className = '',
  disabled = false
}: BreedSearchInputProps) => {

  const searchFunction = async (query: string) => {
    try {
      const breeds = await searchDogBreeds(query);

      // 품종 목록을 AutocompleteOption 형태로 변환
      const options = breeds.map((breed: string) => ({
        id: breed,
        label: breed,
        originalData: breed
      }));

      // 직접 입력 옵션 추가
      if (query.length >= 1) {
        options.unshift({
          id: 'direct',
          label: '직접 입력하기',
          subtitle: `"${query}"`,
          isDirectInput: true
        } as any);
      }

      return options;
    } catch (error) {
      console.error('품종 검색 에러:', error);
      // 에러 시에도 직접 입력 옵션 제공
      return [{
        id: 'direct',
        label: '직접 입력하기',
        subtitle: `"${query}"`,
        isDirectInput: true
      } as any];
    }
  };

  const handleSelect = (option: any) => {
    if (option.isDirectInput) {
      // 직접 입력 선택 시
      onSelect(null);
    } else {
      // 품종 선택 시
      const breed = option.originalData as string;
      onChange(breed);
      onSelect(breed);
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

export default BreedSearchInput;
