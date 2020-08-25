# react-window-size-hooks

[![npm version](https://badge.fury.io/js/react-window-size-hooks.svg)](https://badge.fury.io/js/react-window-size-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI Status](https://github.com/mya-ake/react-window-size-hooks/workflows/Main%20Workflow/badge.svg)

> React hooks to get the window size.

## Install

**npm**

```bash
$ npm i react-window-size-hooks
```

**yarn**

```bash
$ yarn add react-window-size-hooks
```

## Usage

```js
import React from 'react';
import { useWindowSize } from 'react-window-size-hooks';

export const ShowWindowSize = () => {
  const { width, height } = useWindowSize();
  // do something
};
```

### use only the width or height

```js
import React from 'react';
import { useWindowWidth, useWindowHeight } from 'react-window-size-hooks';

export const ShowWindowSize = () => {
  const width = useWindowWidth();
  const height = useWindowHeight();
  // do something
};
```

### used in SSR

Set an arbitrary initial value.
If not set, the size is 0.

```js
import React from 'react';
import { useWindowSize } from 'react-window-size-hooks';

export const ShowWindowSize = () => {
  const { width, height } = useWindowSize({
    width: 800,
    height: 600,
  });
  // do something
};
```

## FAQ

### What is the interval between Throttling?

33ms. It's about 30FPS.

### What are the characteristics of the react-window-size-hooks?

- Only one resize event is registered, even if used in multiple locations.
  - Throttling is also done in one place, which is efficient.
- Supports TypeScript.

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/mya-ake/react-window-size-hooks/issues) or a [pull request](https://github.com/mya-ake/react-window-size-hooks/pulls).

## License

[MIT](https://github.com/mya-ake/react-window-size-hooks/blob/master/LICENSE)
