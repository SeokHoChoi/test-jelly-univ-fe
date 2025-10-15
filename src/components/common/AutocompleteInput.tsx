'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search } from 'lucide-react';

export interface AutocompleteOption {
  id: string | number;
  label: string;
  subtitle?: string;
  thumbnail?: string;
  isDirectInput?: boolean;
  originalData?: unknown;
}

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: AutocompleteOption) => void;
  placeholder: string;
  searchFunction: (query: string) => Promise<AutocompleteOption[]>;
  minSearchLength?: number;
  className?: string;
  disabled?: boolean;
}

const AutocompleteInput = ({
  value,
  onChange,
  onSelect,
  placeholder,
  searchFunction,
  minSearchLength = 1,
  className = '',
  disabled = false
}: AutocompleteInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 검색 실행
  const performSearch = useCallback(async (query: string) => {
    if (query.length < minSearchLength) {
      setOptions([]);
      setIsOpen(false);
      return;
    }

    // 검색 시작 즉시 패널을 열고 로딩 표시
    setIsLoading(true);
    setIsOpen(true);
    try {
      const results = await searchFunction(query);
      setOptions(results);
      // 결과 유무와 상관없이 패널은 열린 상태 유지 (빈 결과 UI/직접입력 노출)
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('검색 에러:', error);
      setOptions([]);
      // 에러 시에도 패널을 열어 빈 상태/직접입력 UI를 노출
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchFunction, minSearchLength]);

  // 디바운스된 검색
  useEffect(() => {
    if (!isFocused) {
      // 입력 포커스가 아닐 때는 검색하지 않음 (선택 후 재오픈 방지)
      return;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value, performSearch, isFocused]);

  // 전역 닫기 이벤트 구독: 다른 자동완성 인풋이 포커스되면 즉시 닫힘
  useEffect(() => {
    const handleCloseAll = () => {
      setIsOpen(false);
      setOptions([]);
      setSelectedIndex(-1);
    };
    window.addEventListener('autocomplete:closeAll', handleCloseAll as EventListener);
    return () => window.removeEventListener('autocomplete:closeAll', handleCloseAll as EventListener);
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    onSelect(option);
    setIsOpen(false);
    setOptions([]);
    setSelectedIndex(-1);
    setIsFocused(false);
    // 선택 직후 포커스 해제하여 디바운스 검색으로 재오픈되는 현상 방지
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || options.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < options.length) {
          handleOptionSelect(options[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            // 먼저 다른 자동완성들을 모두 닫게 전역 이벤트 발행
            window.dispatchEvent(new Event('autocomplete:closeAll'));
            setIsFocused(true);
            if (options.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            // 입력창 포커스 이탈 시 포커스 상태만 해제 (외부 클릭 핸들러가 닫기 담당)
            setIsFocused(false);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-4 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-brand-blue focus:border-transparent pr-12 text-[18px] font-normal ${className}`}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-[20px] shadow-lg max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2">검색 중...</p>
            </div>
          ) : options.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Search className="mx-auto mb-2 text-gray-400" size={24} />
              <p>검색 결과가 없습니다</p>
              {value.length >= minSearchLength && (
                <div
                  className="mt-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => handleOptionSelect({
                    id: 'direct',
                    label: '직접 입력하기',
                    subtitle: `"${value}"`,
                    isDirectInput: true
                  })}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 font-bold">+</span>
                      <span className="text-blue-600 font-medium">직접 입력하기</span>
                    </div>
                    <span className="text-blue-500 text-sm">클릭</span>
                  </div>
                  <p className="text-blue-500 text-sm mt-1">&quot;{value}&quot;</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-2">
              {options.map((option, index) => (
                <div
                  key={option.id}
                  className={`px-4 py-3 cursor-pointer transition-colors ${index === selectedIndex
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                    } ${index === 0 ? 'rounded-t-[20px]' : ''} ${index === options.length - 1 ? 'rounded-b-[20px]' : ''
                    }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.isDirectInput ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">+</span>
                          <span className="text-blue-600 font-medium">{option.label}</span>
                        </div>
                        <span className="text-blue-500 text-sm">클릭</span>
                      </div>
                      {option.subtitle && (
                        <p className="text-blue-500 text-sm mt-1">{option.subtitle}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {option.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={option.thumbnail}
                          alt={option.label}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{option.label}</p>
                        {option.subtitle && (
                          <p className="text-sm text-gray-500">{option.subtitle}</p>
                        )}
                      </div>
                      <span className="text-gray-400">+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
