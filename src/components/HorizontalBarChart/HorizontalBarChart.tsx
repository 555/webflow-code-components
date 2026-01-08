import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
  Cell,
  Tooltip,
  ReferenceLine,
} from 'recharts';

export interface HorizontalBarChartProps {
  // Data
  data: string;
  labelKey?: string;
  valueKey?: string;

  // Color
  baseColor?: string;

  // Chart Features
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  enableAnimation?: boolean;
  gridStrokeColor?: string;

  // Value Formatting
  valueFormat?: string; // "number" | "percent" | "currency"
  currencySymbol?: string;

  // Axis Configuration
  minValue?: number;
  maxValue?: number;

  // Dimensions
  height?: number;
  barCategoryGap?: number;

  // Bar Styling
  barRadius?: number;

  // Axis Styling
  yAxisWidth?: number;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  labelKey = 'label',
  valueKey = 'value',
  baseColor = '#ff007a',
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showLabels = true,
  showTooltip = true,
  enableAnimation = true,
  gridStrokeColor = '#e6e6e6',
  valueFormat = 'number',
  currencySymbol = '£',
  minValue,
  maxValue,
  height = 160,
  barCategoryGap = 4,
  barRadius = 8,
  yAxisWidth = 50,
}) => {
  // Parse JSON data
  const parsedData = useMemo(() => {
    try {
      const parsed = JSON.parse(data);
      // Ensure we have exactly 3 items
      if (!Array.isArray(parsed)) {
        return [];
      }
      // Take first 3 items if more, or pad with empty if less
      const items = parsed.slice(0, 3);
      while (items.length < 3) {
        items.push({ [labelKey]: '', [valueKey]: 0 });
      }
      return items;
    } catch (error) {
      console.error('Failed to parse chart data:', error);
      return [];
    }
  }, [data, labelKey, valueKey]);

  // Generate opacity values for each bar
  const opacities = useMemo(() => {
    return [
      0.5,  // Top bar - 50% opacity (oldest/first data item)
      0.75, // Middle bar - 75% opacity (more prominent)
      1.0,  // Bottom bar - 100% opacity (newest/last data item)
    ];
  }, []);

  // Calculate domain (min/max) for X-axis
  const calculatedDomain = useMemo(() => {
    if (parsedData.length === 0) return [0, 20];

    // Get all values from data
    const values = parsedData.map(item => Number(item[valueKey]) || 0);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);

    // Determine final min/max
    let min = minValue !== undefined ? minValue : dataMin;
    let max = maxValue !== undefined ? maxValue : dataMax;

    // Auto-range: Add padding and ensure 0 is included when appropriate
    if (minValue === undefined || maxValue === undefined) {
      // If data contains negative values, ensure 0 is included
      if (dataMin < 0 && min > 0) min = 0;
      if (dataMax > 0 && max < 0) max = 0;

      // Add 10% padding for better visuals
      const range = Math.abs(max - min);
      const padding = range * 0.1;

      if (minValue === undefined) {
        min = min < 0 ? min - padding : Math.min(0, min);
      }
      if (maxValue === undefined) {
        max = max > 0 ? max + padding : Math.max(0, max);
      }
    }

    return [min, max];
  }, [parsedData, valueKey, minValue, maxValue]);

  // Check if we need to show a reference line at 0
  const showZeroLine = useMemo(() => {
    const [min, max] = calculatedDomain;
    return min < 0 && max > 0;
  }, [calculatedDomain]);

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="horizontal-bar-chart-error">
        <p>No data available. Please provide valid JSON data with 3 items.</p>
        <details>
          <summary>Example format</summary>
          <pre>
            {JSON.stringify(
              [
                { label: '2022', value: 14.8 },
                { label: '2023', value: 16.5 },
                { label: '2024', value: 17.5 },
              ],
              null,
              2
            )}
          </pre>
        </details>
      </div>
    );
  }

  // Add opacity values to data
  const dataWithOpacity = parsedData.map((item, index) => ({
    ...item,
    opacity: opacities[index],
  }));

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return '';

    const numValue = Number(value);
    const absValue = Math.abs(numValue);

    if (valueFormat === 'percent') {
      // Percentage format - no K/M suffix
      return `${numValue}%`;
    } else if (valueFormat === 'currency') {
      // Currency format with K/M suffix
      if (absValue >= 1000000) {
        return `${currencySymbol}${(numValue / 1000000).toFixed(1)}M`;
      } else if (absValue >= 1000) {
        return `${currencySymbol}${(numValue / 1000).toFixed(1)}K`;
      }
      return `${currencySymbol}${numValue}`;
    } else {
      // Number format with K/M suffix
      if (absValue >= 1000000) {
        return `${(numValue / 1000000).toFixed(1)}M`;
      } else if (absValue >= 1000) {
        return `${(numValue / 1000).toFixed(1)}K`;
      }
      return numValue.toString();
    }
  };

  // Custom tooltip formatter - returns [formattedValue, name] where name is empty to hide "Value:"
  const customTooltipFormatter = (value: any) => {
    return [formatValue(value), ''];
  };

  return (
    <div style={{ width: '100%', height }} className="horizontal-bar-chart-container">
      <ResponsiveContainer>
        <BarChart
          data={dataWithOpacity}
          layout="vertical"
          margin={{
            top: 0,
            right: 8,
            bottom: 0,
            left: 8,
          }}
          barCategoryGap={barCategoryGap}
          style={{ fontFamily: 'inherit' }}
        >
          {showGrid && <CartesianGrid horizontal={false} stroke={gridStrokeColor} />}

          {showXAxis && (
            <XAxis
              type="number"
              orientation="top"
              domain={calculatedDomain}
              tickFormatter={formatValue}
              axisLine={false}
              tickLine={false}
              style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
            />
          )}

          {showZeroLine && (
            <ReferenceLine
              x={0}
              stroke="#000000"
              strokeWidth={1.5}
              strokeOpacity={0.3}
            />
          )}

          <YAxis
            type="category"
            dataKey={labelKey}
            axisLine={false}
            tickLine={false}
            width={showYAxis ? yAxisWidth : 0}
            tick={showYAxis}
            style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
          />

          {showTooltip && (
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.1)' }}
              contentStyle={{ fontFamily: 'inherit' }}
              labelStyle={{ fontSize: 12 }}
              formatter={customTooltipFormatter}
              labelFormatter={(label) => label}
              separator=""
            />
          )}

          <Bar
            dataKey={valueKey}
            radius={[0, barRadius, barRadius, 0]}
            isAnimationActive={enableAnimation}
            activeBar={{
              filter: 'brightness(0.97)',
            }}
          >
            {showLabels && (
              <LabelList
                dataKey={valueKey}
                position="right"
                formatter={formatValue}
                style={{ fill: 'inherit', fontWeight: 600, fontFamily: 'inherit', fontSize: 14 }}
              />
            )}
            {dataWithOpacity.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={baseColor} fillOpacity={entry.opacity} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
