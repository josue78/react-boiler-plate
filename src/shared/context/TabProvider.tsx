import { useState, useEffect, useCallback, useMemo } from 'react';
import { TabContext } from './TabContext';
import type { Tab, TabContextType } from '../types/tab.types';

const STORAGE_KEY = 'app-tabs-state';

/**
 * Tab state without icons (for localStorage serialization).
 * Icons cannot be serialized, so they are excluded from storage.
 */
interface StoredTab {
  id: string;
  label: string;
  componentId: string;
  params?: Record<string, unknown>;
  createdAt: number;
}

interface StoredTabState {
  tabs: StoredTab[];
  activeTabId: string | null;
}

/**
 * Generates a unique tab ID based on componentId and params.
 *
 * Always includes a timestamp to ensure uniqueness, even for tabs
 * with the same componentId and params.
 *
 * @param componentId - Identifier of the component
 * @param params - Optional parameters
 * @returns Unique tab ID
 */
function generateTabId(componentId: string, params?: Record<string, unknown>): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);

  if (params && Object.keys(params).length > 0) {
    // For tabs with params, include a hash of params in the ID
    const paramsKey = JSON.stringify(params);
    const paramsHash = paramsKey
      .split('')
      .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
      .toString(36);
    return `${componentId}-${paramsHash}-${timestamp}-${random}`;
  }
  // For tabs without params, use timestamp and random to ensure uniqueness
  return `${componentId}-${timestamp}-${random}`;
}

/**
 * Converts Tab to StoredTab (removes icon for serialization).
 */
function tabToStoredTab(tab: Tab): StoredTab {
  return {
    id: tab.id,
    label: tab.label,
    componentId: tab.componentId,
    params: tab.params,
    createdAt: tab.createdAt,
  };
}

/**
 * Converts StoredTab to Tab (icon will be undefined, restored from menu if needed).
 */
function storedTabToTab(storedTab: StoredTab): Tab {
  return {
    ...storedTab,
    icon: undefined, // Icons are not persisted, will be restored from menu when opening new tabs
  };
}

/**
 * Loads tabs state from localStorage.
 *
 * @returns Stored tab state or null if not found/invalid
 */
function loadTabsFromStorage(): StoredTabState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as StoredTabState;
    // Validate structure
    if (
      !parsed ||
      !Array.isArray(parsed.tabs) ||
      (parsed.activeTabId !== null && typeof parsed.activeTabId !== 'string')
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Saves tabs state to localStorage (without icons).
 *
 * @param tabs - Tabs to save
 * @param activeTabId - Active tab ID
 */
function saveTabsToStorage(tabs: Tab[], activeTabId: string | null): void {
  try {
    const storedTabs = tabs.map(tabToStoredTab);
    const state: StoredTabState = {
      tabs: storedTabs,
      activeTabId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save tabs to localStorage:', error);
  }
}

interface TabProviderProps {
  children: React.ReactNode;
  /** Default component ID to open on initial load if no tabs are restored */
  defaultComponentId?: string;
  /** Default label for the default tab */
  defaultLabel?: string;
  /** Default icon for the default tab */
  defaultIcon?: Tab['icon'];
}

/**
 * Provider component that manages tab state and persistence.
 *
 * Handles opening, closing, and switching tabs, and automatically
 * persists state to localStorage.
 *
 * @example
 * ```tsx
 * <TabProvider defaultComponentId="dashboard" defaultLabel="Dashboard">
 *   <AppShell />
 * </TabProvider>
 * ```
 */
export function TabProvider({
  children,
  defaultComponentId,
  defaultLabel,
  defaultIcon,
}: TabProviderProps) {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const stored = loadTabsFromStorage();
    if (stored && stored.tabs.length > 0) {
      // Convert stored tabs back to Tab objects (without icons)
      return stored.tabs.map(storedTabToTab);
    }
    // If no stored tabs and defaultComponentId is provided, create initial tab
    if (defaultComponentId) {
      const initialTab: Tab = {
        id: generateTabId(defaultComponentId),
        label: defaultLabel || defaultComponentId,
        componentId: defaultComponentId,
        createdAt: Date.now(),
        icon: defaultIcon,
      };
      return [initialTab];
    }
    return [];
  });

  const [activeTabId, setActiveTabId] = useState<string | null>(() => {
    const stored = loadTabsFromStorage();
    if (stored && stored.activeTabId) {
      // Verify the active tab still exists
      const activeTab = stored.tabs?.find((tab) => tab.id === stored.activeTabId);
      if (activeTab) {
        return stored.activeTabId;
      }
    }
    // If no valid active tab, use first tab or null
    const storedTabs = loadTabsFromStorage();
    if (storedTabs && storedTabs.tabs.length > 0) {
      return storedTabs.tabs[0].id;
    }
    if (defaultComponentId) {
      return generateTabId(defaultComponentId);
    }
    return null;
  });

  // Save to localStorage whenever tabs or activeTabId changes
  useEffect(() => {
    saveTabsToStorage(tabs, activeTabId);
  }, [tabs, activeTabId]);

  const openTab = useCallback(
    (
      componentId: string,
      params?: Record<string, unknown>,
      label?: string,
      icon?: Tab['icon']
    ): string => {
      // Always create a new tab, never reuse existing ones
      const newTabId = generateTabId(componentId, params);

      setTabs((currentTabs) => {
        const newTab: Tab = {
          id: newTabId,
          label: label || componentId,
          componentId,
          params,
          createdAt: Date.now(),
          icon,
        };

        // Add new tab and make it active
        setActiveTabId(newTab.id);
        return [...currentTabs, newTab];
      });

      return newTabId;
    },
    []
  );

  const closeTab = useCallback((tabId: string) => {
    setTabs((currentTabs) => {
      const filtered = currentTabs.filter((tab) => tab.id !== tabId);

      // If closing the active tab, switch to another one
      if (activeTabId === tabId) {
        const currentIndex = currentTabs.findIndex((tab) => tab.id === tabId);
        if (filtered.length > 0) {
          // Switch to tab at same index, or previous if at end
          const newIndex = Math.min(currentIndex, filtered.length - 1);
          setActiveTabId(filtered[newIndex].id);
        } else {
          setActiveTabId(null);
        }
      }

      return filtered;
    });
  }, [activeTabId]);

  const switchTab = useCallback((tabId: string) => {
    setTabs((currentTabs) => {
      const tabExists = currentTabs.some((tab) => tab.id === tabId);
      if (tabExists) {
        setActiveTabId(tabId);
      }
      return currentTabs;
    });
  }, []);

  const getActiveTab = useCallback((): Tab | null => {
    if (!activeTabId) return null;
    return tabs.find((tab) => tab.id === activeTabId) || null;
  }, [tabs, activeTabId]);

  const getTabs = useCallback((): Tab[] => {
    return tabs;
  }, [tabs]);

  const closeAllTabs = useCallback(() => {
    setTabs([]);
    setActiveTabId(null);
  }, []);

  const closeOtherTabs = useCallback((tabId: string) => {
    setTabs((currentTabs) => {
      const tabToKeep = currentTabs.find((tab) => tab.id === tabId);
      if (tabToKeep) {
        setActiveTabId(tabId);
        return [tabToKeep];
      }
      return currentTabs;
    });
  }, []);

  const value = useMemo<TabContextType>(
    () => ({
      tabs,
      activeTabId,
      openTab,
      closeTab,
      switchTab,
      getActiveTab,
      getTabs,
      closeAllTabs,
      closeOtherTabs,
    }),
    [tabs, activeTabId, openTab, closeTab, switchTab, getActiveTab, getTabs, closeAllTabs, closeOtherTabs]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}


