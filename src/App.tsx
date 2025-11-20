import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './layout/components/AppShell';
import { DashboardDemo } from './features/dashboard';
import { IconLayoutDashboard, IconUsers, IconSettings, IconUser, IconShield } from '@tabler/icons-react';
import type { MenuItem } from './layout/types/menu.types';

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    path: '/',
  },
  {
    id: 'users',
    label: 'Gestión de Usuarios',
    icon: IconUsers,
    children: [
      {
        id: 'users-list',
        label: 'Lista de Usuarios',
        path: '/users',
      },
      {
        id: 'users-create',
        label: 'Crear Usuario',
        path: '/users/create',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: IconSettings,
    children: [
      {
        id: 'settings-profile',
        label: 'Perfil',
        icon: IconUser,
        path: '/settings/profile',
      },
      {
        id: 'settings-security',
        label: 'Seguridad',
        icon: IconShield,
        path: '/settings/security',
      },
    ],
  },
];

function AppContent() {
  return (
    <AppShell menuItems={menuItems}>
      <Routes>
        <Route path="/" element={<DashboardDemo />} />
        <Route path="/users" element={<div>Lista de Usuarios</div>} />
        <Route path="/users/create" element={<div>Crear Usuario</div>} />
        <Route path="/settings/profile" element={<div>Perfil</div>} />
        <Route path="/settings/security" element={<div>Seguridad</div>} />
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
