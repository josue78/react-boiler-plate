import {
  Card,
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Badge,
  ActionIcon,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { User, UserRole, UserStatus } from '../types/user.types';

interface UserTableViewProps {
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
 * UserTableView component displays users in a table format.
 *
 * Shows user avatar, name, email, role, and status in columns.
 * Includes actions column for editing and deleting users.
 *
 * @example
 * ```tsx
 * <UserTableView
 *   users={users}
 *   onEdit={(id) => navigate(`/users/${id}/edit`)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
export function UserTableView({ users, onEdit, onDelete }: UserTableViewProps) {
  const { t } = useTranslation();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <ScrollArea>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('users.fields.name')}</Table.Th>
              <Table.Th>{t('users.fields.email')}</Table.Th>
              <Table.Th>{t('users.fields.role')}</Table.Th>
              <Table.Th>{t('users.fields.status')}</Table.Th>
              <Table.Th style={{ textAlign: 'right', width: '120px' }}>
                {t('users.actions.edit')}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar src={user.avatar} size="sm" radius="xl">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text size="sm" fw={500}>
                        {user.name}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {user.email}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={getRoleColor(user.role)} size="sm" variant="light">
                    {t(`users.roles.${user.role}`)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(user.status)} size="sm">
                    {t(`users.status.${user.status}`)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-end">
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
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}

