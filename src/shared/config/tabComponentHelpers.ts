import { tabComponents } from './tabComponents';

/**
 * Gets a component by its ID.
 *
 * @param componentId - Identifier of the component
 * @returns Component function or null if not found
 */
export function getTabComponent(componentId: string): ((params?: Record<string, unknown>) => React.ReactNode) | null {
  return tabComponents[componentId] || null;
}

/**
 * Checks if a component ID exists in the registry.
 *
 * @param componentId - Identifier to check
 * @returns True if component exists
 */
export function hasTabComponent(componentId: string): boolean {
  return componentId in tabComponents;
}

