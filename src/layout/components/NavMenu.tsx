import { NavLink as MantineNavLink } from '@mantine/core';
import { useTabs } from '../../shared/hooks/useTabs';
import type { MenuItem } from '../types/menu.types';

interface NavMenuProps {
  items: MenuItem[];
}

/**
 * Navigation menu component that opens tabs when items are clicked.
 *
 * Uses the tabs system instead of React Router for navigation.
 * Determines active state based on the currently active tab.
 */
export function NavMenu({ items }: NavMenuProps) {
  const { openTab, getActiveTab } = useTabs();

  const isItemActive = (item: MenuItem): boolean => {
    const activeTab = getActiveTab();
    if (!activeTab) return false;

    // Check if this item's componentId matches the active tab
    if (item.componentId && activeTab.componentId === item.componentId) {
      return true;
    }

    // Check children
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }

    return false;
  };

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    e.preventDefault();
    if (item.componentId) {
      openTab(item.componentId, item.tabParams, item.label, item.icon);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const IconComponent = item.icon;
    const isActive = isItemActive(item);

    if (item.children && item.children.length > 0) {
      return (
        <MantineNavLink
          key={item.id}
          label={item.label}
          leftSection={IconComponent && <IconComponent size={18} />}
          defaultOpened={isActive}
        >
          {item.children.map((child) => renderMenuItem(child))}
        </MantineNavLink>
      );
    }

    return (
      <MantineNavLink
        key={item.id}
        label={item.label}
        leftSection={IconComponent && <IconComponent size={18} />}
        active={isActive}
        onClick={(e) => handleItemClick(item, e)}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  return <>{items.map((item) => renderMenuItem(item))}</>;
}
