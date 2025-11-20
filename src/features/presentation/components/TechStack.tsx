import { Container, Title, Text, Grid, Card, Group, Badge, Box, Modal, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVite,
  IconBrandMantine,
  IconLanguage,
  IconCode,
  IconTools,
} from '@tabler/icons-react';
import type { TechItem } from '../types/presentation.types';

const techItems: TechItem[] = [
  { 
    name: 'React 19', 
    category: 'frontend', 
    icon: 'IconBrandReact',
    description: 'react19Description',
  },
  { 
    name: 'TypeScript', 
    category: 'frontend', 
    icon: 'IconBrandTypescript',
    description: 'typescriptDescription',
  },
  { 
    name: 'Vite 7', 
    category: 'devtools', 
    icon: 'IconBrandVite',
    description: 'viteDescription',
  },
  { 
    name: 'Mantine UI', 
    category: 'ui', 
    icon: 'IconBrandMantine',
    description: 'mantineDescription',
  },
  { 
    name: 'React Router', 
    category: 'frontend', 
    icon: 'IconCode',
    description: 'reactRouterDescription',
  },
  { 
    name: 'i18next', 
    category: 'i18n', 
    icon: 'IconLanguage',
    description: 'i18nextDescription',
  },
  { 
    name: 'Framer Motion', 
    category: 'ui', 
    icon: 'IconCode',
    description: 'framerMotionDescription',
  },
  { 
    name: 'Vitest', 
    category: 'testing', 
    icon: 'IconTools',
    description: 'vitestDescription',
  },
  { 
    name: 'ESLint', 
    category: 'devtools', 
    icon: 'IconTools',
    description: 'eslintDescription',
  },
  { 
    name: 'Husky', 
    category: 'devtools', 
    icon: 'IconTools',
    description: 'huskyDescription',
  },
  { 
    name: 'Commitlint', 
    category: 'devtools', 
    icon: 'IconTools',
    description: 'commitlintDescription',
  },
  { 
    name: 'MSW', 
    category: 'testing', 
    icon: 'IconTools',
    description: 'mswDescription',
  },
];

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVite,
  IconBrandMantine,
  IconLanguage,
  IconCode,
  IconTools,
};

const categoryColors: Record<TechItem['category'], string> = {
  frontend: 'blue',
  devtools: 'gray',
  ui: 'violet',
  i18n: 'green',
  testing: 'orange',
};

export function TechStack() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openedModal, setOpenedModal] = useState<string | null>(null);

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
            {t('presentation.techStack.title')}
          </Title>
          <Text size="lg" ta="center" c="dimmed" mb="xl">
            {t('presentation.techStack.subtitle')}
          </Text>
        </motion.div>

        <Grid>
          {techItems.map((tech, index) => {
            const IconComponent = iconMap[tech.icon || 'IconCode'] || IconCode;
            const categoryColor = categoryColors[tech.category];

            return (
              <Grid.Col key={tech.name} span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{
                      height: '100%',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenedModal(tech.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) rotate(2deg)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Group justify="space-between" align="center" mb="xs">
                      <Group gap="sm">
                        <IconComponent
                          size={32}
                          color={`var(--mantine-color-${categoryColor}-6)`}
                        />
                        <Text fw={600} size="lg">
                          {tech.name}
                        </Text>
                      </Group>
                      <Badge color={categoryColor} variant="light">
                        {t(`presentation.techStack.categories.${tech.category}`)}
                      </Badge>
                    </Group>
                  </Card>
                </motion.div>
              </Grid.Col>
            );
          })}
        </Grid>

        {/* Modal for each tech */}
        {techItems.map((tech) => {
          const IconComponent = iconMap[tech.icon || 'IconCode'] || IconCode;
          const categoryColor = categoryColors[tech.category];
          
          return (
            <Modal
              key={tech.name}
              opened={openedModal === tech.name}
              onClose={() => setOpenedModal(null)}
              title={
                <Group gap="sm">
                  <IconComponent
                    size={24}
                    color={`var(--mantine-color-${categoryColor}-6)`}
                  />
                  <Text fw={700} size="lg">
                    {tech.name}
                  </Text>
                  <Badge color={categoryColor} variant="light">
                    {t(`presentation.techStack.categories.${tech.category}`)}
                  </Badge>
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
                      backgroundColor: `var(--mantine-color-${categoryColor}-0)`,
                    }}
                  >
                    <IconComponent
                      size={48}
                      color={`var(--mantine-color-${categoryColor}-6)`}
                    />
                  </Box>
                  <div style={{ flex: 1 }}>
                    <Text size="lg" fw={700} mb="xs">
                      {tech.name}
                    </Text>
                    <Badge color={categoryColor} variant="light">
                      {t(`presentation.techStack.categories.${tech.category}`)}
                    </Badge>
                  </div>
                </Group>
                {tech.description && (
                  <Text size="sm" style={{ lineHeight: 1.7 }}>
                    {t(`presentation.techStack.descriptions.${tech.description}`)}
                  </Text>
                )}
              </Stack>
            </Modal>
          );
        })}
      </Container>
    </Box>
  );
}

