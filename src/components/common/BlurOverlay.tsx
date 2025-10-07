import { cn } from '@/utils/cn';

interface BlurOverlayProps {
  blurLevel?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
}

const BlurOverlay = ({
  blurLevel = 'md',
  children,
  className,
}: BlurOverlayProps) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <div className={cn('relative', className)}>
      <div className={cn('filter', blurClasses[blurLevel])}>
        {children}
      </div>
    </div>
  );
};

export default BlurOverlay;
