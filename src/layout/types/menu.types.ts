import type { Icon } from '@tabler/icons-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: Icon;
  /** @deprecated Use componentId instead. Kept for backward compatibility. */
  path?: string;
  /** Component ID to open when clicking this menu item */
  componentId?: string;
  /** Optional parameters to pass when opening the tab */
  tabParams?: Record<string, unknown>;
  children?: MenuItem[];
}

export interface MenuConfig {
  items: MenuItem[];
}
