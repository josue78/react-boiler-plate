import { Container, Grid, Card, Text, Group, Stack, Loader, Alert } from '@mantine/core';
import { IconUsers, IconCurrencyDollar, IconShoppingCart, IconTrendingUp } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useDashboardData } from '../hooks/useDashboardData';

export function DashboardDemo() {
  const { data, loading, error } = useDashboardData();
  const { t } = useTranslation();

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
        <Alert color="red" title={t('common.error')}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return null;
  }

  const { stats, recentActivity } = data;

  const statCards = [
    {
      title: t('dashboard.totalUsers'),
      value: stats.totalUsers.toLocaleString(),
      icon: IconUsers,
      color: 'blue',
    },
    {
      title: t('dashboard.totalRevenue'),
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: IconCurrencyDollar,
      color: 'green',
    },
    {
      title: t('dashboard.totalOrders'),
      value: stats.totalOrders.toLocaleString(),
      icon: IconShoppingCart,
      color: 'orange',
    },
    {
      title: t('dashboard.growthRate'),
      value: `${stats.growthRate}%`,
      icon: IconTrendingUp,
      color: 'violet',
    },
  ];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Text size="xl" fw={700}>
          {t('dashboard.title')}
        </Text>

        <Grid data-tour="dashboard-cards">
          {statCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 3 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between">
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        {stat.title}
                      </Text>
                      <Text size="xl" fw={700} mt="xs">
                        {stat.value}
                      </Text>
                    </div>
                    <IconComponent size={32} color={`var(--mantine-color-${stat.color}-6)`} />
                  </Group>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>

        <Card shadow="sm" padding="lg" radius="md" withBorder data-tour="recent-activity">
          <Text size="lg" fw={600} mb="md">
            {t('dashboard.recentActivity')}
          </Text>
          <Stack gap="sm">
            {recentActivity.map((activity, index) => (
              <Text key={index} size="sm">
                {activity}
              </Text>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
