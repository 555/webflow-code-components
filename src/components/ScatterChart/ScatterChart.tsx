import React, { useMemo } from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

export interface ScatterChartProps {
  // Data
  data: string;
  xAxisKey?: string;
  yAxisKey?: string;
  categoryKey?: string; // Optional - group data into multiple series by this key

  // Chart Configuration
  chartType?: string; // "scatter" | "bubble"
  sizeKey?: string; // For bubble chart - which key controls bubble size

  // Color
  baseColor?: string;
  colorMode?: string; // "opacity" | "brightness" | "contrast" | "saturation" | "hue-rotate" | "none"
  colorIncrement?: number;
  colorDirection?: string; // "first-to-last" | "last-to-first"

  // Point Styling
  pointSize?: number;
  pointShape?: string; // "circle" | "square" | "triangle" | "diamond"

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
  minXValue?: number;
  maxXValue?: number;
  minYValue?: number;
  maxYValue?: number;

  // Dimensions
  height?: number;

  // Axis width
  yAxisWidth?: number;

  // Axis Labels
  xAxisLabel?: string;
  yAxisLabel?: string;

  // Axis & Grid Styling
  axisLineColor?: string;
  gridColor?: string;

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

export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  xAxisKey = 'x',
  yAxisKey = 'y',
  categoryKey = '',
  chartType = 'scatter',
  sizeKey = 'z',
  baseColor = '#00a0dc',
  colorMode = 'opacity',
  colorIncrement = 25,
  colorDirection = 'first-to-last',
  pointSize = 60,
  pointShape = 'circle',
  showCartesianGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  enableAnimation = true,
  valueFormat = 'number',
  currencySymbol = '£',
  gridStrokeDasharray = '3 3',
  minXValue,
  maxXValue,
  minYValue,
  maxYValue,
  height = 400,
  yAxisWidth = 60,
  xAxisLabel = '',
  yAxisLabel = '',
  axisLineColor = '#666',
  gridColor = '#ccc',
  tooltipBackgroundColor = '#ffffff',
  tooltipBorderRadius = 8,
  tooltipTitleFontSize = 14,
  tooltipValueFontSize = 20,
  tooltipShowSeriesName = true,
  tooltipTitleFontWeight = 700,
  tooltipValueFontWeight = 700,
  tooltipTitleFontFamily = 'inherit',
  tooltipValueFontFamily = 'inherit',
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

  // Group data by category if categoryKey is provided, otherwise single series
  const seriesData = useMemo(() => {
    if (parsedData.length === 0) return [];

    if (categoryKey && categoryKey !== '') {
      // Multiple series - group by category
      const grouped: { [key: string]: any[] } = {};

      parsedData.forEach(item => {
        const category = String(item[categoryKey] || 'default');
        if (!grouped[category]) {
          grouped[category] = [];
        }

        const point: any = {
          x: Number(item[xAxisKey]),
          y: Number(item[yAxisKey]),
        };

        if (chartType === 'bubble' && item[sizeKey] !== undefined) {
          point.z = Number(item[sizeKey]);
        }

        grouped[category].push(point);
      });

      return Object.entries(grouped).map(([name, data]) => ({ name, data }));
    } else {
      // Single series
      const data = parsedData.map(item => {
        const point: any = {
          x: Number(item[xAxisKey]),
          y: Number(item[yAxisKey]),
        };

        if (chartType === 'bubble' && item[sizeKey] !== undefined) {
          point.z = Number(item[sizeKey]);
        }

        return point;
      });

      return [{ name: yAxisKey, data }];
    }
  }, [parsedData, xAxisKey, yAxisKey, categoryKey, sizeKey, chartType]);

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

  // Color values per series
  const seriesColorValues = useMemo(() => {
    if (isColorCSV) return [];

    const count = seriesData.length;
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
          currentValue = currentValue * (1 + incrementDecimal);
        } else {
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
          values.push({ opacity: 1, filter: `saturate(${(value / 100).toFixed(4)})` });
        } else {
          values.push({ opacity: 1, filter: `${colorMode}(${value}%)` });
        }
      }
    }
    return values;
  }, [seriesData.length, colorMode, colorIncrement, colorDirection, isColorCSV]);

  // Parse domain values
  const parsedMinX = minXValue != null && String(minXValue) !== '' ? Number(minXValue) : undefined;
  const parsedMaxX = maxXValue != null && String(maxXValue) !== '' ? Number(maxXValue) : undefined;
  const parsedMinY = minYValue != null && String(minYValue) !== '' ? Number(minYValue) : undefined;
  const parsedMaxY = maxYValue != null && String(maxYValue) !== '' ? Number(maxYValue) : undefined;

  // Map shape names to Recharts shape types
  const getShapeName = (shape: string) => {
    const shapeMap: { [key: string]: string } = {
      circle: 'circle',
      square: 'square',
      triangle: 'triangle',
      diamond: 'diamond',
    };
    return shapeMap[shape] || 'circle';
  };

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="scatter-chart-error">
        <p>No data available. Please provide valid JSON data.</p>
      </div>
    );
  }

  return (
    <div id={id} style={{ width: '100%', height }} className="scatter-chart-container">
      <ResponsiveContainer>
        <RechartsScatterChart
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
            type="number"
            dataKey="x"
            stroke={axisLineColor}
            tick={showXAxis}
            style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
            tickFormatter={formatValue}
            {...(parsedMinX != null || parsedMaxX != null ? { domain: [parsedMinX ?? 'auto', parsedMaxX ?? 'auto'] } : {})}
            {...(xAxisLabel ? { label: { value: xAxisLabel, position: 'bottom', offset: -5, style: { textAnchor: 'middle', fill: 'inherit', fontSize: 12, fontFamily: 'inherit' } } } : {})}
          />
          <YAxis
            type="number"
            dataKey="y"
            width={yAxisWidth}
            stroke={axisLineColor}
            style={{ fontFamily: 'inherit', fontSize: 12, fill: 'inherit' }}
            tickFormatter={formatValue}
            tick={showYAxis}
            {...(parsedMinY != null || parsedMaxY != null ? { domain: [parsedMinY ?? 'auto', parsedMaxY ?? 'auto'] } : {})}
          >
            {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" offset={16} textAnchor="middle" style={{ fill: 'inherit', fontSize: 12, fontFamily: 'inherit' }} />}
          </YAxis>
          {chartType === 'bubble' && (
            <ZAxis type="number" dataKey={sizeKey} range={[pointSize / 2, pointSize * 2]} />
          )}
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

          {seriesData.map((series, seriesIndex) => {
            const color = isColorCSV && colorArray
              ? colorArray[seriesIndex % colorArray.length]
              : baseColor;

            const colorValue = isColorCSV
              ? { opacity: 1, filter: undefined as string | undefined }
              : (seriesColorValues[seriesIndex] || { opacity: 1, filter: undefined as string | undefined });

            return (
              <Scatter
                key={series.name}
                name={series.name}
                data={series.data}
                fill={color}
                fillOpacity={colorValue.opacity}
                shape={getShapeName(pointShape) as any}
                isAnimationActive={enableAnimation}
                style={colorValue.filter ? { filter: colorValue.filter } : undefined}
              />
            );
          })}
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
