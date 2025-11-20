import { Container, Title, Text, Button, Group, Box, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IconSparkles, IconCode, IconBook } from '@tabler/icons-react';

export function CallToAction() {
  const { t } = useTranslation();

  return (
    <Box
      py="xl"
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
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
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
            }}
          >
            {t('presentation.cta.title')}
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
              maxWidth: '700px',
              margin: '0 auto 2rem',
            }}
          >
            {t('presentation.cta.subtitle')}
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Group justify="center" gap="md">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="white"
                color="primary"
                leftSection={<IconSparkles size={20} />}
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {t('presentation.cta.getStarted')}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                color="white"
                leftSection={<IconBook size={20} />}
                style={{
                  borderColor: 'white',
                  color: 'white',
                }}
              >
                {t('presentation.cta.documentation')}
              </Button>
            </motion.div>
          </Group>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ marginTop: '3rem' }}
        >
          <Stack align="center" gap="xs">
            <Text size="sm" c="white" style={{ opacity: 0.8 }}>
              {t('presentation.cta.footer')}
            </Text>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <IconCode size={24} color="white" style={{ opacity: 0.6 }} />
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}

