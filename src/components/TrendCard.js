import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function TrendCard({ title, data }) {
  const chartData = data.map((v, i) => ({ idx: i, value: v }));

  return (
    <div className="trend-card">
      <h4>{title}</h4>
      <div className="trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 15, left: -30, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#800000" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#800000" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis
              dataKey="idx"
              type="number"
              domain={[
                dataMin => dataMin + 100,
                dataMax => dataMax + 0.5
              ]}
              axisLine={false}
              tick={false}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={false}
              tickLine={false}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#800000"
              strokeWidth={2}
              fill="url(#trendGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
