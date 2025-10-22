import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero-primary' | 'hero-secondary';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';

    const variants = {
      primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark active:bg-brand-blue-dark',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
      outline: 'border border-[#003DA5] text-[#003DA5] bg-white hover:bg-gray-50 active:bg-gray-100',
      ghost: 'text-brand-blue hover:bg-brand-blue-light active:bg-brand-blue-light',
      'hero-primary': 'bg-[#003DA5] text-white !font-bold hover:bg-[#002A7A] active:bg-[#001F5C]',
      'hero-secondary': 'bg-white text-[#1E1E1E] !font-bold hover:bg-gray-50 active:bg-gray-100 border-0',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      hero: 'px-[22.5px] sm:px-8 py-[11px] sm:py-4 text-xs sm:text-xl rounded-xl whitespace-nowrap',
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
