import { ActionIcon, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconMaximize, IconMinimize } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useFullscreen } from '../hooks/useFullscreen';

export function FullscreenControls() {
  const { t } = useTranslation();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
      }}
    >
      <Tooltip label={isFullscreen ? t('presentation.exitFullscreen') : t('presentation.enterFullscreen')}>
        <ActionIcon
          variant="filled"
          size="lg"
          color="primary"
          onClick={() => toggleFullscreen()}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {isFullscreen ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
        </ActionIcon>
      </Tooltip>
    </motion.div>
  );
}

