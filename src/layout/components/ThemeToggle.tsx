import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();

  return (
    <ActionIcon
      variant="default"
      size="lg"
      aria-label={t('common.toggleColorScheme')}
      onClick={() => toggleColorScheme()}
      style={{ transition: 'transform 0.2s' }}
      data-tour="theme-toggle"
    >
      {colorScheme === 'dark' ? (
        <IconSun size={18} />
      ) : (
        <IconMoon size={18} />
      )}
    </ActionIcon>
  );
}

