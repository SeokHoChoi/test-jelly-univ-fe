export const BRAND_COLORS = {
  blue: '#003DA5',
  blueLight: '#E6F0FF',
  blueDark: '#002A7A',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const NAVIGATION_ITEMS = [
  { label: '서비스', href: '/service' },
  { label: '플랜', href: '/plans' },
  { label: '후기', href: '/reviews' },
] as const;

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Email', href: '#', icon: 'mail' },
] as const;
