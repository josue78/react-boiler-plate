import { useState, useRef, useEffect } from 'react';
import { Tabs, ScrollArea, Text, Box, useMantineTheme, ActionIcon, Group, Menu } from '@mantine/core';
import { IconX, IconChevronLeft, IconChevronRight, IconSquareX, IconTrash } from '@tabler/icons-react';
import { useTabs } from '../../shared/hooks/useTabs';
import { getTabComponent } from '../../shared/config/tabComponentHelpers';
import { useTranslation } from 'react-i18next';

/**
 * Container component that renders tabs and their content.
 *
 * Displays all open tabs with close buttons and handles tab switching.
 * Renders the active tab's component content below the tabs.
 *
 * @example
 * ```tsx
 * <TabsContainer />
 * ```
 */
export function TabsContainer() {
  const { tabs, activeTabId, switchTab, closeTab, closeOtherTabs, closeAllTabs } = useTabs();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [contextMenuTabId, setContextMenuTabId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);

  // Check scroll position to show/hide navigation buttons
  const checkScrollPosition = () => {
    if (!viewportRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition();
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener('scroll', checkScrollPosition);
      // Also check on resize
      const resizeObserver = new ResizeObserver(checkScrollPosition);
      resizeObserver.observe(viewport);
      return () => {
        viewport.removeEventListener('scroll', checkScrollPosition);
        resizeObserver.disconnect();
      };
    }
  }, [tabs]);

  // Scroll functions
  const scrollLeft = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      switchTab(value);
      // After switching, ensure the active tab is visible
      setTimeout(() => {
        const activeTabElement = document.querySelector(`[data-tab-id="${value}"]`);
        if (activeTabElement && viewportRef.current) {
          activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          setTimeout(checkScrollPosition, 300);
        }
      }, 0);
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    closeTab(tabId);
  };

  const handleContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuTabId(tabId);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenuTabId(null);
    setContextMenuPosition(null);
  };

  // Close context menu when clicking outside
  useEffect(() => {
    if (!contextMenuTabId) return;

    const handleClickOutside = () => {
      setContextMenuTabId(null);
      setContextMenuPosition(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuTabId]);

  const handleCloseThisTab = (tabId: string) => {
    closeTab(tabId);
    setContextMenuTabId(null);
  };

  const handleCloseOtherTabs = (tabId: string) => {
    closeOtherTabs(tabId);
    setContextMenuTabId(null);
  };

  const handleCloseAllTabs = () => {
    closeAllTabs();
    setContextMenuTabId(null);
  };

  const activeTab = tabs.length > 0 ? (tabs.find((tab) => tab.id === activeTabId) || tabs[0]) : null;
  const ActiveComponent = activeTab ? getTabComponent(activeTab.componentId) : null;

  // Don't render if no tabs
  if (tabs.length === 0) {
    return (
      <Box p="xl" style={{ textAlign: 'center' }}>
        <Text c="dimmed">{t('tabs.noTabsOpen', 'No tabs open')}</Text>
      </Box>
    );
  }

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tabs bar */}
      <Box
        style={{
          borderBottom: '1px solid var(--mantine-color-gray-3)',
          backgroundColor: 'var(--mantine-color-body)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Box
          style={{
            flex: 1,
            position: 'relative',
            minWidth: 0,
            overflow: 'hidden',
          }}
          ref={scrollAreaRef}
        >
          <ScrollArea
            type="scroll"
            scrollbarSize={0}
            viewportRef={viewportRef}
            onScrollPositionChange={checkScrollPosition}
            style={{ width: '100%' }}
            styles={{
              scrollbar: {
                display: 'none',
              },
              thumb: {
                display: 'none',
              },
            }}
          >
            <Tabs value={activeTabId || undefined} onChange={handleTabChange}>
              <Tabs.List style={{ borderBottom: 'none', flexWrap: 'nowrap' }}>
                {tabs.map((tab) => {
                  // Safely check if icon is a valid React component
                  const IconComponent = tab.icon && typeof tab.icon === 'function' ? tab.icon : null;
                  return (
                    <Tabs.Tab
                      key={tab.id}
                      value={tab.id}
                      data-tab-id={tab.id}
                      onContextMenu={(e) => handleContextMenu(e, tab.id)}
                      leftSection={IconComponent ? <IconComponent size={16} /> : undefined}
                      rightSection={
                        <Box
                          component="span"
                          onMouseDown={(e) => handleCloseTab(e, tab.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 16,
                            height: 16,
                            marginLeft: 8,
                            borderRadius: theme.radius.sm,
                            cursor: 'pointer',
                            color: theme.colors.gray[6],
                            transition: 'background-color 150ms, color 150ms',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = theme.colors.gray[1];
                            e.currentTarget.style.color = theme.colors.gray[9];
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = theme.colors.gray[6];
                          }}
                          aria-label={t('tabs.closeTab', 'Close tab')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              closeTab(tab.id);
                            }
                          }}
                        >
                          <IconX size={12} />
                        </Box>
                      }
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {tab.label}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
            </Tabs>
          </ScrollArea>
        </Box>

        {/* Navigation buttons */}
        {(canScrollLeft || canScrollRight) && (
          <Group gap={4} style={{ paddingRight: 8 }}>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label={t('tabs.scrollLeft', 'Scroll left')}
            >
              <IconChevronLeft size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label={t('tabs.scrollRight', 'Scroll right')}
            >
              <IconChevronRight size={16} />
            </ActionIcon>
          </Group>
        )}
      </Box>

      {/* Context menu */}
      {contextMenuTabId && contextMenuPosition && (
        <Menu
          opened={true}
          onClose={handleCloseContextMenu}
          position="bottom-start"
          withinPortal
        >
          <Menu.Target>
            <Box
              style={{
                position: 'fixed',
                left: contextMenuPosition.x,
                top: contextMenuPosition.y,
                width: 1,
                height: 1,
                pointerEvents: 'none',
              }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconX size={16} />}
              onClick={() => handleCloseThisTab(contextMenuTabId)}
            >
              {t('tabs.contextMenu.close', 'Close')}
            </Menu.Item>
            {tabs.length > 1 && (
              <Menu.Item
                leftSection={<IconSquareX size={16} />}
                onClick={() => handleCloseOtherTabs(contextMenuTabId)}
              >
                {t('tabs.contextMenu.closeOthers', 'Close Others')}
              </Menu.Item>
            )}
            {tabs.length > 1 && (
              <Menu.Item
                leftSection={<IconTrash size={16} />}
                onClick={handleCloseAllTabs}
                color="red"
              >
                {t('tabs.contextMenu.closeAll', 'Close All')}
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      )}

      {/* Tab content */}
      <Box style={{ flex: 1, overflow: 'auto' }}>
        {ActiveComponent ? (
          ActiveComponent(activeTab.params)
        ) : (
          <Box p="xl" style={{ textAlign: 'center' }}>
            <Text c="dimmed">
              {t('tabs.componentNotFound', 'Component not found: {{componentId}}', {
                componentId: activeTab?.componentId,
              })}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

