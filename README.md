# react-marquee-ticker

A lightweight React component for vertically looping texts, with optional horizontal marquee animation when content overflows.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/react-marquee-ticker
[downloads-image]: http://img.shields.io/npm/dm/react-marquee-ticker.svg
[npm-image]: http://img.shields.io/npm/v/react-marquee-ticker.svg

## 🚀 Basic Usage

```jsx
import MarqueeTicker from 'react-marquee-ticker';

<MarqueeTicker
  items={[
    'Short notice',
    'This is a very long notice that will scroll horizontally when overflowed'
  ]}
  itemHeight="60px"
/>
```

The above is equivalent to:

```jsx
<MarqueeTicker itemHeight="60px">
  <MarqueeTicker.Item>Short notice</MarqueeTicker.Item>
  <MarqueeTicker.Item>This is a very long notice that will scroll horizontally when overflowed.</MarqueeTicker.Item>
</MarqueeTicker>
```

> ⚠️ When the `items` prop is provided, `children` will be ignored

## 🎮 Demo

👉 https://superRaytin.github.io/react-marquee-ticker/


## 📦 Installation

```bash
# yarn
yarn add react-marquee-ticker

# npm
npm i react-marquee-ticker
```

## 🧩 Props

| Prop | Type | Default | Description |
|----|----|----|----|
| `items` | `<ReactElement \| string>[]` | `[]` | List of ticker items |
| `placeholder` | `string` | `-` | Text shown when `items` is empty |
| `itemHeight` | `string` | **required** | Height of each item (e.g. `"47px"`) |
| `style` | `React.CSSProperties` | `-` | Inline styles for the container |
| `className` | `string` | `-` | Container class name |
| `singleLine` | `boolean` | `false` | Enable single-line mode with ellipsis (`nowrap + ellipsis`). Only works when `autoMarquee={false}` |
| `interval` | `number` | `3000` | Stay duration for each item (ms) |
| `speed` | `number` | `400` | Vertical scroll speed (ms) |
| `paused` | `boolean` | `false` | Pause vertical scrolling |

### Horizontal Marquee (Overflow)

> Only works when text width exceeds the container width.

| Prop | Type | Default | Description |
|----|----|----|----|
| `autoMarquee` | `boolean` | `true` | Enable horizontal marquee when text overflows |
| `marqueeSpeed` | `number` | `30` | Horizontal scroll speed (px/s) |
| `marqueeDelayBeforeScroll` | `number` | `0` | Delay before horizontal scrolling starts (ms) |
| `marqueeDelayAfterScroll` | `number` | `0` | Delay after horizontal scrolling ends (ms) |

### Slots

> Slots are render functions returning `ReactNode`.

| Prop | Type | Description |
|----|----|----|
| `prefix` | `() => ReactNode` | Content rendered before the text |
| `suffix` | `() => ReactNode` | Content rendered after the text |

Example:

```tsx
<MarqueeTicker
  // ...
  prefix={() => <span className="prefix">🔔</span>}
  suffix={() => <span className="suffix">NEW</span>}
/>
```

### Children

| Prop | Type | Description |
|----|----|----|
| `children` | `ReactElement[]` | Alternative way to provide items |

When `autoMarquee` is enabled and the content **may exceed the container width**, it is recommended to use the `Mask` + `Text` structure to ensure horizontal scrolling works correctly:

```jsx
<MarqueeTicker itemHeight="60px" autoMarquee>
  <MarqueeTicker.Item>
    <MarqueeTicker.Mask>
      <MarqueeTicker.Text>Short notice</MarqueeTicker.Text>
    </MarqueeTicker.Mask>
  </MarqueeTicker.Item>

  <MarqueeTicker.Item>
    <MarqueeTicker.Mask>
      <MarqueeTicker.Text>
        This is a very long notice that will scroll horizontally when overflowed.
        &nbsp;<a href="#">See Details</a>
      </MarqueeTicker.Text>
    </MarqueeTicker.Mask>
  </MarqueeTicker.Item>
</MarqueeTicker>
```

#### Structure Overview

```jsx
<Item>
  <Mask>   // Defines the visible clipping area
    <Text> // The actual horizontally scrolling content
    </Text>
  </Mask>
</Item>
```

- `Mask` controls the visible area (typically `overflow: hidden`)
- `Text` is the element that participates in horizontal animation
- The component measures the actual width of `Text` to calculate scroll distance and duration automatically


## 🕰️ Legacy React Support

For very old React versions **before hooks** (for example **React 0.14.x**), this package provides a legacy entry:

```ts
import MarqueeTicker from 'react-marquee-ticker/legacy'
```

This entry uses classic class-based lifecycle methods (componentDidMount, componentWillReceiveProps, componentWillUnmount).

It has been verified to work correctly in:
- React 0.14.9
- React 15.7.0
- React 16.7.0

> ⚠️ In React **16.3+**, componentWillReceiveProps is considered legacy and may trigger warnings under **StrictMode**, but it still works as expected.

### Limitations

The legacy build is intentionally **minimal and stable**:

- ❌ No Hooks
- ❌ No `Item / Mask / Text` sub components
- ❌ No compound component API
- ✅ Basic children or `items` usage

### Supported children structure

When using **children mode** in legacy React, you must provide **plain DOM structure**. Only the following pattern is supported:

```jsx
<MarqueeTicker itemHeight="60px">
  <div key={1} className="ticker-item">
    <div className="ticker-mask">
      <div className="ticker-text">content 1</div>
    </div>
  </div>
  <div key={2} className="ticker-item">
    <div className="ticker-mask">
      <div className="ticker-text">content 2</div>
    </div>
  </div>
</MarqueeTicker>
```

Notes:

- The component **does not validate or transform children** in legacy mode
- Class names (`ticker-item`, `ticker-mask`, `ticker-text`) are required for layout and scrolling
- Any other structure may result in undefined behavior

If you need `Item / Mask / Text` composition or automatic marquee behavior, please use the modern entry with React `16.8+`.

# License

MIT, see the [LICENSE](/LICENSE) file for detail.
