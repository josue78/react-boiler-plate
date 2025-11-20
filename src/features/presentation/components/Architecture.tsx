import { Container, Title, Text, Box, Stack, Paper, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconFolder,
  IconComponents,
  IconLayout,
  IconWorld,
} from '@tabler/icons-react';

interface ArchitectureLayer {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  description: string;
  items: string[];
}

export function Architecture() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const layers: ArchitectureLayer[] = [
    {
      id: 'features',
      name: t('presentation.architecture.features'),
      icon: IconFolder,
      color: 'blue',
      description: t('presentation.architecture.featuresDesc'),
      items: ['dashboard', 'users', 'presentation'],
    },
    {
      id: 'layout',
      name: t('presentation.architecture.layout'),
      icon: IconLayout,
      color: 'violet',
      description: t('presentation.architecture.layoutDesc'),
      items: ['AppShell', 'Sidebar', 'NavMenu'],
    },
    {
      id: 'shared',
      name: t('presentation.architecture.shared'),
      icon: IconComponents,
      color: 'green',
      description: t('presentation.architecture.sharedDesc'),
      items: ['components', 'hooks', 'utils', 'config'],
    },
    {
      id: 'i18n',
      name: t('presentation.architecture.i18n'),
      icon: IconWorld,
      color: 'orange',
      description: t('presentation.architecture.i18nDesc'),
      items: ['en.json', 'es.json'],
    },
  ];

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
          <Title order={2} size="3rem" ta="center" mb="md">
            {t('presentation.architecture.title')}
          </Title>
          <Text size="lg" ta="center" c="dimmed" mb="xl">
            {t('presentation.architecture.subtitle')}
          </Text>
        </motion.div>

        <Stack gap="xl">
          {layers.map((layer, layerIndex) => {
            const IconComponent = layer.icon;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: layerIndex % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: layerIndex * 0.2 }}
              >
                <Paper
                  shadow="md"
                  padding="xl"
                  radius="md"
                  withBorder
                  style={{
                    borderLeft: `4px solid var(--mantine-color-${layer.color}-6)`,
                  }}
                >
                  <Group align="flex-start" gap="lg" mb="md">
                    <IconComponent
                      size={40}
                      color={`var(--mantine-color-${layer.color}-6)`}
                    />
                    <div style={{ flex: 1 }}>
                      <Text size="xl" fw={700} mb="xs">
                        {layer.name}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {layer.description}
                      </Text>
                    </div>
                  </Group>
                  <Group gap="xs" mt="md">
                    {layer.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: layerIndex * 0.2 + itemIndex * 0.1,
                        }}
                      >
                        <Paper
                          padding="xs"
                          px="md"
                          style={{
                            backgroundColor: `var(--mantine-color-${layer.color}-0)`,
                            border: `1px solid var(--mantine-color-${layer.color}-3)`,
                            borderRadius: 'var(--mantine-radius-sm)',
                          }}
                        >
                          <Text size="sm" fw={500} c={`${layer.color}.7`}>
                            {item}
                          </Text>
                        </Paper>
                      </motion.div>
                    ))}
                  </Group>
                </Paper>
              </motion.div>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

