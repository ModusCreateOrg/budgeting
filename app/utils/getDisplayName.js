// @flow

/**
 * Returns the display name of a component. Useful for making HOCs
 */
export default function getDisplayName(Component: React.ComponentType): string {
  return Component.displayName || Component.name || 'Component';
}
