// @flow
export type HigherOrderComponent<RequiredProps: {}, ProvidedProps: {}> = <OriginalProps: {}>(
  component: React.ComponentType<OriginalProps>
) => React.ComponentType<RequiredProps & $Diff<OriginalProps, ProvidedProps>>;
