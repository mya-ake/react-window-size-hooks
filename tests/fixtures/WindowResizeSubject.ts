export const mocks = {
  addObserver: jest.fn(),
  deleteObserver: jest.fn(),
  hasObserver: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

export class WindowResizeSubject {
  addObserver(...args: unknown[]) {
    mocks.addObserver(...args);
    return this;
  }

  deleteObserver(...args: unknown[]) {
    mocks.deleteObserver(...args);
    return this;
  }

  hasObserver() {
    return mocks.hasObserver();
  }

  subscribe() {
    mocks.subscribe();
    return this;
  }

  unsubscribe() {
    mocks.unsubscribe();
    return this;
  }
}
