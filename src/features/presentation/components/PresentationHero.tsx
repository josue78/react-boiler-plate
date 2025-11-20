import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IconArrowDown } from '@tabler/icons-react';

interface PresentationHeroProps {
  onScrollToNext: () => void;
}

export function PresentationHero({ onScrollToNext }: PresentationHeroProps) {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, var(--mantine-color-primary-6) 0%, var(--mantine-color-primary-8) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1, paddingBottom: '5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            order={1}
            size="4rem"
            fw={900}
            ta="center"
            c="white"
            mb="md"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
            }}
          >
            {t('presentation.hero.title')}
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Text
            size="xl"
            ta="center"
            c="white"
            mb="xl"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              maxWidth: '800px',
              margin: '0 auto 2rem',
            }}
          >
            {t('presentation.hero.subtitle')}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Group justify="center" gap="md" mb="xl">
            <Button
              size="lg"
              variant="white"
              color="primary"
              onClick={onScrollToNext}
              rightSection={<IconArrowDown size={20} />}
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {t('presentation.hero.startButton')}
            </Button>
          </Group>
        </motion.div>
      </Container>

      {/* Arrow indicator - positioned outside container to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <IconArrowDown size={32} color="white" style={{ opacity: 0.7 }} />
        </motion.div>
      </motion.div>
    </Box>
  );
}

