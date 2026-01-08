# Pie Chart

A responsive pie/donut chart component designed for displaying up to 4 data segments with customizable colors and interactive tooltips.

## Features

- **Responsive Design**: Automatically fills parent width with configurable height
- **4-Segment Support**: Optimized for displaying up to 4 data categories
- **Donut/Pie Toggle**: Adjustable inner radius (0 = pie, >0 = donut)
- **Interactive Hover Effect**: Segments darken by 3% on hover for subtle feedback
- **Font Inheritance**: Inherits typography from your Webflow site
- **Interactive Tooltips**: Hover to view detailed segment data
- **Customizable Colors**: Configure individual colors for each of the 4 segments
- **Flexible Legend**: Optional legend display on the right side
- **Segment Spacing**: Configurable padding angle between segments

## Props

### Data Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Chart Data (JSON) | Text | Sample data | JSON array with up to 4 items |
| Name Key | Text | `"name"` | Property name for segment labels |
| Value Key | Text | `"value"` | Property name for segment values |

### Colors

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Color 1 | Text | `"#ff6b35"` | Color for first segment (orange). Darkens by 3% on hover. |
| Color 2 | Text | `"#004e89"` | Color for second segment (dark blue). Darkens by 3% on hover. |
| Color 3 | Text | `"#1a8fe3"` | Color for third segment (light blue). Darkens by 3% on hover. |
| Color 4 | Text | `"#b8b8b8"` | Color for fourth segment (grey). Darkens by 3% on hover. |

### Chart Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Show Tooltip | Boolean | `true` | Show interactive tooltip on hover |
| Show Legend | Boolean | `true` | Display legend on the right side |

### Pie Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Inner Radius | Number | `60` | Inner radius percentage (0-90). 0 = pie chart, >0 = donut chart |
| Padding Angle | Number | `2` | Gap between segments in degrees (0-10) |

### Dimensions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Chart Height | Number | `400` | Height of the chart in pixels (200-800px) |

## Usage

### Basic Setup

1. Add the Pie Chart component to your Webflow page
2. Configure your data in the "Chart Data (JSON)" field (up to 4 items)
3. Customize colors for each segment
4. Adjust styling as needed

### Data Format

The component expects data as a JSON array with up to 4 items. Each object should contain name and value properties.

**Example data:**

```json
[
  { "name": "Combustibles", "value": 9094 },
  { "name": "Traditional Oral", "value": 1058 },
  { "name": "New Categories", "value": 1078 },
  { "name": "Other", "value": 48 }
]
```

**Custom property names:**

If your data uses different property names:

```json
[
  { "category": "Product A", "amount": 9094 },
  { "category": "Product B", "amount": 1058 },
  { "category": "Product C", "amount": 1078 },
  { "category": "Product D", "amount": 48 }
]
```

Configure:
- **Name Key**: `category`
- **Value Key**: `amount`

### Pie vs Donut

Control the chart style with the **Inner Radius** prop:

- **Pie Chart**: Set Inner Radius to `0`
- **Donut Chart**: Set Inner Radius to `60` (or any value > 0)
- **Thin Donut**: Set Inner Radius to `80` for a thinner ring

### Color Customization

Colors can be specified using:
- **Hex codes**: `#ff6b35`
- **RGB/RGBA**: `rgb(255, 107, 53)` or `rgba(255, 107, 53, 0.8)`
- **Named colors**: `blue`, `red`, `orange`
- **CSS variables**: `var(--primary-color)`

The colors are applied in order to your data segments.

## Styling Approach

### Font Inheritance

The component uses `font-family: inherit` throughout, ensuring all text (title, legend, tooltips) matches your Webflow site's typography.

### CSS Variables

Customize the error state appearance using these CSS variables:

- `--border-color`: Border color for error messages
- `--error-background`: Background color for error state
- `--error-text`: Primary text color for errors
- `--error-text-secondary`: Secondary text color
- `--code-background`: Background for code examples
- `--code-text`: Text color for code examples

### Responsive Behavior

The chart automatically:
- Fills 100% of parent container width
- Uses fixed height (configurable via "Chart Height" prop)
- Centers the pie/donut within the container
- Positions legend on the right side

## Technical Notes

- **SSR**: Disabled (`ssr: false`) because Recharts requires browser-specific rendering APIs
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Data Limit**: Supports up to 4 segments; additional items are ignored
- **Performance**: Animations are disabled for instant rendering

## Example Configurations

### Revenue by Category (Donut)
```
Inner Radius: 60
Padding Angle: 2
Show Legend: true
Color 1: "#ff6b35" (orange)
Color 2: "#004e89" (dark blue)
Color 3: "#1a8fe3" (light blue)
Color 4: "#b8b8b8" (grey)
```

### Market Share (Pie)
```
Inner Radius: 0
Padding Angle: 0
Show Legend: true
Height: 350
```

### Simple Distribution (Thin Donut)
```
Inner Radius: 80
Padding Angle: 5
Show Legend: false
Height: 300
```

## Troubleshooting

**Chart not displaying:**
- Verify JSON data is valid (use a JSON validator)
- Check that name/value keys match your data properties
- Ensure data is not empty

**Colors not showing:**
- Verify color values are valid (hex, rgb, or color names)
- Check that you haven't exceeded 4 segments

**Legend overlapping:**
- Increase chart height to accommodate legend
- Consider hiding legend if space is limited

## Best Practices

1. **4 segments max**: Component is optimized for up to 4 data categories
2. **Contrasting colors**: Choose distinct colors for better segment differentiation
3. **Meaningful labels**: Use clear, concise names for segments
4. **Appropriate sizing**: Set height to accommodate both chart and legend
5. **Consider donut style**: Inner radius of 60-70 often looks best for modern designs
