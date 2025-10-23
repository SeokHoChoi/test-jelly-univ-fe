'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { id: 'summary', label: '사료 분석 요약', path: '/brief-report' },
  { id: 'diet', label: '맞춤 분석', path: '/brief-report/diet-report' },
];

const ReportTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname?.endsWith('/diet-report') ? 'diet' : 'summary';

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full flex justify-center">
      <nav>
        <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-gray-200 overflow-x-auto">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleClick(t.path)}
                className={`whitespace-nowrap h-10 px-5 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${isActive ? 'bg-[#003DA5] text-white shadow' : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                  }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ReportTabs;


