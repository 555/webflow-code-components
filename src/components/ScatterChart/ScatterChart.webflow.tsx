import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { ScatterChart } from './ScatterChart';
import './ScatterChart.css';

const defaultData = JSON.stringify(
  [
    { x: 10, y: 120, category: 'Product A' },
    { x: 20, y: 180, category: 'Product A' },
    { x: 30, y: 150, category: 'Product A' },
    { x: 15, y: 90, category: 'Product B' },
    { x: 25, y: 140, category: 'Product B' },
    { x: 35, y: 110, category: 'Product B' },
  ],
  null,
  2
);

export default declareComponent(ScatterChart, {
  name: 'Scatter Chart',
  description: 'Interactive scatter/bubble chart with auto-detection — plots X/Y coordinates with multiple series support and customizable point styling',
  group: 'Charts',

  props: {
    // Data Configuration
    data: props.Text({
      name: 'Chart Data (JSON)',
      defaultValue: defaultData,
      group: 'Data',
      tooltip: 'Array of objects with X and Y coordinates. Optional: add a category property to create multiple series.',
    }),
    xAxisKey: props.Text({
      name: 'X-Axis Key',
      defaultValue: 'x',
      group: 'Data',
      tooltip: 'The property name in your data for X-axis values',
    }),
    yAxisKey: props.Text({
      name: 'Y-Axis Key',
      defaultValue: 'y',
      group: 'Data',
      tooltip: 'The property name in your data for Y-axis values',
    }),
    categoryKey: props.Text({
      name: 'Category Key (Optional)',
      defaultValue: '',
      group: 'Data',
      tooltip: 'Property name to group data into multiple series. Leave empty for single series.',
    }),

    // Chart Configuration
    chartType: props.Variant({
      name: 'Chart Type',
      defaultValue: 'scatter',
      group: 'Chart Configuration',
      options: ['scatter', 'bubble'],
      tooltip: 'Scatter: fixed point size. Bubble: point size varies based on Z-axis key.',
    }),
    sizeKey: props.Text({
      name: 'Size Key (Bubble)',
      defaultValue: 'z',
      group: 'Chart Configuration',
      tooltip: 'For bubble chart: which data property controls bubble size. Ignored in scatter mode.',
    }),

    // Color Configuration
    baseColor: props.Text({
      name: 'Base Color',
      defaultValue: '#00a0dc',
      group: 'Color',
      tooltip: 'Base color for all points. OR provide comma-separated hex codes (e.g., #00a0dc,#82ca9d,#ffc658) to assign direct colors to each series.',
    }),
    colorMode: props.Variant({
      name: 'Color Mode',
      defaultValue: 'opacity',
      group: 'Color',
      options: ['opacity', 'brightness', 'contrast', 'saturation', 'hue-rotate', 'none'],
      tooltip: 'How to differentiate series: opacity, brightness, contrast, saturation, hue-rotate, or none. Ignored if Base Color contains CSV.',
    }),
    colorIncrement: props.Number({
      name: 'Color Increment',
      defaultValue: 25,
      group: 'Color',
      tooltip: 'For opacity/contrast/saturation: relative % reduction per series. For brightness: % increase. For hue-rotate: degrees. Ignored if Base Color contains CSV.',
      min: 0,
      max: 100,
      decimals: 0,
    }),
    colorDirection: props.Variant({
      name: 'Color Direction',
      defaultValue: 'first-to-last',
      group: 'Color',
      options: ['first-to-last', 'last-to-first'],
      tooltip: 'First to Last: base color on first series. Last to First: base color on last series. Ignored if Base Color contains CSV.',
    }),

    // Point Styling
    pointSize: props.Number({
      name: 'Point Size',
      defaultValue: 60,
      group: 'Point Styling',
      tooltip: 'Base size of points. For bubble chart, this is the median size (actual size varies by Z value).',
      min: 10,
      max: 200,
      decimals: 0,
    }),
    pointShape: props.Variant({
      name: 'Point Shape',
      defaultValue: 'circle',
      group: 'Point Styling',
      options: ['circle', 'square', 'triangle', 'diamond'],
      tooltip: 'Shape of the scatter points',
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
      tooltip: 'Display legend showing all series names',
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
      tooltip: 'Format values as numbers (with K/M suffix), percentages, currency, or multiplier',
    }),
    currencySymbol: props.Text({
      name: 'Currency Symbol',
      defaultValue: '£',
      group: 'Value Formatting',
      tooltip: 'Currency symbol to use when Value Format is set to "currency"',
    }),

    // Axis Configuration
    minXValue: props.Number({
      name: 'Min X Value',
      group: 'Chart Features',
      tooltip: 'Set minimum X-axis value. Leave empty to auto-scale.',
      decimals: 0,
    }),
    maxXValue: props.Number({
      name: 'Max X Value',
      group: 'Chart Features',
      tooltip: 'Set maximum X-axis value. Leave empty to auto-scale.',
      decimals: 0,
    }),
    minYValue: props.Number({
      name: 'Min Y Value',
      group: 'Chart Features',
      tooltip: 'Set minimum Y-axis value. Leave empty to auto-scale.',
      decimals: 0,
    }),
    maxYValue: props.Number({
      name: 'Max Y Value',
      group: 'Chart Features',
      tooltip: 'Set maximum Y-axis value. Leave empty to auto-scale.',
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
    ssr: false,
  },
});
