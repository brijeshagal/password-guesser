export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    error: string;
    border: string;
    inputBg: string;
    inputBorder: string;
    inputFocus: string;
  };
  gradients: {
    background: string;
    primary: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'base',
    name: 'Base Fellowship',
    colors: {
      primary: '#0052f',
      secondary: '#7C3AED',
      background: '#F8FAFF',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#475569',
      success: '#059669',
      error: '#DC2626',
      border: '#E2E8F0',
      inputBg: '#FFFFFF',
      inputBorder: '#CBD5E1',
      inputFocus: '#0052f',
    },
    gradients: {
      background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    },
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#60A5FA',
      secondary: '#A78BFA',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      success: '#34D399',
      error: '#F87171',
      border: '#374151',
      inputBg: '#374151',
      inputBorder: '#4B5563',
      inputFocus: '#60A5FA',
    },
    gradients: {
      background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      primary: 'bg-gradient-to-r from-blue-500 to-purple-500',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    colors: {
      primary: '#0EA5E9',
      secondary: '#06B6D4',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#475569',
      success: '#059669',
      error: '#DC2626',
      border: '#E2E8F0',
      inputBg: '#FFFFFF',
      inputBorder: '#CBD5E1',
      inputFocus: '#0EA5E9',
    },
    gradients: {
      background: 'bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50',
      primary: 'bg-gradient-to-r from-sky-500 to-cyan-500',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: {
      primary: '#F59E0B',
      secondary: '#EC4899',
      background: '#FEF3C7',
      surface: '#FFFFFF',
      text: '#92400E',
      textSecondary: '#B45309',
      success: '#059669',
      error: '#DC2626',
      border: '#FDE68A',
      inputBg: '#FFFFFF',
      inputBorder: '#FCD34D',
      inputFocus: '#F59E0B',
    },
    gradients: {
      background: 'bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50',
      primary: 'bg-gradient-to-r from-amber-500 to-pink-500',
    },
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#064E3B',
      textSecondary: '#065F46',
      success: '#059669',
      error: '#DC2626',
      border: '#BBF7D0',
      inputBg: '#FFFFFF',
      inputBorder: '#86EFAC',
      inputFocus: '#059669',
    },
    gradients: {
      background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      primary: 'bg-gradient-to-r from-green-600 to-emerald-600',
    },
  },
];

export const getTheme = (id: string): Theme => {
  return themes.find(theme => theme.id === id) || themes[0];
};

export const getDefaultTheme = (): Theme => {
  return themes[0]; // Base Fellowship theme
}; 