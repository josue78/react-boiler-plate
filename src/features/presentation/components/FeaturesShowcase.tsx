import { Container, Title, Text, Grid, Card, Group, Box, Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconBolt,
  IconPalette,
  IconWorld,
  IconShield,
  IconCode,
  IconRoute,
  IconSettings,
} from '@tabler/icons-react';
import type { FeatureItem } from '../types/presentation.types';

const features: FeatureItem[] = [
  {
    id: 'vite',
    title: 'Vite',
    description: 'Fast development with instant server startup and HMR',
    icon: 'IconBolt',
    category: 'development',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Complete static typing for increased safety',
    icon: 'IconCode',
    category: 'development',
  },
  {
    id: 'mantine',
    title: 'Mantine UI',
    description: 'Modern and accessible component library',
    icon: 'IconPalette',
    category: 'uiux',
  },
  {
    id: 'themes',
    title: 'Light/Dark Theme',
    description: 'Support for light and dark mode',
    icon: 'IconPalette',
    category: 'uiux',
  },
  {
    id: 'i18n',
    title: 'i18next',
    description: 'Complete support for multiple languages',
    icon: 'IconWorld',
    category: 'i18n',
  },
  {
    id: 'router',
    title: 'React Router',
    description: 'Complete navigation with nested routes',
    icon: 'IconRoute',
    category: 'development',
  },
  {
    id: 'eslint',
    title: 'ESLint',
    description: 'Linter configured with React and TypeScript rules',
    icon: 'IconShield',
    category: 'quality',
  },
  {
    id: 'husky',
    title: 'Git Hooks',
    description: 'Automatic validation with Husky',
    icon: 'IconSettings',
    category: 'quality',
  },
];

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  IconBolt,
  IconPalette,
  IconWorld,
  IconShield,
  IconCode,
  IconRoute,
  IconSettings,
};

const categoryColors: Record<FeatureItem['category'], string> = {
  development: 'blue',
  uiux: 'violet',
  i18n: 'green',
  quality: 'orange',
};

export function FeaturesShowcase() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            {t('presentation.features.title')}
          </Title>
          <Text size="lg" ta="center" c="dimmed" mb="xl">
            {t('presentation.features.subtitle')}
          </Text>
        </motion.div>

        <Grid>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || IconCode;
            const categoryColor = categoryColors[feature.category];

            return (
              <Grid.Col key={feature.id} span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ perspective: '1000px' }}
                >
                  <Card
                    shadow="md"
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{
                      height: '100%',
                      transition: 'all 0.3s',
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) rotateY(5deg)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) rotateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Group align="flex-start" gap="md" mb="md">
                      <Box
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--mantine-radius-md)',
                          backgroundColor: `var(--mantine-color-${categoryColor}-0)`,
                        }}
                      >
                        <IconComponent
                          size={32}
                          color={`var(--mantine-color-${categoryColor}-6)`}
                        />
                      </Box>
                      <div style={{ flex: 1 }}>
                        <Group justify="space-between" align="flex-start" mb="xs">
                          <Text fw={700} size="lg">
                            {feature.title}
                          </Text>
                          <Badge color={categoryColor} variant="light" size="sm">
                            {t(`presentation.features.categories.${feature.category}`)}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {feature.description}
                        </Text>
                      </div>
                    </Group>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

