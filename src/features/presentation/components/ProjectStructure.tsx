import { Container, Title, Text, Box, Paper, Code, Grid, Group, useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { IconChevronDown, IconChevronRight, IconFolder, IconFile } from '@tabler/icons-react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

const projectTree: TreeNode = {
  name: 'react-boiler-plate',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'features',
          type: 'folder',
          children: [
            { name: 'dashboard', type: 'folder' },
            { name: 'users', type: 'folder' },
            { name: 'presentation', type: 'folder' },
          ],
        },
        {
          name: 'layout',
          type: 'folder',
          children: [
            { name: 'components', type: 'folder' },
            { name: 'types', type: 'folder' },
          ],
        },
        {
          name: 'shared',
          type: 'folder',
          children: [
            { name: 'components', type: 'folder' },
            { name: 'hooks', type: 'folder' },
            { name: 'utils', type: 'folder' },
            { name: 'config', type: 'folder' },
          ],
        },
        { name: 'i18n', type: 'folder' },
        { name: 'App.tsx', type: 'file' },
        { name: 'main.tsx', type: 'file' },
      ],
    },
    { name: 'public', type: 'folder' },
    { name: 'package.json', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
    { name: 'vite.config.ts', type: 'file' },
  ],
};

function TreeNodeComponent({
  node,
  level = 0,
  isInView,
  colorScheme,
}: {
  node: TreeNode;
  level?: number;
  isInView: boolean;
  colorScheme: 'light' | 'dark';
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  
  const textColor = colorScheme === 'dark' 
    ? 'var(--mantine-color-gray-0)' 
    : 'var(--mantine-color-gray-9)';
  const folderIconColor = colorScheme === 'dark'
    ? 'var(--mantine-color-blue-4)'
    : 'var(--mantine-color-blue-7)';
  const fileIconColor = colorScheme === 'dark'
    ? 'var(--mantine-color-gray-4)'
    : 'var(--mantine-color-gray-7)';
  const chevronColor = colorScheme === 'dark'
    ? 'var(--mantine-color-gray-4)'
    : 'var(--mantine-color-gray-7)';

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: level * 0.1 }}
      >
        <Group
          gap="xs"
          style={{
            paddingLeft: `${level * 20}px`,
            paddingTop: '4px',
            paddingBottom: '4px',
            cursor: hasChildren ? 'pointer' : 'default',
          }}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {hasChildren ? (
            isExpanded ? (
              <IconChevronDown size={16} color={chevronColor} />
            ) : (
              <IconChevronRight size={16} color={chevronColor} />
            )
          ) : (
            <Box style={{ width: 16 }} />
          )}
          {node.type === 'folder' ? (
            <IconFolder size={16} color={folderIconColor} />
          ) : (
            <IconFile size={16} color={fileIconColor} />
          )}
          <Text size="sm" fw={node.type === 'folder' ? 600 : 400} c={textColor}>
            {node.name}
          </Text>
        </Group>
      </motion.div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child, index) => (
            <TreeNodeComponent
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              isInView={isInView}
              colorScheme={colorScheme}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectStructure() {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const treeBackgroundColor = colorScheme === 'dark'
    ? 'var(--mantine-color-dark-8)'
    : 'var(--mantine-color-gray-1)';
  const treeBorderColor = colorScheme === 'dark'
    ? 'var(--mantine-color-dark-6)'
    : 'var(--mantine-color-gray-3)';

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
            {t('presentation.structure.title')}
          </Title>
          <Text size="lg" ta="center" c="dimmed" mb="xl">
            {t('presentation.structure.subtitle')}
          </Text>
        </motion.div>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="md" padding="xl" radius="md" withBorder>
              <Text fw={700} mb="md">
                {t('presentation.structure.treeTitle')}
              </Text>
              <Box
                style={{
                  backgroundColor: treeBackgroundColor,
                  border: `1px solid ${treeBorderColor}`,
                  borderRadius: 'var(--mantine-radius-sm)',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  minHeight: '300px',
                }}
              >
                <TreeNodeComponent 
                  node={projectTree} 
                  isInView={isInView} 
                  colorScheme={colorScheme}
                />
              </Box>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="md" padding="xl" radius="md" withBorder>
              <Text fw={700} mb="md">
                {t('presentation.structure.exampleTitle')}
              </Text>
              <Code block style={{ fontSize: '0.85rem' }}>
                {`// Feature structure example
features/
└── dashboard/
    ├── components/
    │   └── DashboardDemo.tsx
    ├── hooks/
    │   └── useDashboardData.ts
    ├── services/
    │   └── dashboardService.ts
    └── index.ts`}
              </Code>
              <Text size="sm" c="dimmed" mt="md">
                {t('presentation.structure.description')}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

