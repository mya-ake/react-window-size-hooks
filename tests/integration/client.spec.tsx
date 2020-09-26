import React from 'react';
import { render, act } from '@testing-library/react';
import {
  WindowSizeComponent,
  WindowWidthComponent,
  WindowHeightComponent,
} from '~fixtures/TestComponents';
import {
  getWindowWidth,
  getWindowHeight,
  resizeWindow,
} from '~fixtures/shared';

describe('useWindowSize', () => {
  it('window sizes are rendered', () => {
    const { getByTestId } = render(<WindowSizeComponent />);
    expect(getByTestId('width').textContent).toBe(getWindowWidth().toString());
    expect(getByTestId('height').textContent).toBe(
      getWindowHeight().toString(),
    );
  });

  it('the values are updated in the resize event', () => {
    const { getByTestId, rerender } = render(<WindowSizeComponent />);
    act(() => {
      resizeWindow(800, 600);
    });
    rerender(<WindowSizeComponent />);
    expect(getByTestId('width').textContent).toBe('800');
    expect(getByTestId('height').textContent).toBe('600');
  });
});

describe('useWindowWidth', () => {
  it('window width is rendered', () => {
    const { getByTestId } = render(<WindowWidthComponent />);
    expect(getByTestId('width').textContent).toBe(getWindowWidth().toString());
  });

  it('the value is updated in the resize event', () => {
    const { getByTestId, rerender } = render(<WindowWidthComponent />);
    act(() => {
      resizeWindow(800, 600);
    });
    rerender(<WindowWidthComponent />);
    expect(getByTestId('width').textContent).toBe('800');
  });
});

describe('useWindowHeight', () => {
  it('window height is rendered', () => {
    const { getByTestId } = render(<WindowHeightComponent />);
    expect(getByTestId('height').textContent).toBe(
      getWindowHeight().toString(),
    );
  });

  it('the value is updated in the resize event', () => {
    const { getByTestId, rerender } = render(<WindowHeightComponent />);
    act(() => {
      resizeWindow(800, 600);
    });
    rerender(<WindowHeightComponent />);
    expect(getByTestId('height').textContent).toBe('600');
  });
});
