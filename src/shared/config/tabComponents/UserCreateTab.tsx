import { UserForm } from '../../../features/users';
import { useTabs } from '../../hooks/useTabs';

/**
 * Wrapper component for UserForm in create mode.
 */
export function UserCreateTab() {
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

