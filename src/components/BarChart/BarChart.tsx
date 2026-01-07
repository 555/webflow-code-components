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

  // Bar 2 Colors
  bar2Fill?: string;

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
  height?: number;

  // Axis width
  yAxisWidth?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey = 'name',
  bar1Key = 'value1',
  bar2Key = 'value2',
  bar1Fill = '#8884d8',
  bar2Fill = '#82ca9d',
  barRadius = 10,
  showCartesianGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  showLegend = true,
  gridStrokeDasharray = '3 3',
  height = 400,
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
    <div style={{ width: '100%', height }} className="bar-chart-container">
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
        {showXAxis && <XAxis dataKey={xAxisKey} style={{ fontFamily: 'inherit' }} />}
        {showYAxis && <YAxis width={yAxisWidth} style={{ fontFamily: 'inherit' }} />}
        {showTooltip && <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} contentStyle={{ fontFamily: 'inherit' }} />}
        {showLegend && <Legend wrapperStyle={{ fontFamily: 'inherit' }} />}

        {hasBar1 && (
          <Bar
            dataKey={bar1Key}
            fill={bar1Fill}
            activeBar={{
              filter: 'brightness(0.97)',
            }}
            radius={[barRadius, barRadius, 0, 0]}
          />
        )}

        {hasBar2 && (
          <Bar
            dataKey={bar2Key}
            fill={bar2Fill}
            activeBar={{
              filter: 'brightness(0.97)',
            }}
            radius={[barRadius, barRadius, 0, 0]}
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
    </div>
  );
};
