import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { BarChart } from './BarChart';
import './BarChart.css';

const defaultData = JSON.stringify(
  [
    { name: 'Q1', revenue: 100, costs: 40, profit: 60 },
    { name: 'Q2', revenue: 120, costs: 45, profit: 75 },
    { name: 'Q3', revenue: 140, costs: 50, profit: 90 },
  ],
  null,
  2
);

export default declareComponent(BarChart, {
  name: 'Bar Chart',
  description: 'Smart bar chart with auto-detection - displays column or stacked bars with automatic color variation',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Auto-detects numeric values. Single value = column chart, multiple values = stackable chart.',
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
      defaultValue: 'column',
      group: 'Chart Configuration',
      options: ['column', 'stacked'],
      tooltip: 'Column: groups bars side-by-side (opacity varies left to right). Stacked: stacks bars vertically (opacity varies bottom to top, top=boldest).',
    }),

    // Color Configuration
    baseColor: props.Text({
      name: 'Base Color',
      defaultValue: '#00a0dc',
      group: 'Color',
      tooltip: 'Base color for all bars. OR provide comma-separated hex codes (e.g., #00a0dc,#82ca9d,#ffc658) to override color mode and use direct colors. Colors darken by 3% on hover.',
    }),
    colorMode: props.Variant({
      name: 'Color Mode',
      defaultValue: 'opacity',
      group: 'Color',
      options: ['opacity', 'brightness', 'contrast', 'saturation', 'hue-rotate', 'none'],
      tooltip: 'How to differentiate bars: opacity (transparency), brightness (lightness), contrast, saturation (color intensity), hue-rotate (color shift), or none (all same). Ignored if Base Color contains CSV.',
    }),
    colorIncrement: props.Number({
      name: 'Color Increment',
      defaultValue: 25,
      group: 'Color',
      tooltip: 'For opacity/contrast/saturation: relative % reduction per bar (compound). For brightness: relative % increase per bar (compound). For hue-rotate: degrees to rotate per bar (additive). Higher values = more contrast between bars. Ignored if Base Color contains CSV.',
      min: 0,
      max: 100,
      decimals: 0,
    }),
    colorDirection: props.Variant({
      name: 'Color Direction',
      defaultValue: 'first-to-last',
      group: 'Color',
      options: ['first-to-last', 'last-to-first'],
      tooltip: 'Column mode: First to Last = base at left, Last to First = base at right. Stacked mode: First to Last = base at bottom, Last to First = base at top. Ignored if Base Color contains CSV.',
    }),

    // Chart Features
    showCartesianGrid: props.Boolean({
      name: 'Show Grid',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showXAxis: props.Boolean({
      name: 'Show X-Axis',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showYAxis: props.Boolean({
      name: 'Show Y-Axis',
      defaultValue: true,
      group: 'Chart Features',
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
      tooltip: 'Display legend showing all value keys',
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

    // Bar Styling
    barRadius: props.Number({
      name: 'Bar Corner Radius',
      defaultValue: 10,
      group: 'Bar Styling',
      tooltip: 'Border radius for the top corners of bars (in pixels)',
      min: 0,
      max: 50,
      decimals: 0,
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
