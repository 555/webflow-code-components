import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { BarChart } from './BarChart';
import './BarChart.css';

const defaultData = JSON.stringify(
  [
    { name: 'Page A', value1: 4000, value2: 2400 },
    { name: 'Page B', value1: 3000, value2: 1398 },
    { name: 'Page C', value1: 2000, value2: 9800 },
    { name: 'Page D', value1: 2780, value2: 3908 },
    { name: 'Page E', value1: 1890, value2: 4800 },
    { name: 'Page F', value1: 2390, value2: 3800 },
    { name: 'Page G', value1: 3490, value2: 4300 },
  ],
  null,
  2
);

export default declareComponent(BarChart, {
  name: 'Bar Chart',
  description: 'Customizable bar chart component powered by Recharts with responsive design and configurable styling',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Provide chart data as a JSON array. Each object should have the keys specified in "X-Axis Key", "Bar 1 Key", and "Bar 2 Key" fields.',
    }),
    xAxisKey: props.Text({
      name: 'X-Axis Key',
      defaultValue: 'name',
      group: 'Data',
      tooltip: 'The property name in your data to use for X-axis labels',
    }),
    bar1Key: props.Text({
      name: 'Bar 1 Data Key',
      defaultValue: 'value1',
      group: 'Data',
      tooltip: 'The property name in your data to use for the first bar series',
    }),
    bar2Key: props.Text({
      name: 'Bar 2 Data Key',
      defaultValue: 'value2',
      group: 'Data',
      tooltip: 'The property name in your data to use for the second bar series',
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
      defaultValue: '$',
      group: 'Value Formatting',
      tooltip: 'Currency symbol to use when Value Format is set to "currency" (e.g., "$", "€", "£")',
    }),

    // Bar 1 Styling
    bar1Fill: props.Text({
      name: 'Bar 1 Color',
      defaultValue: '#8884d8',
      group: 'Bar 1 Styling',
      tooltip: 'Color for the first bar (hex, rgb, or color name). Darkens by 3% on hover.',
    }),

    // Bar 2 Styling
    bar2Fill: props.Text({
      name: 'Bar 2 Color',
      defaultValue: '#82ca9d',
      group: 'Bar 2 Styling',
      tooltip: 'Color for the second bar (hex, rgb, or color name). Darkens by 3% on hover.',
    }),

    // Bar Shape
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
