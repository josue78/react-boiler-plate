import { UserForm } from '../../../features/users';
import { useTabs } from '../../hooks/useTabs';

interface UserEditTabProps {
  userId: string;
}

/**
 * Wrapper component for UserForm in edit mode.
 */
export function UserEditTab({ userId }: UserEditTabProps) {
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

