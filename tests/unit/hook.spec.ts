import { renderHook } from '@testing-library/react-hooks';
import { WindowResizeSubject, mocks } from '~fixtures/WindowResizeSubject';
import { useWindowSize, useWindowWidth, useWindowHeight } from '~/hooks';

jest.mock('window-resize-subject', () => ({
  WindowResizeSubject,
}));

const getWindowWidth = (): number => {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
};

const getWindowHeight = (): number => {
  return typeof window !== 'undefined' ? window.innerHeight : 0;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe.each`
  name                 | useXxx             | noSetValue                                                | setValue
  ${'useWindowSize'}   | ${useWindowSize}   | ${{ width: getWindowWidth(), height: getWindowHeight() }} | ${{ width: 100, height: 100 }}
  ${'useWindowWidth'}  | ${useWindowWidth}  | ${getWindowWidth()}                                       | ${200}
  ${'useWindowHeight'} | ${useWindowHeight} | ${getWindowHeight()}                                      | ${300}
`('$name', ({ useXxx, noSetValue, setValue }) => {
  describe('first call', () => {
    beforeEach(() => {
      renderHook(() => useXxx());
    });

    it('addObserver is called', () => {
      expect(mocks.addObserver).toBeCalledTimes(1);
    });

    it('subscribe is called', () => {
      expect(mocks.subscribe).toBeCalledTimes(1);
    });
  });

  describe('initial size', () => {
    it('no set', () => {
      const { result } = renderHook(() => useXxx());
      expect(result.current).toEqual(noSetValue);
    });

    it('set', () => {
      const { result } = renderHook(() => useXxx(setValue));
      expect(result.current).toEqual(setValue);
    });
  });

  describe('cleanup', () => {
    let unmount: () => boolean;

    beforeEach(() => {
      const hookResult = renderHook(() => useXxx());
      unmount = hookResult.unmount;
    });

    it('deleteObserver is called', () => {
      unmount();
      expect(mocks.deleteObserver).toBeCalledTimes(1);
    });

    it(`unsubscribe is called if subject has no observers`, () => {
      mocks.hasObserver.mockReturnValueOnce(false);
      unmount();
      expect(mocks.unsubscribe).toBeCalledTimes(1);
    });

    it('unsubscribe is not called if subject has observers', () => {
      mocks.hasObserver.mockReturnValueOnce(true);
      unmount();
      expect(mocks.unsubscribe).not.toBeCalled();
    });
  });
});
