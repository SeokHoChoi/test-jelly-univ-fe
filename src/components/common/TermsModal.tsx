'use client';

// import { useState } from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const TermsModal = ({ isOpen, onClose, title, content }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {content.split('\n').map((raw, idx) => {
            const line = raw.endsWith('\r') ? raw.slice(0, -1) : raw;
            const trimmed = line.trim();
            if (trimmed.length === 0) {
              return <div key={idx} className="h-2" />;
            }
            const isHeading = /^제\d+조\s*\(/.test(trimmed);
            const isEffective = /^\[시행일자:/.test(trimmed);
            const isList = /^\s*-\s/.test(line);
            const baseClass = 'leading-relaxed text-gray-800';
            const sizeClass = 'text-sm md:text-base';
            const headingClass = isHeading || isEffective ? 'font-bold text-gray-900 mt-4' : '';
            const listIndent = isList ? 'pl-5' : '';
            return (
              <p key={idx} className={`${baseClass} ${sizeClass} ${headingClass} ${listIndent} mb-2 whitespace-pre-wrap`}>
                {line}
              </p>
            );
          })}
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-brand-blue text-white py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
