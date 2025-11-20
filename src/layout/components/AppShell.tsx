import { AppShell as MantineAppShell, Text } from '@mantine/core';
import { Sidebar } from './Sidebar';
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
        <Text size="lg" fw={600}>
          Dashboard
        </Text>
      </MantineAppShell.Header>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
