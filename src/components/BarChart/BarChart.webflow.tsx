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
  description: 'Smart bar chart with auto-detection - displays column or stacked bars with opacity variation',
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
      tooltip: 'Base color for all bars. Opacity varies based on chart type. Darkens by 3% on hover.',
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
      options: ['number', 'percent', 'currency'],
      tooltip: 'Format values as numbers (with K/M suffix), percentages (%), or currency (with symbol and K/M suffix)',
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
  },

  options: {
    ssr: false, // Disable SSR as Recharts uses browser-specific rendering
  },
});
