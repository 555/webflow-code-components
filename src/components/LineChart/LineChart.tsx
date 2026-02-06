import React, { useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  AreaChart as RechartsAreaChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

export interface LineChartProps {
  // Data
  data: string;
  xAxisKey?: string;

  // Chart Configuration
  chartType?: string; // "line" | "area"

  // Color
  baseColor?: string;
  colorMode?: string; // "opacity" | "brightness" | "contrast" | "saturation" | "hue-rotate" | "none"
  colorIncrement?: number;
  colorDirection?: string; // "first-to-last" | "last-to-first"

  // Line Styling
  strokeWidth?: number;
  showDots?: boolean;
  dotSize?: number;

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

  // Axis Labels
  xAxisLabel?: string;
  yAxisLabel?: string;

  // Tooltip Styling
  tooltipBackgroundColor?: string;
  tooltipBorderRadius?: number;
  tooltipTitleFontSize?: number;
  tooltipValueFontSize?: number;
  tooltipShowSeriesName?: boolean;
  tooltipTitleFontWeight?: number;
  tooltipValueFontWeight?: number;
  tooltipTitleFontFamily?: string;
  tooltipValueFontFamily?: string;

  // Axis & Grid Styling
  axisLineColor?: string;
  gridColor?: string;

  // Accessibility
  id?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatValue: (value: number) => string;
  backgroundColor: string;
  borderRadius: number;
  titleFontSize: number;
  valueFontSize: number;
  showSeriesName: boolean;
  titleFontWeight: number;
  valueFontWeight: number;
  titleFontFamily: string;
  valueFontFamily: string;
}

const CustomTooltip = ({ active, payload, label, formatValue, backgroundColor, borderRadius, titleFontSize, valueFontSize, showSeriesName, titleFontWeight, valueFontWeight, titleFontFamily, valueFontFamily }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div style={{
      backgroundColor,
      borderRadius,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '12px',
      minWidth: '160px',
      fontFamily: 'inherit',
    }}>
      <div style={{ fontSize: titleFontSize, fontWeight: titleFontWeight, fontFamily: titleFontFamily, color: 'inherit', marginBottom: 16 }}>
        {label}
      </div>
      {payload.map((entry, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: index > 0 ? 4 : 0 }}>
          <span style={{ fontSize: valueFontSize, fontWeight: valueFontWeight, fontFamily: valueFontFamily, color: entry.color }}>
            {formatValue(Number(entry.value))}
          </span>
          {showSeriesName && (
            <span style={{ fontSize: 12, color: '#666' }}>
              {entry.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
    type?: string;
  }>;
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
      fontFamily: 'inherit',
      fontSize: '0.75rem',
      color: 'inherit',
    }}>
      {payload.map((entry, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 10,
            height: 10,
            backgroundColor: entry.color,
            borderRadius: 2,
          }} />
          <span style={{ color: 'inherit' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey = 'name',
  chartType = 'line',
  baseColor = '#00a0dc',
  colorMode = 'opacity',
  colorIncrement = 25,
  colorDirection = 'first-to-last',
  strokeWidth = 2,
  showDots = true,
  dotSize = 4,
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
  xAxisLabel = '',
  yAxisLabel = '',
  tooltipBackgroundColor = '#ffffff',
  tooltipBorderRadius = 8,
  tooltipTitleFontSize = 14,
  tooltipValueFontSize = 20,
  tooltipShowSeriesName = true,
  tooltipTitleFontWeight = 700,
  tooltipValueFontWeight = 700,
  tooltipTitleFontFamily = 'inherit',
  tooltipValueFontFamily = 'inherit',
  axisLineColor = '#666',
  gridColor = '#ccc',
  id,
}) => {
  // Format value based on format type
  const formatValue = (value: number): string => {
    const numValue = Number(value);
    const absValue = Math.abs(numValue);

    if (valueFormat === 'percent') {
      return `${numValue}%`;
    } else if (valueFormat === 'currency') {
      if (absValue >= 1000000) {
        return `${currencySymbol}${(numValue / 1000000).toFixed(1)}M`;
      } else if (absValue >= 1000) {
        return `${currencySymbol}${(numValue / 1000).toFixed(1)}K`;
      }
      return `${currencySymbol}${numValue}`;
    } else if (valueFormat === 'multiplier') {
      return `${numValue}x`;
    } else {
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

  // Color values per line (varies by value key — same logic as BarChart stacked mode)
  const lineColorValues = useMemo(() => {
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

  // Parse maxValue — Webflow may pass unset Number props as empty strings
  const parsedMaxValue = maxValue != null && String(maxValue) !== '' ? Number(maxValue) : undefined;

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="line-chart-error">
        <p>No data available. Please provide valid JSON data.</p>
      </div>
    );
  }

  // Render Line or Area series based on chart type
  const renderSeries = () => {
    return valueKeys.map((key, keyIndex) => {
      // If CSV colors, use them directly; otherwise use baseColor
      const color = isColorCSV && colorArray
        ? colorArray[keyIndex % colorArray.length]
        : baseColor;

      const colorValue = isColorCSV
        ? { opacity: 1, filter: undefined as string | undefined }
        : (lineColorValues[keyIndex] || { opacity: 1, filter: undefined as string | undefined });

      const dotProps = showDots
        ? {
            r: dotSize,
            fill: color,
            stroke: '#fff',
            strokeWidth: 2,
            fillOpacity: colorValue.opacity,
            ...(colorValue.filter ? { style: { filter: colorValue.filter } } : {}),
          }
        : false;

      if (chartType === 'area') {
        return (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={colorValue.opacity}
            fill={color}
            fillOpacity={0.15}
            dot={dotProps}
            isAnimationActive={enableAnimation}
            style={colorValue.filter ? { filter: colorValue.filter } : undefined}
          />
        );
      }

      return (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={colorValue.opacity}
          dot={dotProps}
          isAnimationActive={enableAnimation}
          style={colorValue.filter ? { filter: colorValue.filter } : undefined}
        />
      );
    });
  };

  return (
    <div id={id} style={{ width: '100%', height }} className="line-chart-container">
      <ResponsiveContainer>
        {chartType === 'area' ? (
          <RechartsAreaChart
            data={parsedData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: xAxisLabel ? 20 : 0,
            }}
            style={{
              fontFamily: 'inherit',
            }}
          >
            {showCartesianGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} stroke={gridColor} />}
            <XAxis
              dataKey={xAxisKey}
              stroke={axisLineColor}
              tick={showXAxis}
              style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
              {...(xAxisLabel ? { label: { value: xAxisLabel, position: 'bottom', offset: -5, style: { textAnchor: 'middle', fill: 'inherit', fontSize: 12, fontFamily: 'inherit' } } } : {})}
            />
            <YAxis
              width={yAxisWidth}
              stroke={axisLineColor}
              style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
              tickFormatter={formatValue}
              tick={showYAxis}
              {...(parsedMaxValue != null && !isNaN(parsedMaxValue) ? { domain: [0, parsedMaxValue] } : {})}
            >
              {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={16} textAnchor="middle" style={{ fill: 'inherit', fontSize: 12, fontFamily: 'inherit' }} />}
            </YAxis>
            {showTooltip && (
              <Tooltip
                content={
                  <CustomTooltip
                    formatValue={formatValue}
                    backgroundColor={tooltipBackgroundColor}
                    borderRadius={tooltipBorderRadius}
                    titleFontSize={tooltipTitleFontSize}
                    valueFontSize={tooltipValueFontSize}
                    showSeriesName={tooltipShowSeriesName}
                    titleFontWeight={tooltipTitleFontWeight}
                    valueFontWeight={tooltipValueFontWeight}
                    titleFontFamily={tooltipTitleFontFamily}
                    valueFontFamily={tooltipValueFontFamily}
                  />
                }
              />
            )}
            {showLegend && <Legend content={<CustomLegend />} wrapperStyle={{ margin: 0, padding: 0 }} />}
            {renderSeries()}
          </RechartsAreaChart>
        ) : (
          <RechartsLineChart
            data={parsedData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: xAxisLabel ? 20 : 0,
            }}
            style={{
              fontFamily: 'inherit',
            }}
          >
            {showCartesianGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} stroke={gridColor} />}
            <XAxis
              dataKey={xAxisKey}
              stroke={axisLineColor}
              tick={showXAxis}
              style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
              {...(xAxisLabel ? { label: { value: xAxisLabel, position: 'bottom', offset: -5, style: { textAnchor: 'middle', fill: 'inherit', fontSize: 12, fontFamily: 'inherit' } } } : {})}
            />
            <YAxis
              width={yAxisWidth}
              stroke={axisLineColor}
              style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
              tickFormatter={formatValue}
              tick={showYAxis}
              {...(parsedMaxValue != null && !isNaN(parsedMaxValue) ? { domain: [0, parsedMaxValue] } : {})}
            >
              {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={16} textAnchor="middle" style={{ fill: 'inherit', fontSize: 12, fontFamily: 'inherit' }} />}
            </YAxis>
            {showTooltip && (
              <Tooltip
                content={
                  <CustomTooltip
                    formatValue={formatValue}
                    backgroundColor={tooltipBackgroundColor}
                    borderRadius={tooltipBorderRadius}
                    titleFontSize={tooltipTitleFontSize}
                    valueFontSize={tooltipValueFontSize}
                    showSeriesName={tooltipShowSeriesName}
                    titleFontWeight={tooltipTitleFontWeight}
                    valueFontWeight={tooltipValueFontWeight}
                    titleFontFamily={tooltipTitleFontFamily}
                    valueFontFamily={tooltipValueFontFamily}
                  />
                }
              />
            )}
            {showLegend && <Legend content={<CustomLegend />} wrapperStyle={{ margin: 0, padding: 0 }} />}
            {renderSeries()}
          </RechartsLineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
