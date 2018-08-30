// @flow
import type { ComponentType } from 'react';

/**
 * Returns the display name of a component. Useful for making HOCs
 */
export default function getDisplayName(Component: ComponentType<any>): string {
  return Component.displayName || Component.name || 'Component';
}
