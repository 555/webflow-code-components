import React, { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export interface BarChartProps {
  // Data
  data: string;
  xAxisKey?: string;

  // Chart Configuration
  chartType?: string; // "column" | "stacked"

  // Color
  baseColor?: string;

  // Bar Styling
  barRadius?: number;

  // Chart Features
  showCartesianGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  enableAnimation?: boolean;

  // Value Formatting
  valueFormat?: string; // "number" | "percent" | "currency"
  currencySymbol?: string;

  // Grid Styling
  gridStrokeDasharray?: string;

  // Dimensions
  height?: number;

  // Axis width
  yAxisWidth?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey = 'name',
  chartType = 'column',
  baseColor = '#00a0dc',
  barRadius = 10,
  showCartesianGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  enableAnimation = true,
  valueFormat = 'number',
  currencySymbol = '$',
  gridStrokeDasharray = '3 3',
  height = 400,
  yAxisWidth = 60,
}) => {
  // Format value based on format type
  const formatValue = (value: number): string => {
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
  // Parse JSON data
  const parsedData = useMemo(() => {
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed;
    } catch (error) {
      console.error('Failed to parse chart data:', error);
      return [];
    }
  }, [data]);

  // Auto-detect value keys (all numeric keys except xAxisKey)
  const valueKeys = useMemo(() => {
    if (parsedData.length === 0) return [];

    const firstItem = parsedData[0];
    const keys = Object.keys(firstItem).filter(key => {
      if (key === xAxisKey) return false;
      const value = firstItem[key];
      return typeof value === 'number';
    });

    return keys;
  }, [parsedData, xAxisKey]);

  // Generate opacity values based on chart type
  const opacities = useMemo(() => {
    if (chartType === 'stacked') {
      // For stacked: opacity varies across segments
      // Top segment (last value key) is 100%, bottom decreases
      const count = valueKeys.length;
      if (count === 0) return [];
      if (count === 1) return [1.0];
      if (count === 2) return [0.75, 1.0];

      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0) {
          result.push(0.5); // Bottom segment - lightest
        } else if (i === count - 1) {
          result.push(1.0); // Top segment - boldest
        } else {
          result.push(0.75); // Middle segments
        }
      }
      return result;
    } else {
      // For column: opacity varies across bars (left to right)
      const count = parsedData.length;
      if (count === 0) return [];
      if (count === 1) return [1.0];
      if (count === 2) return [0.75, 1.0];

      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0) {
          result.push(0.5); // First (leftmost) - lightest
        } else if (i === count - 1) {
          result.push(1.0); // Last (rightmost) - boldest
        } else {
          result.push(0.75); // Middle bars
        }
      }
      return result;
    }
  }, [parsedData, valueKeys, chartType]);

  // For column mode: Add opacity values to data
  const dataWithOpacity = parsedData.map((item, index) => ({
    ...item,
    opacity: opacities[index],
  }));

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="bar-chart-error">
        <p>No data available. Please provide valid JSON data.</p>
        <details>
          <summary>Example format</summary>
          <pre>
            {JSON.stringify(
              [
                { name: '2022', value: 10 },
                { name: '2023', value: 11 },
                { name: '2024', value: 12 },
              ],
              null,
              2
            )}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height }} className="bar-chart-container">
      <ResponsiveContainer>
        <RechartsBarChart
          data={dataWithOpacity}
          margin={{
            top: 0,
            right: 8,
            left: 8,
            bottom: 0,
          }}
          style={{
            fontFamily: 'inherit',
          }}
        >
        {showCartesianGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} />}
        {showXAxis && <XAxis dataKey={xAxisKey} style={{ fontFamily: 'inherit' }} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            style={{ fontFamily: 'inherit' }}
            tickFormatter={formatValue}
          />
        )}
        {showTooltip && (
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
            contentStyle={{ fontFamily: 'inherit' }}
            formatter={(value: any) => formatValue(Number(value))}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'inherit' }} />}

        {chartType === 'stacked' ? (
          // Stacked mode: render a Bar for each value key
          valueKeys.map((key, keyIndex) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="stack"
              fill={baseColor}
              fillOpacity={opacities[keyIndex]}
              activeBar={{
                filter: 'brightness(0.97)',
              }}
              radius={keyIndex === valueKeys.length - 1 ? [barRadius, barRadius, 0, 0] : [0, 0, 0, 0]}
              isAnimationActive={enableAnimation}
            />
          ))
        ) : (
          // Column mode: render a Bar for each value key (grouped, not stacked)
          // Opacity varies by X-axis position (data row), not by value key
          valueKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={baseColor}
              activeBar={{
                filter: 'brightness(0.97)',
              }}
              radius={[barRadius, barRadius, 0, 0]}
              isAnimationActive={enableAnimation}
            >
              {dataWithOpacity.map((entry, index) => (
                <Cell key={`cell-${index}`} fillOpacity={entry.opacity} />
              ))}
            </Bar>
          ))
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
    </div>
  );
};
