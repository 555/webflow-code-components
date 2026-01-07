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
} from 'recharts';

export interface BarChartProps {
  // Data
  data: string;
  xAxisKey?: string;
  bar1Key?: string;
  bar2Key?: string;

  // Bar 1 Colors
  bar1Fill?: string;
  bar1ActiveFill?: string;
  bar1ActiveStroke?: string;

  // Bar 2 Colors
  bar2Fill?: string;
  bar2ActiveFill?: string;
  bar2ActiveStroke?: string;

  // Bar Styling
  barRadius?: number;

  // Chart Features
  showCartesianGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;

  // Grid Styling
  gridStrokeDasharray?: string;

  // Dimensions
  maxWidth?: string;
  maxHeight?: string;
  aspectRatio?: number;

  // Margins
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;

  // Axis width
  yAxisWidth?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey = 'name',
  bar1Key = 'value1',
  bar2Key = 'value2',
  bar1Fill = '#8884d8',
  bar1ActiveFill = '#6366f1',
  bar1ActiveStroke = '#4f46e5',
  bar2Fill = '#82ca9d',
  bar2ActiveFill = '#10b981',
  bar2ActiveStroke = '#059669',
  barRadius = 10,
  showCartesianGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  gridStrokeDasharray = '3 3',
  maxWidth = '700px',
  maxHeight = '70vh',
  aspectRatio = 1.618,
  marginTop = 5,
  marginRight = 0,
  marginBottom = 5,
  marginLeft = 0,
  yAxisWidth = 60,
}) => {
  // Parse JSON data
  const parsedData = useMemo(() => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to parse chart data:', error);
      return [];
    }
  }, [data]);

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
                { name: 'Page A', value1: 4000, value2: 2400 },
                { name: 'Page B', value1: 3000, value2: 1398 },
              ],
              null,
              2
            )}
          </pre>
        </details>
      </div>
    );
  }

  // Check if first bar key exists in data
  const hasBar1 = parsedData.some((item: any) => item.hasOwnProperty(bar1Key));
  // Check if second bar key exists in data
  const hasBar2 = parsedData.some((item: any) => item.hasOwnProperty(bar2Key));

  return (
    <div style={{ maxWidth, maxHeight, width: '100%' }}>
      <ResponsiveContainer
        width="100%"
        aspect={aspectRatio}
        className="bar-chart-container"
      >
        <RechartsBarChart
          data={parsedData}
          margin={{
            top: marginTop,
            right: marginRight,
            left: marginLeft,
            bottom: marginBottom,
          }}
          style={{
            fontFamily: 'inherit',
          }}
        >
        {showCartesianGrid && <CartesianGrid strokeDasharray={gridStrokeDasharray} />}
        {showXAxis && <XAxis dataKey={xAxisKey} style={{ fontFamily: 'inherit' }} />}
        {showYAxis && <YAxis width={yAxisWidth} style={{ fontFamily: 'inherit' }} />}
        {showTooltip && <Tooltip contentStyle={{ fontFamily: 'inherit' }} />}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'inherit' }} />}

        {hasBar1 && (
          <Bar
            dataKey={bar1Key}
            fill={bar1Fill}
            activeBar={{
              fill: bar1ActiveFill,
              stroke: bar1ActiveStroke,
            }}
            radius={[barRadius, barRadius, 0, 0]}
          />
        )}

        {hasBar2 && (
          <Bar
            dataKey={bar2Key}
            fill={bar2Fill}
            activeBar={{
              fill: bar2ActiveFill,
              stroke: bar2ActiveStroke,
            }}
            radius={[barRadius, barRadius, 0, 0]}
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
    </div>
  );
};
