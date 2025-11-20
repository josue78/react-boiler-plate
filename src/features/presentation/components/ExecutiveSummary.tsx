import { Container, Title, Text, Grid, Card, Group, Box, Modal, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import {
  IconCode,
  IconBrandReact,
  IconBrandTypescript,
  IconSparkles,
} from '@tabler/icons-react';
import type { StatCard } from '../types/presentation.types';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <Text size="xl" fw={700} ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </Text>
  );
}

export function ExecutiveSummary() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openedModal, setOpenedModal] = useState<string | null>(null);

  const stats: StatCard[] = [
    {
      id: 'tech',
      label: t('presentation.summary.technologies'),
      value: 15,
      icon: 'IconCode',
      color: 'blue',
      description: t('presentation.summary.techDescription'),
    },
    {
      id: 'features',
      label: t('presentation.summary.features'),
      value: 8,
      icon: 'IconSparkles',
      color: 'green',
      description: t('presentation.summary.featuresDescription'),
    },
    {
      id: 'languages',
      label: t('presentation.summary.languages'),
      value: 2,
      icon: 'IconBrandReact',
      color: 'violet',
      description: t('presentation.summary.languagesDescription'),
    },
    {
      id: 'coverage',
      label: t('presentation.summary.coverage'),
      value: 90,
      suffix: '%',
      icon: 'IconBrandTypescript',
      color: 'orange',
      description: t('presentation.summary.coverageDescription'),
    },
  ];

  const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    IconCode,
    IconSparkles,
    IconBrandReact,
    IconBrandTypescript,
  };

  return (
    <Box
      ref={ref}
      py="xl"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Title order={2} size="3rem" ta="center" mb="xl">
            {t('presentation.summary.title')}
          </Title>
        </motion.div>

        <Grid>
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || IconCode;
            return (
              <Grid.Col key={stat.id} span={{ base: 12, sm: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    shadow="md"
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{
                      height: '100%',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenedModal(stat.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Text size="sm" c="dimmed" fw={500} mb="xs">
                          {stat.label}
                        </Text>
                        {stat.suffix ? (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        ) : (
                          <AnimatedCounter value={stat.value} />
                        )}
                      </div>
                      <IconComponent
                        size={40}
                        color={`var(--mantine-color-${stat.color}-6)`}
                        style={{ opacity: 0.8 }}
                      />
                    </Group>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>

        {/* Modal for each stat */}
        {stats.map((stat) => {
          const IconComponent = iconMap[stat.icon] || IconCode;
          return (
            <Modal
              key={stat.id}
              opened={openedModal === stat.id}
              onClose={() => setOpenedModal(null)}
              title={
                <Group gap="sm">
                  <IconComponent
                    size={24}
                    color={`var(--mantine-color-${stat.color}-6)`}
                  />
                  <Text fw={700} size="lg">
                    {stat.label}
                  </Text>
                </Group>
              }
              size="lg"
              centered
            >
              <Stack gap="md">
                <Group gap="md">
                  <Box
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--mantine-radius-md)',
                      backgroundColor: `var(--mantine-color-${stat.color}-0)`,
                    }}
                  >
                    <IconComponent
                      size={48}
                      color={`var(--mantine-color-${stat.color}-6)`}
                    />
                  </Box>
                  <div>
                    <Text size="sm" c="dimmed" mb="xs">
                      {stat.label}
                    </Text>
                    <Text size="2rem" fw={900}>
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </Text>
                  </div>
                </Group>
                <Text size="sm" style={{ lineHeight: 1.7 }}>
                  {stat.description}
                </Text>
              </Stack>
            </Modal>
          );
        })}
      </Container>
    </Box>
  );
}

