import { AppShell as MantineAppShell, Text, Group } from '@mantine/core';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import type { MenuItem } from '../types/menu.types';

interface AppShellProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
}

export function AppShell({ children, menuItems }: AppShellProps) {
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
      <MantineAppShell.Header p="md">
        <Group justify="space-between" h="100%">
          <Text size="lg" fw={600}>
            Dashboard
          </Text>
          <ThemeToggle />
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
