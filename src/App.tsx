import { BrowserRouter, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppShell } from './layout/components/AppShell';
import { DashboardDemo } from './features/dashboard';
import { UserList, UserForm } from './features/users';
import { IconLayoutDashboard, IconUsers, IconSettings, IconUser, IconShield } from '@tabler/icons-react';
import type { MenuItem } from './layout/types/menu.types';

/**
 * Wrapper component for UserList with navigation handlers
 */
function UserListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Preserve search params when navigating to details/edit
  const preserveParams = (path: string) => {
    const params = searchParams.toString();
    return params ? `${path}?${params}` : path;
  };

  return (
    <UserList
      onEdit={(userId) => navigate(preserveParams(`/users/${userId}/edit`))}
      onDelete={(userId) => {
        // In a real app, you would show a confirmation dialog first
        // For now, we'll just navigate back to the list with preserved filters
        navigate(preserveParams('/users'));
      }}
      onCreate={() => navigate('/users/create')}
    />
  );
}

/**
 * Wrapper component for UserForm (create mode)
 */
function UserCreatePage() {
  const navigate = useNavigate();

  return (
    <UserForm
      onSubmitSuccess={() => navigate('/users')}
      onCancel={() => navigate('/users')}
    />
  );
}

/**
 * Wrapper component for UserForm (edit mode)
 */
function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!id) {
    navigate('/users');
    return null;
  }

  // Preserve search params when navigating back
  const getBackUrl = () => {
    const params = searchParams.toString();
    return params ? `/users?${params}` : '/users';
  };

  return (
    <UserForm
      userId={id}
      onSubmitSuccess={() => {
        navigate(getBackUrl());
      }}
      onCancel={() => {
        navigate(getBackUrl());
      }}
    />
  );
}


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
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />
        <Route path="/users/:id/edit" element={<UserEditPage />} />
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
