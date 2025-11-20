import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
      onClick={() => toggleColorScheme()}
      style={{ transition: 'transform 0.2s' }}
    >
      {colorScheme === 'dark' ? (
        <IconSun size={18} />
      ) : (
        <IconMoon size={18} />
      )}
    </ActionIcon>
  );
}

