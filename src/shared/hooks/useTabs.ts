import { useContext } from 'react';
import { TabContext } from '../context/TabContext';
import type { TabContextType, Tab } from '../types/tab.types';

/**
 * Hook to access and manage tabs.
 *
 * Provides a convenient interface to the tab context with
 * all tab management methods.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { openTab, closeTab, activeTabId } = useTabs();
 *
 *   const handleOpenDashboard = () => {
 *     openTab('dashboard');
 *   };
 *
 *   return <Button onClick={handleOpenDashboard}>Open Dashboard</Button>;
 * }
 * ```
 */
export function useTabs(): TabContextType {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
}

/**
 * Helper function to generate a unique tab ID.
 *
 * Always includes a timestamp and random string to ensure uniqueness,
 * even for tabs with the same componentId and params.
 *
 * @param componentId - Identifier of the component
 * @param params - Optional parameters
 * @returns Unique tab ID
 *
 * @example
 * ```tsx
 * const tabId = generateTabId('users-edit', { userId: '123' });
 * ```
 */
export function generateTabId(componentId: string, params?: Record<string, unknown>): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  
  if (params && Object.keys(params).length > 0) {
    const paramsKey = JSON.stringify(params);
    const paramsHash = paramsKey
      .split('')
      .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
      .toString(36);
    return `${componentId}-${paramsHash}-${timestamp}-${random}`;
  }
  return `${componentId}-${timestamp}-${random}`;
}

/**
 * Type guard to check if a value is a valid Tab.
 *
 * @param value - Value to check
 * @returns True if value is a valid Tab
 */
export function isTab(value: unknown): value is Tab {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'label' in value &&
    'componentId' in value &&
    'createdAt' in value &&
    typeof (value as Tab).id === 'string' &&
    typeof (value as Tab).label === 'string' &&
    typeof (value as Tab).componentId === 'string' &&
    typeof (value as Tab).createdAt === 'number'
  );
}

