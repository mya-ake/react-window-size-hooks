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

/** privates */
const isBrowser = typeof window !== 'undefined';
const getWindowWidth = (): SizeValue => (isBrowser ? window.innerWidth : 0);
const getWindowHeight = (): SizeValue => (isBrowser ? window.innerHeight : 0);
const createInitailWidth = (value?: SizeValue): SizeValue =>
  value ?? getWindowWidth();
const createInitailHeight = (value?: SizeValue): SizeValue =>
  value ?? getWindowHeight();

const createInitailSize = (size?: InitailSize): InitailSize => {
  return {
    width: createInitailWidth(size?.width),
    height: createInitailHeight(size?.height),
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
  const [size, setSize] = useState<SizeValue>(createInitailWidth(initailWidth));
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
    createInitailHeight(initailHeight),
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
