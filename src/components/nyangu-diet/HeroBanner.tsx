'use client';

interface HeroBannerProps {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function HeroBanner({ title, description, variant = 'primary' }: HeroBannerProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#003DA5] to-[#0052CC] text-white',
    secondary: 'bg-[#F4F8FF] border border-[#D6E4FF] text-[#003DA5]',
    accent: 'bg-[#FFF4E6] border border-[#FCD34D] text-[#92400E]',
  };

  return (
    <section className={`${variants[variant]} rounded-2xl p-6 md:p-8 lg:p-10 text-center`}>
      <h2 className="text-[20px] md:text-[28px] lg:text-[32px] font-bold leading-tight mb-3 md:mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed opacity-90 max-w-4xl mx-auto">
          {description}
        </p>
      )}
    </section>
  );
}

