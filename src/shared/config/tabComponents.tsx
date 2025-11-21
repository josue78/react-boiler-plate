import { useTranslation } from 'react-i18next';
import { DashboardDemo } from '../../features/dashboard';
import { UserList, UserForm } from '../../features/users';
import { PresentationDemo } from '../../features/presentation';
import { useTabs } from '../hooks/useTabs';
import type { TabComponentRegistry } from '../types/tab.types';

/**
 * Wrapper component for UserList that uses tabs for navigation.
 */
function UserListTab() {
  const { openTab } = useTabs();

  return (
    <UserList
      onEdit={(userId) => {
        openTab('users-edit', { userId }, undefined);
      }}
      onDelete={() => {
        // In a real app, you would show a confirmation dialog first
        // For now, we'll just switch to the users list tab
        openTab('users-list');
      }}
      onCreate={() => {
        openTab('users-create');
      }}
    />
  );
}

/**
 * Wrapper component for UserForm in create mode.
 */
function UserCreateTab() {
  const { openTab, activeTabId, closeTab } = useTabs();

  const handleSuccess = () => {
    // Close current tab and open users list
    if (activeTabId) {
      closeTab(activeTabId);
    }
    openTab('users-list');
  };

  const handleCancel = () => {
    // Switch to users list (don't close, just switch)
    openTab('users-list');
  };

  return (
    <UserForm
      onSubmitSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}

/**
 * Wrapper component for UserForm in edit mode.
 */
function UserEditTab({ userId }: { userId: string }) {
  const { openTab, activeTabId, closeTab } = useTabs();

  const handleSuccess = () => {
    // Close current edit tab and open users list
    if (activeTabId) {
      closeTab(activeTabId);
    }
    openTab('users-list');
  };

  const handleCancel = () => {
    // Switch to users list (don't close, just switch)
    openTab('users-list');
  };

  return (
    <UserForm
      userId={userId}
      onSubmitSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}

/**
 * Simple settings profile component.
 */
function SettingsProfileTab() {
  const { t } = useTranslation();
  return <div>{t('menu.profile')}</div>;
}

/**
 * Simple settings security component.
 */
function SettingsSecurityTab() {
  const { t } = useTranslation();
  return <div>{t('menu.security')}</div>;
}

/**
 * Registry mapping component IDs to React components.
 *
 * Each component receives params from the tab and can use
 * the useTabs hook to manage navigation.
 */
export const tabComponents: TabComponentRegistry = {
  dashboard: () => <DashboardDemo />,
  'users-list': () => <UserListTab />,
  'users-create': () => <UserCreateTab />,
  'users-edit': (params) => {
    const userId = params?.userId as string | undefined;
    if (!userId) {
      return <div>Error: User ID is required</div>;
    }
    return <UserEditTab userId={userId} />;
  },
  presentation: () => <PresentationDemo />,
  'settings-profile': () => <SettingsProfileTab />,
  'settings-security': () => <SettingsSecurityTab />,
};


