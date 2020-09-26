import React from 'react';
import { useWindowSize, useWindowWidth, useWindowHeight } from '~/hooks';

export const WindowSizeComponent: React.FC = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <div data-testid="width">{width}</div>
      <div data-testid="height">{height}</div>
    </>
  );
};

export const WindowWidthComponent: React.FC = () => {
  const width = useWindowWidth();
  return (
    <>
      <div data-testid="width">{width}</div>
    </>
  );
};

export const WindowHeightComponent: React.FC = () => {
  const height = useWindowHeight();
  return (
    <>
      <div data-testid="height">{height}</div>
    </>
  );
};
