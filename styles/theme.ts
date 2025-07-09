export const colors = {
  primary: '#6366f1',
  primaryLight: '#e0e7ff',
  secondary: '#f59e0b',
  background: '#ffffff',
  surface: '#f8fafc',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    light: '#94a3b8',
    white: '#ffffff',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    focus: '#6366f1',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontSize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};