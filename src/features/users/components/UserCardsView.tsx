import { Grid, Card, Text, Group, Stack, Avatar, Badge, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { User, UserRole, UserStatus } from '../types/user.types';

interface UserCardsViewProps {
  /** Array of users to display */
  users: User[];
  /** Callback when edit is clicked */
  onEdit?: (userId: string) => void;
  /** Callback when delete is clicked */
  onDelete?: (userId: string) => void;
}

/**
 * Helper function to get status badge color using STYBA palette
 */
function getStatusColor(status: UserStatus): string {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'secondary';
  }
}

/**
 * Helper function to get role badge color using STYBA palette
 */
function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'error';
    case 'moderator':
      return 'primary';
    case 'user':
      return 'secondary';
    default:
      return 'secondary';
  }
}

/**
 * UserCardsView component displays users in a responsive card grid format.
 *
 * Shows user avatar, name, email, role, and status in cards.
 * Includes actions for editing and deleting users.
 * Consistent styling with UserTableView component.
 *
 * @example
 * ```tsx
 * <UserCardsView
 *   users={users}
 *   onEdit={(id) => navigate(`/users/${id}/edit`)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
export function UserCardsView({ users, onEdit, onDelete }: UserCardsViewProps) {
  const { t } = useTranslation();

  return (
    <Grid>
      {users.map((user) => (
        <Grid.Col key={user.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Stack gap="md" justify="space-between" h="100%">
              <div>
                <Group gap="sm" mb="md">
                  <Avatar src={user.avatar} size="md" radius="xl">
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" fw={500} truncate>
                      {user.name}
                    </Text>
                    <Text size="sm" c="dimmed" truncate>
                      {user.email}
                    </Text>
                  </div>
                </Group>

                <Group gap="xs" mb="md">
                  <Badge color={getRoleColor(user.role)} size="sm" variant="light">
                    {t(`users.roles.${user.role}`)}
                  </Badge>
                  <Badge color={getStatusColor(user.status)} size="sm">
                    {t(`users.status.${user.status}`)}
                  </Badge>
                </Group>
              </div>

              <Group gap="xs" justify="flex-end" mt="auto">
                {onEdit && (
                  <ActionIcon
                    variant="light"
                    color="primary"
                    size="sm"
                    onClick={() => onEdit(user.id)}
                    aria-label={t('users.actions.edit')}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
                {onDelete && (
                  <ActionIcon
                    variant="light"
                    color="error"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                    aria-label={t('users.actions.delete')}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}

