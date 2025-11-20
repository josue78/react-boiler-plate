import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppShell } from './layout/components/AppShell';
import { DashboardDemo } from './features/dashboard';
import { IconLayoutDashboard, IconUsers, IconSettings, IconUser, IconShield } from '@tabler/icons-react';
import type { MenuItem } from './layout/types/menu.types';

function AppContent() {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: t('menu.dashboard'),
      icon: IconLayoutDashboard,
      path: '/',
    },
    {
      id: 'users',
      label: t('menu.users'),
      icon: IconUsers,
      children: [
        {
          id: 'users-list',
          label: t('menu.usersList'),
          path: '/users',
        },
        {
          id: 'users-create',
          label: t('menu.usersCreate'),
          path: '/users/create',
        },
      ],
    },
    {
      id: 'settings',
      label: t('menu.settings'),
      icon: IconSettings,
      children: [
        {
          id: 'settings-profile',
          label: t('menu.profile'),
          icon: IconUser,
          path: '/settings/profile',
        },
        {
          id: 'settings-security',
          label: t('menu.security'),
          icon: IconShield,
          path: '/settings/security',
        },
      ],
    },
  ];

  return (
    <AppShell menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<DashboardDemo />} />
        <Route path="/users" element={<div>{t('menu.usersList')}</div>} />
        <Route path="/users/create" element={<div>{t('menu.usersCreate')}</div>} />
        <Route path="/settings/profile" element={<div>{t('menu.profile')}</div>} />
        <Route path="/settings/security" element={<div>{t('menu.security')}</div>} />
      </Routes>
    </AppShell>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
