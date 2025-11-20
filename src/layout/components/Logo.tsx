/**
 * Logo Component
 *
 * Fictional logo component for the application header.
 * Responsive and supports both light and dark modes.
 */

import { Box, useMantineTheme, useMantineColorScheme } from '@mantine/core';

interface LogoProps {
  /** Height of the logo in pixels */
  height?: number;
  /** Width of the logo in pixels (auto if not specified) */
  width?: number;
}

/**
 * Fictional logo component
 *
 * @example
 * ```tsx
 * <Logo height={32} />
 * ```
 */
export function Logo({ height = 32, width }: LogoProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const logoWidth = width || height * 2.5;

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        height: `${height}px`,
        width: `${logoWidth}px`,
      }}
    >
      <svg
        width={logoWidth}
        height={height}
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Application Logo"
      >
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r="20"
          fill={theme.colors.primary[6]}
          opacity={0.1}
        />

        {/* Main icon - abstract geometric shape */}
        <path
          d="M24 8L32 16L24 24L16 16L24 8Z"
          fill={theme.colors.primary[6]}
        />
        <path
          d="M24 24L32 32L24 40L16 32L24 24Z"
          fill={theme.colors.primary[7]}
        />

        {/* Text/Wordmark */}
        <text
          x="50"
          y="28"
          fontSize="18"
          fontWeight="700"
          fill={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Nexus
        </text>
      </svg>
    </Box>
  );
}

