import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Card,
  Text,
  Group,
  Stack,
  Loader,
  Alert,
  Button,
  SegmentedControl,
  TextInput,
  Select,
} from '@mantine/core';
import { IconUserPlus, IconTable, IconLayoutGrid, IconSearch, IconFilter } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../hooks/useUsers';
import { UserTableView } from './UserTableView';
import { UserCardsView } from './UserCardsView';
import type { UserRole, UserStatus } from '../types/user.types';

interface UserListProps {
  /** Callback when edit is clicked */
  onEdit?: (userId: string) => void;
  /** Callback when delete is clicked */
  onDelete?: (userId: string) => void;
  /** Callback when create is clicked */
  onCreate?: () => void;
}

type ViewMode = 'table' | 'cards';

/**
 * UserList component orchestrates user list display with toggle between table and card views.
 *
 * Manages view mode state and delegates rendering to UserTableView and UserCardsView components.
 * Handles loading and error states.
 *
 * @example
 * ```tsx
 * <UserList
 *   onEdit={(id) => navigate(`/users/${id}/edit`)}
 *   onDelete={(id) => handleDelete(id)}
 *   onCreate={() => navigate('/users/new')}
 * />
 * ```
 */
export function UserList({ onEdit, onDelete, onCreate }: UserListProps) {
  const { users, loading, error } = useUsers();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const view = searchParams.get('view');
    return (view === 'table' || view === 'cards' ? view : 'cards') as ViewMode;
  });
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [roleFilter, setRoleFilter] = useState<UserRole | null>(() => {
    const role = searchParams.get('role');
    return (role === 'admin' || role === 'moderator' || role === 'user' ? role : null) as UserRole | null;
  });
  const [statusFilter, setStatusFilter] = useState<UserStatus | null>(() => {
    const status = searchParams.get('status');
    return (status === 'active' || status === 'inactive' || status === 'pending' ? status : null) as UserStatus | null;
  });

  // Refs to track current state values without causing re-renders
  const viewModeRef = useRef(viewMode);
  const searchQueryRef = useRef(searchQuery);
  const roleFilterRef = useRef(roleFilter);
  const statusFilterRef = useRef(statusFilter);

  // Keep refs in sync with state
  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    roleFilterRef.current = roleFilter;
  }, [roleFilter]);

  useEffect(() => {
    statusFilterRef.current = statusFilter;
  }, [statusFilter]);

  // Ref to track if we're updating URL from state (to avoid sync loop)
  const isUpdatingFromStateRef = useRef(false);

  // Update URL params when filters change
  useEffect(() => {
    // Skip if we're syncing from URL
    if (isUpdatingFromStateRef.current) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    // Always update view parameter
    if (viewMode === 'cards') {
      // Remove view param if it exists (cards is default)
      params.delete('view');
    } else {
      params.set('view', viewMode);
    }

    // Update search query
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    // Update role filter
    if (roleFilter) {
      params.set('role', roleFilter);
    } else {
      params.delete('role');
    }

    // Update status filter
    if (statusFilter) {
      params.set('status', statusFilter);
    } else {
      params.delete('status');
    }

    const newParams = params.toString();
    const currentParams = searchParams.toString();

    // Only update if params actually changed
    if (currentParams !== newParams) {
      isUpdatingFromStateRef.current = true;
      setSearchParams(params, { replace: true });
      // Reset flag after a microtask
      queueMicrotask(() => {
        isUpdatingFromStateRef.current = false;
      });
    }
  }, [viewMode, searchQuery, roleFilter, statusFilter, setSearchParams, searchParams]);

  // Sync state from URL params when they change externally (e.g., browser back/forward buttons or navigation back)
  useEffect(() => {
    // Skip if we're updating URL from state
    if (isUpdatingFromStateRef.current) {
      return;
    }

    // Helper functions to safely get values from URL params
    const getViewFromUrl = (): ViewMode => {
      const view = searchParams.get('view');
      return (view === 'table' || view === 'cards' ? view : 'cards') as ViewMode;
    };

    const getSearchFromUrl = (): string => {
      return searchParams.get('search') || '';
    };

    const getRoleFromUrl = (): UserRole | null => {
      const role = searchParams.get('role');
      return (role === 'admin' || role === 'moderator' || role === 'user' ? role : null) as UserRole | null;
    };

    const getStatusFromUrl = (): UserStatus | null => {
      const status = searchParams.get('status');
      return (status === 'active' || status === 'inactive' || status === 'pending' ? status : null) as UserStatus | null;
    };

    const urlView = getViewFromUrl();
    const urlSearch = getSearchFromUrl();
    const urlRole = getRoleFromUrl();
    const urlStatus = getStatusFromUrl();

    // Use queueMicrotask to make state updates asynchronous and avoid cascading renders
    queueMicrotask(() => {
      // Only update state if URL values differ from current state (using refs to avoid dependency issues)
      if (urlView !== viewModeRef.current) {
        setViewMode(urlView);
      }
      if (urlSearch !== searchQueryRef.current) {
        setSearchQuery(urlSearch);
      }
      if (urlRole !== roleFilterRef.current) {
        setRoleFilter(urlRole);
      }
      if (urlStatus !== statusFilterRef.current) {
        setStatusFilter(urlStatus);
      }
    });
  }, [searchParams]);

  // Filter users based on search query and filters
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      // Search filter (name or email)
      const matchesSearch =
        searchQuery === '' ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = roleFilter === null || user.role === roleFilter;

      // Status filter
      const matchesStatus = statusFilter === null || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Group justify="center">
          <Loader size="lg" />
        </Group>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert color="error" title={t('common.error')}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {t('users.list.title')}
            </Text>
            {onCreate && (
              <Button leftSection={<IconUserPlus size={18} />} onClick={onCreate}>
                {t('users.actions.create')}
              </Button>
            )}
          </Group>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text c="dimmed" ta="center" py="xl">
              {t('users.messages.noUsers')}
            </Text>
          </Card>
        </Stack>
      </Container>
    );
  }

  const hasActiveFilters = searchQuery !== '' || roleFilter !== null || statusFilter !== null;


  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {t('users.list.title')}
          </Text>
          <Group gap="md">
            <SegmentedControl
              value={viewMode}
              onChange={(value) => setViewMode(value as ViewMode)}
              data={[
                {
                  value: 'table',
                  label: (
                    <Group gap="xs" justify="center" wrap="nowrap" style={{ width: '100px' }}>
                      <IconTable size={18} />
                      <Text size="sm" fw={500} style={{ whiteSpace: 'nowrap' }}>
                        {t('users.list.viewTable')}
                      </Text>
                    </Group>
                  ),
                },
                {
                  value: 'cards',
                  label: (
                    <Group gap="xs" justify="center" wrap="nowrap" style={{ width: '100px' }}>
                      <IconLayoutGrid size={18} />
                      <Text size="sm" fw={500} style={{ whiteSpace: 'nowrap' }}>
                        {t('users.list.viewCards')}
                      </Text>
                    </Group>
                  ),
                },
              ]}
            />
            {onCreate && (
              <Button leftSection={<IconUserPlus size={18} />} onClick={onCreate}>
                {t('users.actions.create')}
              </Button>
            )}
          </Group>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group gap="md" align="flex-end" wrap="wrap">
              <TextInput
                placeholder={t('users.list.searchPlaceholder')}
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <Select
                placeholder={t('users.fields.role')}
                leftSection={<IconFilter size={16} />}
                value={roleFilter}
                onChange={(value) => setRoleFilter(value as UserRole | null)}
                data={[
                  { value: 'admin', label: t('users.roles.admin') },
                  { value: 'moderator', label: t('users.roles.moderator') },
                  { value: 'user', label: t('users.roles.user') },
                ]}
                clearable
                style={{ minWidth: '150px' }}
              />
              <Select
                placeholder={t('users.fields.status')}
                leftSection={<IconFilter size={16} />}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as UserStatus | null)}
                data={[
                  { value: 'active', label: t('users.status.active') },
                  { value: 'inactive', label: t('users.status.inactive') },
                  { value: 'pending', label: t('users.status.pending') },
                ]}
                clearable
                style={{ minWidth: '150px' }}
              />
              {hasActiveFilters && (
                <Button
                  variant="subtle"
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter(null);
                    setStatusFilter(null);
                    setSearchParams({}, { replace: true });
                  }}
                >
                  {t('users.actions.clearFilters')}
                </Button>
              )}
            </Group>
            {hasActiveFilters && (
              <Text size="sm" c="dimmed">
                {t('users.list.filteredResults', { count: filteredUsers.length, total: users.length })}
              </Text>
            )}
          </Stack>
        </Card>

        {filteredUsers.length === 0 ? (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text c="dimmed" ta="center" py="xl">
              {hasActiveFilters ? t('users.messages.noResults') : t('users.messages.noUsers')}
            </Text>
          </Card>
        ) : (
          <>
            {viewMode === 'table' ? (
              <UserTableView
                users={filteredUsers}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ) : (
              <UserCardsView
                users={filteredUsers}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}

