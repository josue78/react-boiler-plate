import { DashboardDemo } from '../../features/dashboard';
import { PresentationDemo } from '../../features/presentation';
import { UserListTab } from './tabComponents/UserListTab';
import { UserCreateTab } from './tabComponents/UserCreateTab';
import { UserEditTab } from './tabComponents/UserEditTab';
import { SettingsProfileTab } from './tabComponents/SettingsProfileTab';
import { SettingsSecurityTab } from './tabComponents/SettingsSecurityTab';
import type { TabComponentRegistry } from '../types/tab.types';

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


