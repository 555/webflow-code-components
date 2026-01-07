# Horizontal Bar Chart

A responsive horizontal bar chart component designed for comparing 3 data points (e.g., year-over-year metrics). Features automatic opacity variation from a single base color and clean, modern styling.

## Features

- **Responsive Design**: Automatically fills parent width with configurable height
- **3-Bar Limit**: Optimized for displaying exactly 3 data points
- **Automatic Opacity Variation**: Single base color with 3 opacity levels (50%, 75%, 100%)
- **Interactive Hover Effect**: Bars darken by 3% on hover for subtle feedback
- **Font Inheritance**: Inherits typography from your Webflow site
- **Interactive Tooltips**: Hover to view detailed data points
- **Flexible Formatting**: Display values as percentages or plain numbers
- **Value Labels**: Optional labels displayed on the right end of bars
- **Customizable Styling**: Adjust spacing, colors, radius, and more
- **Works with Color Variables**: Perfect for use with Webflow color variables

## Props

### Data Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Chart Data (JSON) | Text | Sample data | JSON array with exactly 3 items |
| Label Key | Text | `"label"` | Property name for bar labels (e.g., years) |
| Value Key | Text | `"value"` | Property name for bar values |

### Color Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Base Color | Text | `"#ff007a"` | Base color for all bars (top bar is 50% opacity, middle is 75% opacity, bottom is 100% opacity). Darkens by 3% on hover. |

### Chart Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Show Grid | Boolean | `true` | Display vertical grid lines |
| Grid Stroke Color | Text | `"#e6e6e6"` | Color for the grid lines (hex, rgb, or color name) |
| Show Top Axis | Boolean | `true` | Display axis with values at top |
| Show Left Labels | Boolean | `true` | Display labels on left side |
| Show Value Labels | Boolean | `true` | Display value labels on right end of bars |
| Show Tooltip | Boolean | `true` | Show interactive tooltip on hover |
| Left Label Width | Number | `50` | Width allocated for left labels (30-150px) |

### Value Range

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Min Value | Number | `0` | Minimum value for axis scale |
| Max Value | Number | `20` | Maximum value for axis scale |
| Value Format | Variant | `"percent"` | Display as "Percentage (%)" or "Number" |

### Dimensions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Chart Height | Number | `160` | Height of chart in pixels (100-500px) |
| Bar Spacing | Number | `4` | Spacing between bars in pixels |

### Bar Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Bar Corner Radius | Number | `8` | Border radius for right corners (0-50px) |

### Label Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Label Font Weight | Number | `600` | Font weight for value labels (100-900) |
| Label Color | Text | `"#000000"` | Color for value labels (hex, rgb, or color name) |

## Usage

### Basic Setup

1. Add the Horizontal Bar Chart component to your Webflow page
2. Configure your data in the "Chart Data (JSON)" field (must have 3 items)
3. Set your base color
4. Customize styling as needed

### Data Format

The component requires exactly 3 items in JSON array format. Each object should contain label and value properties.

**Example data:**

```json
[
  { "label": "2022", "value": 14.8 },
  { "label": "2023", "value": 16.5 },
  { "label": "2024", "value": 17.5 }
]
```

**Custom property names:**

If your data uses different property names:

```json
[
  { "year": "2022", "percentage": 14.8 },
  { "year": "2023", "percentage": 16.5 },
  { "year": "2024", "percentage": 17.5 }
]
```

Configure:
- **Label Key**: `year`
- **Value Key**: `percentage`

### Color & Opacity

The component uses a single base color with 3 opacity levels:

- **Top bar** (1st item in data array): 50% opacity (lightest)
- **Middle bar** (2nd item in data array): 75% opacity (more prominent)
- **Bottom bar** (3rd item in data array): 100% opacity (fully opaque, boldest)

This creates a progressive visual hierarchy that works perfectly with Webflow color variables.

**Example with year-over-year data:**
```json
[
  { "label": "2022", "value": 14.8 },  // Renders as top bar (50% opacity)
  { "label": "2023", "value": 16.5 },  // Renders as middle bar (75% opacity)
  { "label": "2024", "value": 17.5 }   // Renders as bottom bar (100% opacity, boldest)
]
```
- Base Color: `#ff007a` (bright pink)
- Top bar (2022): `#ff007a` at 50% opacity (lighter pink)
- Middle bar (2023): `#ff007a` at 75% opacity (medium pink)
- Bottom bar (2024): `#ff007a` at 100% opacity (full bright pink, most prominent)

**Why opacity instead of lightening?**
- Works seamlessly with Webflow color variables
- More predictable results
- Maintains color hue and saturation
- Better for accessibility when using sufficient contrast

### Value Formatting

**Percentage Format** (default):
```json
Value: 14.8
Display: "14.8%"
```

**Number Format**:
```json
Value: 14.8
Display: "14.8"
```

Set via "Value Format" prop.

## Styling Approach

### Font Inheritance

The component uses `font-family: inherit` throughout, ensuring all text (axis labels, value labels) matches your Webflow site's typography. Axis labels are set to 12px for optimal readability.

### CSS Variables

Customize the error state appearance using these CSS variables:

- `--border-color`: Border color for error messages
- `--error-background`: Background color for error state
- `--error-text`: Primary text color for errors
- `--error-text-secondary`: Secondary text color
- `--code-background`: Background for code examples
- `--code-text`: Text color for code examples

### Responsive Behavior

The chart:
- Fills 100% of parent container width
- Maintains fixed height (configurable)
- Scales all elements proportionally

## Technical Notes

- **SSR**: Disabled (`ssr: false`) because Recharts requires browser-specific rendering APIs
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Data Requirement**: Exactly 3 items required; more are truncated, fewer are padded with empty items
- **Performance**: Animations are disabled for instant rendering

## Example Configurations

### Year-over-Year Growth
```
Base Color: "#10b981" (green)
Value Format: "Percentage (%)"
Max Value: 20
Data:
[
  { "label": "2022", "value": 14.8 },
  { "label": "2023", "value": 16.5 },
  { "label": "2024", "value": 17.5 }
]
```

### Quarterly Performance
```
Base Color: "#3b82f6" (blue)
Value Format: "Number"
Max Value: 100
Data:
[
  { "label": "Q1", "value": 75 },
  { "label": "Q2", "value": 82 },
  { "label": "Q3", "value": 91 }
]
```

### Revenue Metrics
```
Base Color: "#8b5cf6" (purple)
Value Format: "Number"
Max Value: 1000
Label Font Weight: 700
Data:
[
  { "label": "Goal", "value": 800 },
  { "label": "Target", "value": 900 },
  { "label": "Stretch", "value": 950 }
]
```

## Troubleshooting

**Chart not displaying:**
- Verify JSON data has exactly 3 items
- Check that label/value keys match your data properties
- Ensure data is valid JSON (use a JSON validator)

**Colors look wrong:**
- Base color must be valid hex, rgb, or color name
- The opacity-based variation ensures consistent color representation

**Values cut off:**
- Adjust "Left Label Width" if labels are truncated
- Ensure your container provides adequate width for the chart

**Fonts look different:**
- Component inherits fonts automatically
- Set fonts on parent container if needed

## Best Practices

1. **Use for 3-item comparisons**: This component is optimized for exactly 3 data points
2. **Choose appropriate max value**: Set to slightly above your highest data point for best appearance
3. **Pick contrasting base colors**: Ensure shaded versions remain visible and distinct
4. **Label clarity**: Keep labels short (years, quarters) for best appearance
5. **Consistent data**: All values should be in same scale/unit
