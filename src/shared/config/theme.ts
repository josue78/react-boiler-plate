/**
 * Theme Configuration
 * 
 * Application color palette
 * Supports both light and dark modes with full color shade system (0-9)
 */

import { createTheme } from '@mantine/core';

// Infer the theme type from createTheme function
type ThemeOverride = Parameters<typeof createTheme>[0];

/**
 * Application Color Palette
 */
export const appColors = {
  // Primary: Blue (#0056A6)
  primary: [
    '#E6F2FF', // 0 - lightest
    '#CCE5FF', // 1
    '#99CBFF', // 2
    '#66B0FF', // 3
    '#3396FF', // 4
    '#007BFF', // 5 - base
    '#0056A6', // 6 - primary
    '#004080', // 7
    '#002B5A', // 8
    '#001633', // 9 - darkest
  ],
  
  // Secondary: Dark Gray (#333333)
  secondary: [
    '#F5F5F5', // 0 - lightest
    '#E0E0E0', // 1
    '#CCCCCC', // 2
    '#999999', // 3
    '#666666', // 4
    '#4D4D4D', // 5
    '#333333', // 6 - secondary
    '#262626', // 7
    '#1A1A1A', // 8
    '#0D0D0D', // 9 - darkest
  ],
  
  // Success: Green (#28A745)
  success: [
    '#D4EDDA', // 0 - lightest
    '#C3E6CB', // 1
    '#A3D9B0', // 2
    '#7FCC95', // 3
    '#5CBF7A', // 4
    '#3DB25F', // 5
    '#28A745', // 6 - base
    '#1E7E34', // 7
    '#155724', // 8
    '#0C3D14', // 9 - darkest
  ],
  
  // Warning: Yellow (#FFC107)
  warning: [
    '#FFF8E1', // 0 - lightest
    '#FFECB3', // 1
    '#FFE082', // 2
    '#FFD54F', // 3
    '#FFCA28', // 4
    '#FFC107', // 5 - base
    '#FFB300', // 6
    '#FF8F00', // 7
    '#FF6F00', // 8
    '#E65100', // 9 - darkest
  ],
  
  // Error: Red (#DC3545)
  error: [
    '#F8D7DA', // 0 - lightest
    '#F5C6CB', // 1
    '#F1AEB5', // 2
    '#ED969E', // 3
    '#E97E88', // 4
    '#E55C6A', // 5
    '#DC3545', // 6 - base
    '#C82333', // 7
    '#A02030', // 8
    '#7A1A26', // 9 - darkest
  ],
  
  // Info: Light Blue (#17A2B8)
  info: [
    '#D1ECF1', // 0 - lightest
    '#BEE5EB', // 1
    '#9DD0DB', // 2
    '#7BBBCB', // 3
    '#5AA6BB', // 4
    '#3E91AB', // 5
    '#17A2B8', // 6 - base
    '#138496', // 7
    '#0E6674', // 8
    '#0A4852', // 9 - darkest
  ],
} as const;

/**
 * Mantine theme configuration with application color palette
 */
export const appTheme: ThemeOverride = {
  primaryColor: 'primary',
  primaryShade: 6,
  
  colors: {
    primary: appColors.primary,
    secondary: appColors.secondary,
    success: appColors.success,
    warning: appColors.warning,
    error: appColors.error,
    info: appColors.info,
  },
  
  defaultRadius: 'md',
  
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '700' },
      h2: { fontSize: '2rem', lineHeight: '1.3', fontWeight: '600' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4', fontWeight: '600' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '600' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '600' },
      h6: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '600' },
    },
  },
  
  other: {
    // Custom brand colors for direct access
    brandColors: {
      primary: '#0056A6',
      secondary: '#333333',
      success: '#28A745',
      warning: '#FFC107',
      error: '#DC3545',
      info: '#17A2B8',
    },
  },
};

