import type { Icon } from '@tabler/icons-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: Icon;
  path?: string;
  children?: MenuItem[];
}

export interface MenuConfig {
  items: MenuItem[];
}
