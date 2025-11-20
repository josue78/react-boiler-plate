import { ScrollArea, Box } from '@mantine/core';
import { NavMenu } from './NavMenu';
import type { MenuItem } from '../types/menu.types';

interface SidebarProps {
  menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  return (
    <ScrollArea h="100%">
      <Box p="md" data-tour="sidebar">
        <NavMenu items={menuItems} />
      </Box>
    </ScrollArea>
  );
}
