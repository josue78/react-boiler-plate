import { ScrollArea, Box, ActionIcon, Tooltip } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { NavMenu } from './NavMenu';
import type { MenuItem } from '../types/menu.types';

interface SidebarProps {
  menuItems: MenuItem[];
  onClose: () => void;
  opened: boolean;
}

export function Sidebar({ menuItems, onClose, opened }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Button positioned outside sidebar when closed, inside when open */}
      <Box
        style={{
          position: "fixed",
          top: "calc(60px + 1rem)",
          left: opened ? "calc(280px - 2.5rem)" : "0.5rem",
          zIndex: 300,
          transition: "left 0.3s ease-in-out",
        }}
      >
        <Tooltip label={opened ? t('sidebar.close') : t('sidebar.open')}>
          <ActionIcon
            variant="subtle"
            size="sm"
            aria-label={opened ? t('sidebar.closeAria') : t('sidebar.openAria')}
            onClick={onClose}
            style={{ position: "relative" }}
          >
            <motion.div
              animate={{ rotate: opened ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IconChevronLeft size={16} />
            </motion.div>
          </ActionIcon>
        </Tooltip>
      </Box>
      {/* Sidebar content */}
      <Box style={{ height: "100%", width: "100%", position: "relative" }}>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ 
                height: "100%", 
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <ScrollArea h="100%">
                <Box p="md" data-tour="sidebar">
                  <Box h={40} mb="xs" />
                  <NavMenu items={menuItems} />
                </Box>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
}
