interface StatusIndicatorProps {
  status: 'critical' | 'warning' | 'good';
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator = ({ status, size = 'md' }: StatusIndicatorProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3 text-[16px]',
    md: 'w-4 h-4 text-[18px]',
    lg: 'w-5 h-5 text-[20px]'
  };

  const statusEmojis = {
    critical: '🔴',
    warning: '🟡',
    good: '🟢'
  };

  return (
    <span className={`${sizeClasses[size]} inline-flex items-center justify-center`}>
      {statusEmojis[status]}
    </span>
  );
};

export default StatusIndicator;
