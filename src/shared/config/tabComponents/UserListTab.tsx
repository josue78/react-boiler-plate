import { UserList } from '../../../features/users';
import { useTabs } from '../../hooks/useTabs';

/**
 * Wrapper component for UserList that uses tabs for navigation.
 */
export function UserListTab() {
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

