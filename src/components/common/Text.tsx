import { cn } from '@/utils/cn';

interface TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  className?: string;
  children: React.ReactNode;
}

const Text = ({ variant = 'body', className, children }: TextProps) => {
  const variants = {
    title: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900',
    subtitle: 'text-xl md:text-2xl font-semibold text-gray-800',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-600',
  };

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
};

export default Text;
