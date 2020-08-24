import { useState, useEffect } from 'react';
import { WindowResizeSubject } from 'window-resize-subject';
import type { WindowResizeObserver } from 'window-resize-subject';

/** types */
type SizeValue = number;
type Size = {
  width: SizeValue;
  height: SizeValue;
};
export type InitailSize = Size;

/** singleton */
const subject = new WindowResizeSubject();

/** functions */
const createInitailSizeValue = (value?: SizeValue): SizeValue => value ?? 0;

const createInitailSize = (size?: InitailSize): InitailSize => {
  return {
    width: createInitailSizeValue(size?.width),
    height: createInitailSizeValue(size?.height),
  };
};

/** main */
export const useWindowSize = (initailSize?: InitailSize) => {
  const [size, setSize] = useState<Size>(createInitailSize(initailSize));
  const [uid] = useState(Symbol('window-size'));

  useEffect(() => {
    const observer: WindowResizeObserver = ({ width, height }) => {
      setSize({ width, height });
    };
    subject.addObserver(uid, observer).subscribe();

    return () => {
      subject.deleteObserver(uid);
      if (!subject.hasObserver()) {
        subject.unsubscribe();
      }
    };
  }, []);

  return size;
};

export const useWindowWidth = (initailWidth?: SizeValue) => {
  const [size, setSize] = useState<SizeValue>(
    createInitailSizeValue(initailWidth),
  );
  const [uid] = useState(Symbol('window-size'));

  useEffect(() => {
    const observer: WindowResizeObserver = ({ width }) => {
      setSize(width);
    };
    subject.addObserver(uid, observer).subscribe();

    return () => {
      subject.deleteObserver(uid);
      if (!subject.hasObserver()) {
        subject.unsubscribe();
      }
    };
  }, []);

  return size;
};

export const useWindowHeight = (initailHeight?: SizeValue) => {
  const [size, setSize] = useState<SizeValue>(
    createInitailSizeValue(initailHeight),
  );
  const [uid] = useState(Symbol('window-size'));

  useEffect(() => {
    const observer: WindowResizeObserver = ({ height }) => {
      setSize(height);
    };
    subject.addObserver(uid, observer).subscribe();

    return () => {
      subject.deleteObserver(uid);
      if (!subject.hasObserver()) {
        subject.unsubscribe();
      }
    };
  }, []);

  return size;
};
