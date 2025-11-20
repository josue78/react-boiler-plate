import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Text,
  Stack,
  TextInput,
  Select,
  Button,
  Group,
  Alert,
  Avatar,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useUserForm } from '../hooks/useUserForm';
import { useUser } from '../hooks/useUser';
import type { UserFormData, UserRole, UserStatus } from '../types/user.types';

interface UserFormProps {
  /** User ID for editing (undefined for creating new user) */
  userId?: string;
  /** Callback when form is successfully submitted */
  onSubmitSuccess?: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
}

/**
 * UserForm component for creating and editing users.
 *
 * Uses Mantine form components with validation.
 * Handles both create and edit modes based on userId prop.
 *
 * @example
 * ```tsx
 * // Create mode
 * <UserForm onSubmitSuccess={() => navigate('/users')} />
 *
 * // Edit mode
 * <UserForm userId="1" onSubmitSuccess={() => navigate('/users')} />
 * ```
 */
export function UserForm({ userId, onSubmitSuccess, onCancel }: UserFormProps) {
  const { t } = useTranslation();
  const { user, loading: loadingUser } = useUser(userId || '');
  const { loading, error, createUser, updateUser, clearError } = useUserForm();

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    avatar: null,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = t('users.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      errors.email = t('users.validation.emailRequired');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('users.validation.emailInvalid');
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    let result;
    if (userId) {
      result = await updateUser(userId, formData);
    } else {
      result = await createUser(formData);
    }

    if (result && onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  if (loadingUser) {
    return (
      <Container size="md" py="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text ta="center" c="dimmed">
            {t('common.loading')}
          </Text>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {userId ? t('users.form.editTitle') : t('users.form.title')}
          </Text>
          {userId && onCancel && (
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={18} />}
              onClick={onCancel}
              disabled={loading || loadingUser}
            >
              {t('users.actions.back')}
            </Button>
          )}
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {formData.avatar && (
                <Group justify="center">
                  <Avatar src={formData.avatar} size="xl" radius="xl" />
                </Group>
              )}

              <TextInput
                label={t('users.fields.name')}
                placeholder={t('users.fields.name')}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (validationErrors.name) {
                    setValidationErrors({ ...validationErrors, name: '' });
                  }
                }}
                error={validationErrors.name}
                required
                disabled={loading}
              />

              <TextInput
                label={t('users.fields.email')}
                placeholder={t('users.fields.email')}
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (validationErrors.email) {
                    setValidationErrors({ ...validationErrors, email: '' });
                  }
                }}
                error={validationErrors.email}
                required
                disabled={loading}
              />

              <Select
                label={t('users.fields.role')}
                placeholder={t('users.fields.role')}
                value={formData.role}
                onChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, role: value as UserRole });
                  }
                }}
                data={[
                  { value: 'admin', label: t('users.roles.admin') },
                  { value: 'moderator', label: t('users.roles.moderator') },
                  { value: 'user', label: t('users.roles.user') },
                ]}
                required
                disabled={loading}
              />

              <Select
                label={t('users.fields.status')}
                placeholder={t('users.fields.status')}
                value={formData.status}
                onChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, status: value as UserStatus });
                  }
                }}
                data={[
                  { value: 'active', label: t('users.status.active') },
                  { value: 'inactive', label: t('users.status.inactive') },
                  { value: 'pending', label: t('users.status.pending') },
                ]}
                required
                disabled={loading}
              />

              <TextInput
                label={t('users.fields.avatar')}
                placeholder={t('users.fields.avatarPlaceholder')}
                value={formData.avatar || ''}
                onChange={(e) => {
                  setFormData({ ...formData, avatar: e.target.value || null });
                }}
                disabled={loading}
              />

              {error && (
                <Alert color="error" title={t('common.error')} onClose={clearError} withCloseButton>
                  {error}
                </Alert>
              )}

              <Group justify="flex-end" mt="md">
                {onCancel && (
                  <Button variant="default" onClick={onCancel} disabled={loading}>
                    {t('users.actions.cancel')}
                  </Button>
                )}
                <Button type="submit" loading={loading}>
                  {t('users.actions.save')}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
}

