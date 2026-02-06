# Scatter Chart

Interactive scatter and bubble chart component with automatic series detection, customizable point styling, and comprehensive tooltip controls.

## Features

- **Auto-detects series** from JSON data — each numeric key becomes a separate series
- **Scatter or bubble mode** — fixed point size or variable size based on Z-axis
- **Color differentiation** — opacity, brightness, contrast, saturation, hue-rotate, or direct CSV colors
- **Custom tooltip** — fully styled with separate font controls for title and values
- **Point shapes** — circle, square, triangle, or diamond
- **Axis controls** — min/max values, colors, labels
- **Value formatting** — number (K/M suffix), percent, currency, multiplier

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | string | — | JSON array with X/Y coordinates (e.g., `[{ x: 10, y: 20 }, ...]`) |
| `xAxisKey` | string | `'x'` | Property name for X-axis values |
| `chartType` | string | `'scatter'` | `'scatter'` or `'bubble'` |
| `sizeKey` | string | `'z'` | For bubble chart: property that controls bubble size |
| `baseColor` | string | `'#00a0dc'` | Base color or CSV of colors |
| `colorMode` | string | `'opacity'` | Color differentiation mode |
| `colorIncrement` | number | `25` | Amount of color variation per series |
| `colorDirection` | string | `'first-to-last'` | Direction of color progression |
| `pointSize` | number | `60` | Base size of points (bubble mode uses this as median) |
| `pointShape` | string | `'circle'` | Shape: `'circle'`, `'square'`, `'triangle'`, `'diamond'` |
| `showCartesianGrid` | boolean | `true` | Show grid lines |
| `showXAxis` | boolean | `true` | Show X-axis tick labels |
| `showYAxis` | boolean | `true` | Show Y-axis tick labels |
| `showTooltip` | boolean | `true` | Show tooltip on hover |
| `showLegend` | boolean | `true` | Show legend |
| `enableAnimation` | boolean | `true` | Enable animations |
| `valueFormat` | string | `'number'` | Format: `'number'`, `'percent'`, `'currency'`, `'multiplier'` |
| `currencySymbol` | string | `'£'` | Currency symbol for currency format |
| `gridStrokeDasharray` | string | `'3 3'` | Grid line pattern |
| `gridColor` | string | `'#ccc'` | Grid line color |
| `axisLineColor` | string | `'#666'` | X/Y axis line color |
| `minXValue` | number | — | Minimum X-axis value (auto if empty) |
| `maxXValue` | number | — | Maximum X-axis value (auto if empty) |
| `minYValue` | number | — | Minimum Y-axis value (auto if empty) |
| `maxYValue` | number | — | Maximum Y-axis value (auto if empty) |
| `height` | number | `400` | Chart height in pixels |
| `yAxisWidth` | number | `60` | Y-axis label area width |
| `xAxisLabel` | string | `''` | X-axis label text |
| `yAxisLabel` | string | `''` | Y-axis label text |
| `tooltipBackgroundColor` | string | `'#ffffff'` | Tooltip background color |
| `tooltipBorderRadius` | number | `8` | Tooltip corner radius |
| `tooltipTitleFontSize` | number | `14` | Tooltip title font size |
| `tooltipValueFontSize` | number | `20` | Tooltip value font size |
| `tooltipShowSeriesName` | boolean | `true` | Show series name in tooltip |
| `tooltipTitleFontWeight` | number | `700` | Tooltip title font weight |
| `tooltipValueFontWeight` | number | `700` | Tooltip value font weight |
| `tooltipTitleFontFamily` | string | `'inherit'` | Tooltip title font family |
| `tooltipValueFontFamily` | string | `'inherit'` | Tooltip value font family |
| `id` | string | — | Element ID for anchors/accessibility |

## Data Format

### Single Series Scatter Chart

Each object needs X and Y coordinates:

```json
[
  { "x": 10, "y": 120 },
  { "x": 20, "y": 180 },
  { "x": 30, "y": 150 }
]
```

### Multiple Series (with Category)

Add a category property to group points into different series:

```json
[
  { "x": 10, "y": 120, "category": "Product A" },
  { "x": 20, "y": 180, "category": "Product A" },
  { "x": 15, "y": 90, "category": "Product B" },
  { "x": 25, "y": 140, "category": "Product B" }
]
```

Set `categoryKey` to `"category"` to create two series: "Product A" and "Product B".

### Bubble Chart

Add a Z dimension for variable bubble sizes:

```json
[
  { "x": 10, "y": 120, "z": 50 },
  { "x": 20, "y": 180, "z": 80 },
  { "x": 30, "y": 150, "z": 120 }
]
```

Set `chartType` to `'bubble'` and `sizeKey` to `'z'`.

## Webflow Setup

1. Add component to canvas
2. Paste your JSON data into "Chart Data (JSON)" field
3. Set X-Axis Key to match your data property
4. Choose scatter or bubble mode
5. Customize colors, point styling, and tooltip appearance

## Styling

- **Colors**: Use `baseColor` for single color with variations, or CSV for direct series colors
- **Points**: Control size via `pointSize` and shape via `pointShape`
- **Grid/Axes**: Customize colors with `gridColor` and `axisLineColor`
- **Tooltip**: Full control over background, border radius, fonts, and colors

## Technical Notes

- Built with Recharts (scatter/bubble chart components)
- SSR disabled (uses browser-only rendering)
- Inherits font from page via `fontFamily: 'inherit'`
- Auto-scales axes unless min/max values are set
- K/M suffixes applied automatically for large numbers
