# Bar Chart

A fully customizable bar chart component powered by Recharts, designed for Webflow with responsive design and extensive styling options.

## Features

- **Responsive Design**: Automatically adapts to container width with configurable aspect ratios
- **Dual Bar Support**: Display up to two data series with independent styling
- **Font Inheritance**: Inherits typography from your Webflow site for seamless integration
- **Interactive Tooltips**: Hover to view detailed data points
- **Customizable Colors**: Configure bar colors and hover states via Webflow props
- **Toggle Features**: Show/hide grid, axes, tooltip, and legend
- **Flexible Data**: Accepts JSON data with customizable key mappings
- **Rounded Corners**: Adjustable bar corner radius for modern aesthetics

## Props

### Data Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Chart Data (JSON) | Text | Sample data | JSON array containing your chart data |
| X-Axis Key | Text | `"name"` | Property name for X-axis labels |
| Bar 1 Data Key | Text | `"value1"` | Property name for first bar series |
| Bar 2 Data Key | Text | `"value2"` | Property name for second bar series |

### Chart Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Show Grid | Boolean | `true` | Display background grid lines |
| Show X-Axis | Boolean | `true` | Display X-axis with labels |
| Show Y-Axis | Boolean | `true` | Display Y-axis with values |
| Show Tooltip | Boolean | `true` | Enable hover tooltips |
| Show Legend | Boolean | `true` | Display data series legend |
| Grid Pattern | Text | `"3 3"` | CSS stroke-dasharray for grid (e.g., "3 3" for dashed) |
| Y-Axis Width | Number | `60` | Width allocated for Y-axis labels (30-150px) |

### Bar 1 Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Bar 1 Color | Text | `"#8884d8"` | Fill color for first bar series |
| Bar 1 Hover Color | Text | `"#6366f1"` | Fill color on hover |
| Bar 1 Hover Stroke | Text | `"#4f46e5"` | Stroke color on hover |

### Bar 2 Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Bar 2 Color | Text | `"#82ca9d"` | Fill color for second bar series |
| Bar 2 Hover Color | Text | `"#10b981"` | Fill color on hover |
| Bar 2 Hover Stroke | Text | `"#059669"` | Stroke color on hover |

### Bar Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Bar Corner Radius | Number | `10` | Border radius for top corners (0-50px) |

### Dimensions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Max Width | Text | `"700px"` | Maximum chart width (CSS value) |
| Max Height | Text | `"70vh"` | Maximum chart height (CSS value) |
| Aspect Ratio | Number | `1.618` | Width-to-height ratio (0.5-3.0) |

### Margins

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| Margin Top | Number | `5` | Top margin (0-100px) |
| Margin Right | Number | `0` | Right margin (0-100px) |
| Margin Bottom | Number | `5` | Bottom margin (0-100px) |
| Margin Left | Number | `0` | Left margin (0-100px) |

## Usage

### Basic Setup

1. Add the Bar Chart component to your Webflow page
2. Configure your data in the "Chart Data (JSON)" field
3. Customize colors and styling as needed

### Data Format

The component expects data as a JSON array. Each object should contain the keys specified in your "X-Axis Key", "Bar 1 Data Key", and "Bar 2 Data Key" fields.

**Example data:**

```json
[
  { "name": "January", "sales": 4000, "expenses": 2400 },
  { "name": "February", "sales": 3000, "expenses": 1398 },
  { "name": "March", "sales": 2000, "expenses": 9800 },
  { "name": "April", "sales": 2780, "expenses": 3908 },
  { "name": "May", "sales": 1890, "expenses": 4800 }
]
```

With this data, configure:
- **X-Axis Key**: `name`
- **Bar 1 Data Key**: `sales`
- **Bar 2 Data Key**: `expenses`

### Single Bar Chart

To display only one bar series:
1. Provide data with only one value property (e.g., just "sales")
2. The component automatically detects which bars to show based on available data

### Color Customization

Colors can be specified using:
- **Hex codes**: `#8884d8`
- **RGB/RGBA**: `rgb(136, 132, 216)` or `rgba(136, 132, 216, 0.8)`
- **Named colors**: `blue`, `red`, `green`
- **CSS variables**: `var(--primary-color)`

## Styling Approach

### Font Inheritance

The component uses `font-family: inherit` throughout, ensuring all text (axis labels, tooltips, legends) matches your Webflow site's typography. No additional font configuration needed.

### CSS Variables

You can customize the error state appearance using these CSS variables in your Webflow site:

- `--border-color`: Border color for error messages
- `--error-background`: Background color for error state
- `--error-text`: Primary text color for errors
- `--error-text-secondary`: Secondary text color (links, details)
- `--code-background`: Background for code examples
- `--code-text`: Text color for code examples

### Responsive Behavior

The chart automatically:
- Adjusts to container width (100%)
- Maintains specified aspect ratio
- Respects max-width and max-height constraints
- Scales text and elements proportionally

## Technical Notes

- **SSR**: Disabled (`ssr: false`) because Recharts requires browser-specific rendering APIs
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Optimized for datasets up to 1000 data points; larger datasets may impact performance
- **Data Validation**: Invalid JSON displays a helpful error message with example format

## Example Configurations

### Sales Dashboard
```
X-Axis Key: "month"
Bar 1 Data Key: "revenue"
Bar 2 Data Key: "target"
Bar 1 Color: "#10b981" (green)
Bar 2 Color: "#3b82f6" (blue)
```

### Comparison Chart
```
X-Axis Key: "category"
Bar 1 Data Key: "thisYear"
Bar 2 Data Key: "lastYear"
Show Legend: true
Aspect Ratio: 2.0 (wider chart)
```

### Minimal Chart
```
Show Grid: false
Show Legend: false
Bar Corner Radius: 0
Bar 1 Color: "#000000"
```

## Troubleshooting

**Chart not displaying:**
- Verify your JSON data is valid (use a JSON validator)
- Check that your data keys match the configured "X-Axis Key", "Bar 1 Data Key", etc.
- Ensure data is not empty

**Fonts look different:**
- The component inherits fonts from your site automatically
- If you need specific fonts, set them on a parent container in Webflow

**Bars overlapping:**
- Recharts automatically positions multiple bars side-by-side
- If data values are very different scales, consider using separate charts

**Performance issues:**
- Limit data to reasonable sizes (< 1000 points recommended)
- Disable unused features (grid, legend) to improve rendering speed
- Consider pagination or data aggregation for large datasets
