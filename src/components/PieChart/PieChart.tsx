import React, { useMemo } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface PieChartProps {
  // Data
  data: string;
  nameKey?: string;
  valueKey?: string;

  // Colors
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;

  // Chart Features
  showTooltip?: boolean;
  showLegend?: boolean;
  enableAnimation?: boolean;

  // Value Formatting
  valueFormat?: string; // "number" | "percent" | "currency"
  currencySymbol?: string;

  // Pie Styling
  innerRadius?: number;
  paddingAngle?: number;

  // Dimensions
  height?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  nameKey = 'name',
  valueKey = 'value',
  color1 = '#ff6b35',
  color2 = '#004e89',
  color3 = '#1a8fe3',
  color4 = '#b8b8b8',
  showTooltip = true,
  showLegend = true,
  enableAnimation = true,
  valueFormat = 'number',
  currencySymbol = '$',
  innerRadius = 60,
  paddingAngle = 2,
  height = 400,
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
      // Take first 4 items if more provided
      return parsed.slice(0, 4);
    } catch (error) {
      console.error('Failed to parse chart data:', error);
      return [];
    }
  }, [data]);

  // Check if we have valid data
  if (!parsedData || parsedData.length === 0) {
    return (
      <div className="pie-chart-error">
        <p>No data available. Please provide valid JSON data.</p>
        <details>
          <summary>Example format</summary>
          <pre>
            {JSON.stringify(
              [
                { name: 'Category A', value: 9094 },
                { name: 'Category B', value: 1058 },
                { name: 'Category C', value: 1078 },
                { name: 'Category D', value: 48 },
              ],
              null,
              2
            )}
          </pre>
        </details>
      </div>
    );
  }

  // Colors array
  const colors = [color1, color2, color3, color4];

  return (
    <div style={{ width: '100%', height }} className="pie-chart-container">
      <ResponsiveContainer>
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.1)' }}
              contentStyle={{ fontFamily: 'inherit' }}
              wrapperStyle={{ zIndex: 1000 }}
              formatter={(value: any) => formatValue(Number(value))}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{ fontFamily: 'inherit' }}
              verticalAlign="middle"
              align="right"
              layout="vertical"
            />
          )}
          <Pie
            data={parsedData}
            dataKey={valueKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={`${innerRadius}%`}
            outerRadius="80%"
            paddingAngle={paddingAngle}
            isAnimationActive={enableAnimation}
            activeShape={{
              filter: 'brightness(0.97)',
            }}
          >
            {parsedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
