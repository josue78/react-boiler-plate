import { Container, Title, Text, Box, Tabs, Code, Paper, Stack, Badge, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconCode, IconCheck } from '@tabler/icons-react';

const standards = [
  {
    id: 'naming',
    title: 'Naming Conventions',
    examples: [
      { label: 'Components', code: 'UserProfileCard, DashboardStats' },
      { label: 'Hooks', code: 'useDashboardData, useUserForm' },
      { label: 'Variables', code: 'userData, isLoading, hasError' },
    ],
  },
  {
    id: 'types',
    title: 'TypeScript',
    examples: [
      { label: 'Interfaces', code: 'interface User { id: string; name: string; }' },
      { label: 'Types', code: "type Status = 'loading' | 'success' | 'error'" },
      { label: 'Props', code: 'interface ButtonProps { label: string; onClick: () => void; }' },
    ],
  },
  {
    id: 'structure',
    title: 'File Structure',
    examples: [
      { label: 'Features', code: 'features/[domain]/components/, hooks/, services/' },
      { label: 'Shared', code: 'shared/components/, hooks/, utils/' },
      { label: 'Layout', code: 'layout/components/, types/' },
    ],
  },
];

export function CodeStandards() {
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
            {t('presentation.standards.title')}
          </Title>
          <Text size="lg" ta="center" c="dimmed" mb="xl">
            {t('presentation.standards.subtitle')}
          </Text>
        </motion.div>

        <Tabs defaultValue={standards[0].id}>
          <Tabs.List>
            {standards.map((standard, index) => (
              <motion.div
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Tabs.Tab value={standard.id} leftSection={<IconCode size={16} />}>
                  {standard.title}
                </Tabs.Tab>
              </motion.div>
            ))}
          </Tabs.List>

          {standards.map((standard, standardIndex) => (
            <Tabs.Panel key={standard.id} value={standard.id} pt="xl">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: standardIndex * 0.1 }}
              >
                <Stack gap="md">
                  {standard.examples.map((example, exampleIndex) => (
                    <motion.div
                      key={example.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: standardIndex * 0.1 + exampleIndex * 0.1 }}
                    >
                      <Paper shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                          <Text fw={600} size="sm">
                            {example.label}
                          </Text>
                          <Badge color="blue" variant="light" size="sm">
                            <IconCheck size={12} style={{ marginRight: 4 }} />
                            Standard
                          </Badge>
                        </Group>
                        <Code block style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {example.code}
                        </Code>
                      </Paper>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Container>
    </Box>
  );
}

