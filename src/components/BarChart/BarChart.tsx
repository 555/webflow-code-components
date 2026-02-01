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
  colorMode?: string; // "opacity" | "brightness" | "contrast" | "saturation" | "hue-rotate" | "none"
  colorIncrement?: number;
  colorDirection?: string; // "first-to-last" | "last-to-first"

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
  valueFormat?: string; // "number" | "percent" | "currency" | "multiplier"
  currencySymbol?: string;

  // Grid Styling
  gridStrokeDasharray?: string;

  // Axis Configuration
  maxValue?: number;

  // Dimensions
  height?: number;

  // Axis width
  yAxisWidth?: number;

  // Accessibility
  id?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey = 'name',
  chartType = 'column',
  baseColor = '#00a0dc',
  colorMode = 'opacity',
  colorIncrement = 25,
  colorDirection = 'first-to-last',
  barRadius = 10,
  showCartesianGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  enableAnimation = true,
  valueFormat = 'number',
  currencySymbol = '£',
  gridStrokeDasharray = '3 3',
  maxValue,
  height = 400,
  yAxisWidth = 60,
  id,
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
    } else if (valueFormat === 'multiplier') {
      // Multiplier format - adds 'x' suffix, no K/M
      return `${numValue}x`;
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

  // Detect if baseColor contains CSV (comma-separated values)
  const isColorCSV = useMemo(() => {
    return baseColor.includes(',');
  }, [baseColor]);

  // Parse colors from CSV if detected
  const colorArray = useMemo(() => {
    if (isColorCSV) {
      return baseColor.split(',').map(color => color.trim());
    }
    return null;
  }, [baseColor, isColorCSV]);

  // Color values for stacked mode (varies by value keys)
  const stackedColorValues = useMemo(() => {
    // If CSV colors detected, skip color differentiation calculation
    if (isColorCSV) return [];

    const count = valueKeys.length;
    if (count === 0 || colorMode === 'none') {
      return Array(count).fill({ opacity: 1, filter: undefined });
    }

    const values: { opacity: number; filter?: string }[] = [];
    const incrementDecimal = colorIncrement / 100;

    if (colorMode === 'hue-rotate') {
      for (let i = 0; i < count; i++) {
        const degrees = i * colorIncrement;
        const finalDegrees = colorDirection === 'last-to-first' ? -degrees : degrees;
        values.push({ opacity: 1, filter: `hue-rotate(${finalDegrees}deg)` });
      }
    } else {
      const rawValues: number[] = [];
      let currentValue = 100;
      for (let i = 0; i < count; i++) {
        rawValues.push(currentValue);
        if (colorMode === 'brightness') {
          // Brightness: compound increase (getting brighter)
          currentValue = currentValue * (1 + incrementDecimal);
        } else {
          // Opacity, contrast, saturation: compound reduction
          currentValue = currentValue * (1 - incrementDecimal);
        }
      }
      if (colorDirection === 'last-to-first') {
        rawValues.reverse();
      }
      for (const value of rawValues) {
        if (colorMode === 'opacity') {
          values.push({ opacity: value / 100, filter: undefined });
        } else if (colorMode === 'saturation') {
          // Saturation uses decimal format
          values.push({ opacity: 1, filter: `saturate(${(value / 100).toFixed(4)})` });
        } else {
          // brightness, contrast use percentage
          values.push({ opacity: 1, filter: `${colorMode}(${value}%)` });
        }
      }
    }
    return values;
  }, [valueKeys.length, colorMode, colorIncrement, colorDirection, isColorCSV]);

  // Color values for column mode (varies by data rows)
  const columnColorValues = useMemo(() => {
    // If CSV colors detected, skip color differentiation calculation
    if (isColorCSV) return [];

    const count = parsedData.length;
    if (count === 0 || colorMode === 'none') {
      return Array(count).fill({ opacity: 1, filter: undefined });
    }

    const values: { opacity: number; filter?: string }[] = [];
    const incrementDecimal = colorIncrement / 100;

    if (colorMode === 'hue-rotate') {
      for (let i = 0; i < count; i++) {
        const degrees = i * colorIncrement;
        const finalDegrees = colorDirection === 'last-to-first' ? -degrees : degrees;
        values.push({ opacity: 1, filter: `hue-rotate(${finalDegrees}deg)` });
      }
    } else {
      const rawValues: number[] = [];
      let currentValue = 100;
      for (let i = 0; i < count; i++) {
        rawValues.push(currentValue);
        if (colorMode === 'brightness') {
          // Brightness: compound increase (getting brighter)
          currentValue = currentValue * (1 + incrementDecimal);
        } else {
          // Opacity, contrast, saturation: compound reduction
          currentValue = currentValue * (1 - incrementDecimal);
        }
      }
      if (colorDirection === 'last-to-first') {
        rawValues.reverse();
      }
      for (const value of rawValues) {
        if (colorMode === 'opacity') {
          values.push({ opacity: value / 100, filter: undefined });
        } else if (colorMode === 'saturation') {
          // Saturation uses decimal format
          values.push({ opacity: 1, filter: `saturate(${(value / 100).toFixed(4)})` });
        } else {
          // brightness, contrast use percentage
          values.push({ opacity: 1, filter: `${colorMode}(${value}%)` });
        }
      }
    }
    return values;
  }, [parsedData.length, colorMode, colorIncrement, colorDirection, isColorCSV]);

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="bar-chart-error">
        <p>No data available. Please provide valid JSON data.</p>
      </div>
    );
  }

  return (
    <div id={id} style={{ width: '100%', height }} className="bar-chart-container">
      <ResponsiveContainer>
        <RechartsBarChart
          data={parsedData}
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
        {showXAxis && <XAxis dataKey={xAxisKey} style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }} />}
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
            tickFormatter={formatValue}
            {...(maxValue !== undefined && maxValue !== null ? { domain: ['auto', Number(maxValue)] } : {})}
          />
        )}
        {showTooltip && (
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
            contentStyle={{ fontFamily: 'inherit' }}
            formatter={(value: any) => formatValue(Number(value))}
          />
        )}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'inherit', fill: 'inherit' }} />}

        {chartType === 'stacked' ? (
          // Stacked mode: render a Bar for each value key
          // Color varies by value key (stacked segment)
          valueKeys.map((key, keyIndex) => {
            // If CSV colors, use them directly
            if (isColorCSV && colorArray) {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="stack"
                  fill={colorArray[keyIndex % colorArray.length]}
                  activeBar={{
                    filter: 'brightness(0.97)',
                  }}
                  radius={keyIndex === valueKeys.length - 1 ? [barRadius, barRadius, 0, 0] : [0, 0, 0, 0]}
                  isAnimationActive={enableAnimation}
                />
              );
            }
            // Otherwise use color differentiation system
            const colorValue = stackedColorValues[keyIndex] || { opacity: 1, filter: undefined };
            return (
              <Bar
                key={key}
                dataKey={key}
                stackId="stack"
                fill={baseColor}
                fillOpacity={colorValue.opacity}
                style={colorValue.filter ? { filter: colorValue.filter } : undefined}
                activeBar={{
                  filter: 'brightness(0.97)',
                }}
                radius={keyIndex === valueKeys.length - 1 ? [barRadius, barRadius, 0, 0] : [0, 0, 0, 0]}
                isAnimationActive={enableAnimation}
              />
            );
          })
        ) : (
          // Column mode: render a Bar for each value key (grouped, not stacked)
          // Color varies by X-axis position (data row), not by value key
          valueKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              activeBar={{
                filter: 'brightness(0.97)',
              }}
              radius={[barRadius, barRadius, 0, 0]}
              isAnimationActive={enableAnimation}
            >
              {parsedData.map((entry, index) => {
                // If CSV colors, use them directly
                if (isColorCSV && colorArray) {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorArray[index % colorArray.length]}
                    />
                  );
                }
                // Otherwise use color differentiation system
                const colorValue = columnColorValues[index] || { opacity: 1, filter: undefined };
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={baseColor}
                    fillOpacity={colorValue.opacity}
                    style={colorValue.filter ? { filter: colorValue.filter } : undefined}
                  />
                );
              })}
            </Bar>
          ))
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
    </div>
  );
};
