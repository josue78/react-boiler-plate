import { AppShell as MantineAppShell, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconHelp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTour } from '../../shared/hooks/useTour';
import type { MenuItem } from '../types/menu.types';

interface AppShellProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}

export function AppShell({ children, menuItems }: AppShellProps) {
  const { startTour } = useTour();
  const { t } = useTranslation();

  return (
    <MantineAppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
      }}
      header={{
        height: 60,
      }}
    >
      <MantineAppShell.Navbar>
        <Sidebar menuItems={menuItems} />
      </MantineAppShell.Navbar>
      <MantineAppShell.Header p="md" data-tour="header">
        <Group justify="space-between" h="100%">
          <Text size="lg" fw={600}>
            {t('header.title')}
          </Text>
          <Group gap="xs">
            <Tooltip label={t('header.startTour')}>
              <ActionIcon
                variant="default"
                size="lg"
                aria-label={t('header.startTourAria')}
                onClick={startTour}
              >
                <IconHelp size={18} />
              </ActionIcon>
            </Tooltip>
            <LanguageToggle />
            <ThemeToggle />
          </Group>
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
