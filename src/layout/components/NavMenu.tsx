import { NavLink as MantineNavLink } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../types/menu.types';

interface NavMenuProps {
  items: MenuItem[];
}

export function NavMenu({ items }: NavMenuProps) {
  const location = useLocation();

  const isItemActive = (item: MenuItem): boolean => {
    if (item.path && location.pathname === item.path) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
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
        component={Link}
        to={item.path || '#'}
        active={isActive}
      />
    );
  };

  return <>{items.map((item) => renderMenuItem(item))}</>;
}
