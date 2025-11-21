import { createContext } from 'react';
import type { TabContextType } from '../types/tab.types';

/**
 * React context for tab management.
 *
 * Provides access to tab state and operations through the TabProvider.
 * Use the useTabs hook to access this context.
 */
export const TabContext = createContext<TabContextType | undefined>(undefined);

