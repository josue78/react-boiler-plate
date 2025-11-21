import type { Icon } from '@tabler/icons-react';
import type { ReactNode } from 'react';

/**
 * Represents a single tab in the application.
 *
 * Each tab has a unique ID and contains a component to render
 * along with optional parameters and metadata.
 */
export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: string;
  /** Identifier of the component to render in this tab */
  componentId: string;
  /** Optional parameters to pass to the component */
  params?: Record<string, unknown>;
  /** Optional icon for the tab */
  icon?: Icon;
  /** Timestamp when the tab was created */
  createdAt: number;
}

/**
 * Registry mapping component IDs to React components.
 *
 * This allows dynamic component loading based on componentId.
 */
export type TabComponentRegistry = Record<
  string,
  (params?: Record<string, unknown>) => ReactNode
>;

/**
 * Context type for the tabs system.
 *
 * Provides methods to manage tabs: opening, closing, switching,
 * and accessing tab state.
 */
export interface TabContextType {
  /** Array of all open tabs */
  tabs: Tab[];
  /** ID of the currently active tab */
  activeTabId: string | null;
  /**
   * Opens a new tab or switches to existing one if already open.
   *
   * @param componentId - Identifier of the component to render
   * @param params - Optional parameters for the component
   * @param label - Display label for the tab (optional, will use default if not provided)
   * @param icon - Optional icon for the tab
   * @returns The ID of the opened/activated tab
   */
  openTab: (
    componentId: string,
    params?: Record<string, unknown>,
    label?: string,
    icon?: Icon
  ) => string;
  /**
   * Closes a tab by its ID.
   *
   * @param tabId - ID of the tab to close
   */
  closeTab: (tabId: string) => void;
  /**
   * Switches to a different tab by its ID.
   *
   * @param tabId - ID of the tab to switch to
   */
  switchTab: (tabId: string) => void;
  /**
   * Gets the currently active tab.
   *
   * @returns The active tab or null if no tab is active
   */
  getActiveTab: () => Tab | null;
  /**
   * Gets all open tabs.
   *
   * @returns Array of all open tabs
   */
  getTabs: () => Tab[];
  /**
   * Closes all tabs.
   */
  closeAllTabs: () => void;
  /**
   * Closes all tabs except the specified one.
   *
   * @param tabId - ID of the tab to keep open
   */
  closeOtherTabs: (tabId: string) => void;
}

