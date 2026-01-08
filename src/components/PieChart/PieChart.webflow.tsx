import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { PieChart } from './PieChart';
import './PieChart.css';

const defaultData = JSON.stringify(
  [
    { name: 'Combustibles', value: 9094 },
    { name: 'Traditional Oral', value: 1058 },
    { name: 'New Categories', value: 1078 },
    { name: 'Other', value: 48 },
  ],
  null,
  2
);

export default declareComponent(PieChart, {
  name: 'Pie Chart',
  description: 'Customizable pie/donut chart with up to 4 segments, responsive design, and configurable colors',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Provide data as JSON array with up to 4 items. Each object needs name and value properties.',
    }),
    nameKey: props.Text({
      name: 'Name Key',
      defaultValue: 'name',
      group: 'Data',
      tooltip: 'The property name in your data for segment labels',
    }),
    valueKey: props.Text({
      name: 'Value Key',
      defaultValue: 'value',
      group: 'Data',
      tooltip: 'The property name in your data for segment values',
    }),

    // Color Configuration
    color1: props.Text({
      name: 'Color 1',
      defaultValue: '#ff6b35',
      group: 'Colors',
      tooltip: 'Color for the first segment (hex, rgb, or color name). Darkens by 3% on hover.',
    }),
    color2: props.Text({
      name: 'Color 2',
      defaultValue: '#004e89',
      group: 'Colors',
      tooltip: 'Color for the second segment (hex, rgb, or color name). Darkens by 3% on hover.',
    }),
    color3: props.Text({
      name: 'Color 3',
      defaultValue: '#1a8fe3',
      group: 'Colors',
      tooltip: 'Color for the third segment (hex, rgb, or color name). Darkens by 3% on hover.',
    }),
    color4: props.Text({
      name: 'Color 4',
      defaultValue: '#b8b8b8',
      group: 'Colors',
      tooltip: 'Color for the fourth segment (hex, rgb, or color name). Darkens by 3% on hover.',
    }),

    // Chart Features
    showTooltip: props.Boolean({
      name: 'Show Tooltip',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Show interactive tooltip on hover',
    }),
    showLegend: props.Boolean({
      name: 'Show Legend',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Display legend on the right side',
    }),
    enableAnimation: props.Boolean({
      name: 'Enable Animation',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Enable or disable chart animations',
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

    // Pie Styling
    innerRadius: props.Number({
      name: 'Inner Radius',
      defaultValue: 60,
      group: 'Pie Styling',
      tooltip: 'Inner radius percentage (0 = pie chart, >0 = donut chart)',
      min: 0,
      max: 90,
      decimals: 0,
    }),
    paddingAngle: props.Number({
      name: 'Padding Angle',
      defaultValue: 2,
      group: 'Pie Styling',
      tooltip: 'Gap between segments in degrees',
      min: 0,
      max: 10,
      decimals: 0,
    }),

    // Dimensions
    height: props.Number({
      name: 'Chart Height',
      defaultValue: 400,
      group: 'Dimensions',
      tooltip: 'Height of the chart in pixels',
      min: 200,
      max: 800,
      decimals: 0,
    }),
  },

  options: {
    ssr: false, // Disable SSR as Recharts uses browser-specific rendering
  },
});
