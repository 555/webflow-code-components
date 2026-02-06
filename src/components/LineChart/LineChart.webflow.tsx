import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { LineChart } from './LineChart';
import './LineChart.css';

const defaultData = JSON.stringify(
  [
    { name: 'Jan', revenue: 4000, costs: 2400 },
    { name: 'Feb', revenue: 3000, costs: 1398 },
    { name: 'Mar', revenue: 2000, costs: 5800 },
    { name: 'Apr', revenue: 2780, costs: 3908 },
    { name: 'May', revenue: 1890, costs: 4800 },
    { name: 'Jun', revenue: 2390, costs: 3800 },
  ],
  null,
  2
);

export default declareComponent(LineChart, {
  name: 'Line Chart',
  description: 'Interactive line chart with line and area modes — auto-detects numeric keys for multi-line support with color differentiation',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Auto-detects numeric values. Each numeric key becomes a separate line.',
    }),
    xAxisKey: props.Text({
      name: 'X-Axis Key',
      defaultValue: 'name',
      group: 'Data',
      tooltip: 'The property name in your data for X-axis labels',
    }),

    // Chart Configuration
    chartType: props.Variant({
      name: 'Chart Type',
      defaultValue: 'line',
      group: 'Chart Configuration',
      options: ['line', 'area'],
      tooltip: 'Line: draws lines connecting data points. Area: fills under each line at 0.15 opacity for a layered look.',
    }),

    // Color Configuration
    baseColor: props.Text({
      name: 'Base Color',
      defaultValue: '#00a0dc',
      group: 'Color',
      tooltip: 'Base color for all lines. OR provide comma-separated hex codes (e.g., #00a0dc,#82ca9d,#ffc658) to assign direct colors to each line in order. Overrides Color Mode when used.',
    }),
    colorMode: props.Variant({
      name: 'Color Mode',
      defaultValue: 'opacity',
      group: 'Color',
      options: ['opacity', 'brightness', 'contrast', 'saturation', 'hue-rotate', 'none'],
      tooltip: 'How to differentiate lines: opacity (transparency), brightness (lightness), contrast, saturation (color intensity), hue-rotate (color shift), or none (all same). Ignored if Base Color contains CSV.',
    }),
    colorIncrement: props.Number({
      name: 'Color Increment',
      defaultValue: 25,
      group: 'Color',
      tooltip: 'For opacity/contrast/saturation: relative % reduction per line (compound). For brightness: relative % increase per line (compound). For hue-rotate: degrees to rotate per line (additive). Ignored if Base Color contains CSV.',
      min: 0,
      max: 100,
      decimals: 0,
    }),
    colorDirection: props.Variant({
      name: 'Color Direction',
      defaultValue: 'first-to-last',
      group: 'Color',
      options: ['first-to-last', 'last-to-first'],
      tooltip: 'First to Last: base color on first line. Last to First: base color on last line. Ignored if Base Color contains CSV.',
    }),

    // Line Styling
    strokeWidth: props.Number({
      name: 'Line Thickness',
      defaultValue: 2,
      group: 'Line Styling',
      tooltip: 'Width of each line in pixels',
      min: 1,
      max: 8,
      decimals: 0,
    }),
    showDots: props.Boolean({
      name: 'Show Data Points',
      defaultValue: true,
      group: 'Line Styling',
      tooltip: 'Show circular markers at each data point',
    }),
    dotSize: props.Number({
      name: 'Dot Size',
      defaultValue: 4,
      group: 'Line Styling',
      tooltip: 'Radius of data point markers in pixels. Ignored when Show Data Points is off.',
      min: 1,
      max: 8,
      decimals: 0,
    }),

    // Chart Features
    showCartesianGrid: props.Boolean({
      name: 'Show Grid',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showXAxis: props.Boolean({
      name: 'Show X-Axis Ticks',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Show or hide X-axis tick labels',
    }),
    showYAxis: props.Boolean({
      name: 'Show Y-Axis Ticks',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Show or hide Y-axis tick labels',
    }),
    showTooltip: props.Boolean({
      name: 'Show Tooltip',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showLegend: props.Boolean({
      name: 'Show Legend',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Display legend showing all line labels',
    }),
    enableAnimation: props.Boolean({
      name: 'Enable Animation',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Enable or disable chart animations',
    }),
    gridStrokeDasharray: props.Text({
      name: 'Grid Pattern',
      defaultValue: '3 3',
      group: 'Chart Features',
      tooltip: 'CSS stroke-dasharray for grid lines (e.g., "3 3" for dashed)',
    }),
    gridColor: props.Text({
      name: 'Grid Color',
      defaultValue: '#ccc',
      group: 'Chart Features',
      tooltip: 'Color of the grid lines (hex, rgb, or color name)',
    }),
    axisLineColor: props.Text({
      name: 'Axis Line Color',
      defaultValue: '#666',
      group: 'Chart Features',
      tooltip: 'Color of the X and Y axis lines (hex, rgb, or color name)',
    }),

    // Value Formatting
    valueFormat: props.Variant({
      name: 'Value Format',
      defaultValue: 'number',
      group: 'Value Formatting',
      options: ['number', 'percent', 'currency', 'multiplier'],
      tooltip: 'Format values as numbers (with K/M suffix), percentages (%), currency (with symbol and K/M suffix), or multiplier (with x suffix)',
    }),
    currencySymbol: props.Text({
      name: 'Currency Symbol',
      defaultValue: '£',
      group: 'Value Formatting',
      tooltip: 'Currency symbol to use when Value Format is set to "currency" (e.g., "£", "$", "€")',
    }),

    // Axis Configuration
    maxValue: props.Number({
      name: 'Max Value',
      group: 'Chart Features',
      tooltip: 'Set a fixed maximum value for the Y-axis. Leave empty to auto-scale based on data.',
      min: 0,
      decimals: 0,
    }),

    // Dimensions
    height: props.Number({
      name: 'Chart Height',
      defaultValue: 400,
      group: 'Dimensions',
      tooltip: 'Height of the chart in pixels',
      min: 200,
      max: 1000,
      decimals: 0,
    }),

    // Axis Configuration
    yAxisWidth: props.Number({
      name: 'Y-Axis Width',
      defaultValue: 60,
      group: 'Chart Features',
      tooltip: 'Width allocated for Y-axis labels (in pixels)',
      min: 30,
      max: 150,
      decimals: 0,
    }),

    // Axis Labels
    xAxisLabel: props.Text({
      name: 'X-Axis Label',
      defaultValue: '',
      group: 'Chart Features',
      tooltip: 'Label text displayed below the X-axis. Leave empty to hide.',
    }),
    yAxisLabel: props.Text({
      name: 'Y-Axis Label',
      defaultValue: '',
      group: 'Chart Features',
      tooltip: 'Label text displayed along the Y-axis. Leave empty to hide.',
    }),

    // Tooltip Styling
    tooltipBackgroundColor: props.Text({
      name: 'Tooltip Background',
      defaultValue: '#ffffff',
      group: 'Tooltip',
      tooltip: 'Background color of the tooltip (hex, rgb, or color name)',
    }),
    tooltipBorderRadius: props.Number({
      name: 'Tooltip Border Radius',
      defaultValue: 8,
      group: 'Tooltip',
      tooltip: 'Corner radius of the tooltip in pixels',
      min: 0,
      max: 24,
      decimals: 0,
    }),
    tooltipTitleFontSize: props.Number({
      name: 'Tooltip Title Font Size',
      defaultValue: 14,
      group: 'Tooltip',
      tooltip: 'Font size of the tooltip title (label) in pixels',
      min: 8,
      max: 32,
      decimals: 0,
    }),
    tooltipValueFontSize: props.Number({
      name: 'Tooltip Value Font Size',
      defaultValue: 20,
      group: 'Tooltip',
      tooltip: 'Font size of the tooltip values in pixels',
      min: 8,
      max: 48,
      decimals: 0,
    }),
    tooltipShowSeriesName: props.Boolean({
      name: 'Show Series Name',
      defaultValue: true,
      group: 'Tooltip',
      tooltip: 'Show the series name next to each value in the tooltip',
    }),
    tooltipTitleFontWeight: props.Number({
      name: 'Title Font Weight',
      defaultValue: 700,
      group: 'Tooltip',
      tooltip: 'Font weight of the tooltip title (e.g. 400 = normal, 700 = bold)',
      min: 100,
      max: 900,
      decimals: 0,
    }),
    tooltipValueFontWeight: props.Number({
      name: 'Value Font Weight',
      defaultValue: 700,
      group: 'Tooltip',
      tooltip: 'Font weight of the tooltip values (e.g. 400 = normal, 700 = bold)',
      min: 100,
      max: 900,
      decimals: 0,
    }),
    tooltipTitleFontFamily: props.Text({
      name: 'Title Font Family',
      defaultValue: 'inherit',
      group: 'Tooltip',
      tooltip: 'Font family for the tooltip title. Use "inherit" to match the page font.',
    }),
    tooltipValueFontFamily: props.Text({
      name: 'Value Font Family',
      defaultValue: 'inherit',
      group: 'Tooltip',
      tooltip: 'Font family for the tooltip values. Use "inherit" to match the page font.',
    }),

    // Accessibility
    id: props.Id({
      name: 'Element ID',
      group: 'Accessibility',
      tooltip: 'Unique ID for this chart element (useful for anchors and accessibility)',
    }),
  },

  options: {
    ssr: false, // Disable SSR as Recharts uses browser-specific rendering
  },
});
