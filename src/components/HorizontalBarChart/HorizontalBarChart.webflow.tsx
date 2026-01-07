import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { HorizontalBarChart } from './HorizontalBarChart';
import './HorizontalBarChart.css';

const defaultData = JSON.stringify(
  [
    { label: '2022', value: 14.8 },
    { label: '2023', value: 16.5 },
    { label: '2024', value: 17.5 },
  ],
  null,
  2
);

export default declareComponent(HorizontalBarChart, {
  name: 'Horizontal Bar Chart',
  description: 'Horizontal bar chart with 3 bars and automatic opacity variation - perfect for year-over-year comparisons',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Provide data as JSON array with 3 items. Each object needs label and value properties.',
    }),
    labelKey: props.Text({
      name: 'Label Key',
      defaultValue: 'label',
      group: 'Data',
      tooltip: 'The property name in your data for bar labels (e.g., years)',
    }),
    valueKey: props.Text({
      name: 'Value Key',
      defaultValue: 'value',
      group: 'Data',
      tooltip: 'The property name in your data for bar values',
    }),

    // Color Configuration
    baseColor: props.Text({
      name: 'Base Color',
      defaultValue: '#ff007a',
      group: 'Color',
      tooltip: 'Base color for all bars. Opacity varies: top bar 50%, middle bar 75%, bottom bar 100% (boldest). Darkens by 3% on hover.',
    }),

    // Chart Features
    showGrid: props.Boolean({
      name: 'Show Grid',
      defaultValue: true,
      group: 'Chart Features',
    }),
    gridStrokeColor: props.Text({
      name: 'Grid Stroke Color',
      defaultValue: '#e6e6e6',
      group: 'Chart Features',
      tooltip: 'Color for the grid lines (hex, rgb, or color name)',
    }),
    showXAxis: props.Boolean({
      name: 'Show Top Axis',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showYAxis: props.Boolean({
      name: 'Show Left Labels',
      defaultValue: true,
      group: 'Chart Features',
    }),
    showLabels: props.Boolean({
      name: 'Show Value Labels',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Show percentage/value labels on the right end of bars',
    }),
    showTooltip: props.Boolean({
      name: 'Show Tooltip',
      defaultValue: true,
      group: 'Chart Features',
      tooltip: 'Show interactive tooltip on hover',
    }),

    // Value Configuration
    minValue: props.Number({
      name: 'Min Value',
      defaultValue: 0,
      group: 'Value Range',
      tooltip: 'Minimum value for the axis scale',
      min: 0,
      max: 100,
      decimals: 0,
    }),
    maxValue: props.Number({
      name: 'Max Value',
      defaultValue: 20,
      group: 'Value Range',
      tooltip: 'Maximum value for the axis scale',
      min: 1,
      max: 1000,
      decimals: 0,
    }),
    valueFormat: props.Variant({
      name: 'Value Format',
      defaultValue: 'percent',
      group: 'Value Range',
      options: ['percent', 'number'],
      tooltip: 'Display values as percentages (percent) or plain numbers (number)',
    }),

    // Dimensions
    height: props.Number({
      name: 'Chart Height',
      defaultValue: 160,
      group: 'Dimensions',
      tooltip: 'Height of the chart in pixels',
      min: 100,
      max: 500,
      decimals: 0,
    }),
    barCategoryGap: props.Number({
      name: 'Bar Spacing',
      defaultValue: 4,
      group: 'Dimensions',
      tooltip: 'Spacing between bars in pixels',
      min: 0,
      max: 50,
      decimals: 0,
    }),

    // Bar Styling
    barRadius: props.Number({
      name: 'Bar Corner Radius',
      defaultValue: 8,
      group: 'Bar Styling',
      tooltip: 'Border radius for the right corners of bars (in pixels)',
      min: 0,
      max: 50,
      decimals: 0,
    }),

    // Label Styling
    labelFontWeight: props.Number({
      name: 'Label Font Weight',
      defaultValue: 600,
      group: 'Label Styling',
      tooltip: 'Font weight for value labels (100-900)',
      min: 100,
      max: 900,
      decimals: 0,
    }),
    labelColor: props.Text({
      name: 'Label Color',
      defaultValue: '#000000',
      group: 'Label Styling',
      tooltip: 'Color for value labels (hex, rgb, or color name)',
    }),

    // Axis Configuration
    yAxisWidth: props.Number({
      name: 'Left Label Width',
      defaultValue: 50,
      group: 'Chart Features',
      tooltip: 'Width allocated for left labels (in pixels)',
      min: 30,
      max: 150,
      decimals: 0,
    }),
  },

  options: {
    ssr: false, // Disable SSR as Recharts uses browser-specific rendering
  },
});
