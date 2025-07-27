// src/components/PriceChart.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine
} from 'recharts';

export default function PriceChart({ real, predicted, bestIndex }) {
  const data = real.map((value, idx) => {
    const minutes = (idx - 12) * 5; // -60 … +60
    let pred = null;
    if (idx >= 12 && idx < 12 + predicted.length) {
      pred = predicted[idx - 12];
    }
    return { minutes, real: value, predicted: pred };
  });

  const ticks = data.map(d => d.minutes);
  const entryX = 0,         entryY = real[12];
  const bestX  = (bestIndex - 12) * 5, bestY = real[bestIndex];
  const exitX  = (data.length - 1 - 12) * 5, exitY = real[real.length - 1];

  return (
    <div className="price-chart-wrapper">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
          {/* Axes */}
          <XAxis
            dataKey="minutes" type="number" domain={['dataMin','dataMax']}
            ticks={ticks} tickFormatter={m => `${m}m`}
            axisLine={{ stroke: '#333' }} tickLine={false}
            tick={{ fill: '#333', fontSize: 12 }}
          />
           <YAxis
            domain={[
              dataMin => dataMin - Math.trunc(dataMin*0.2),
              dataMax => dataMax + Math.trunc(dataMax*0.1)
            ]}
            axisLine={{ stroke: '#333', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#333', fontSize: 12 }}
            width={40}
          />

          <Tooltip
            formatter={(val,name)=>[val,name==='real'?'Real':'Pred']}
            labelFormatter={m=>`Offset: ${m} m`}
          />

          {/* Real price */}
          <Line type="monotone" dataKey="real" stroke="#2c3e50" strokeWidth={2} dot={false} />

          {/* Predicted price: dark blue dash */}
          <Line
            type="monotone" dataKey="predicted"
            stroke="#1f3a93" strokeWidth={2} strokeDasharray="5 5"
            dot={false} connectNulls={false}
          />

          {/* Entry (middle) */}
          <ReferenceLine x={entryX} stroke="#8e44ad" strokeDasharray="3 3" />
          <ReferenceLine y={entryY} stroke="#8e44ad" strokeDasharray="3 3" />
          <ReferenceDot
            x={entryX} y={entryY} r={5} fill="#8e44ad" stroke="none"
            label={{ position:'top', value:'Entry', fill:'#8e44ad', fontSize:10 }}
          />

          {/* Best bottom */}
          <ReferenceLine x={bestX} stroke="#e74c3c" strokeDasharray="3 3" />
          <ReferenceLine y={bestY} stroke="#e74c3c" strokeDasharray="3 3" />
          <ReferenceDot
            x={bestX} y={bestY} r={5} fill="#e74c3c" stroke="none"
            label={{ position:'bottom', value:'Best', fill:'#e74c3c', fontSize:10 }}
          />

          {/* Exit (end) */}
          <ReferenceLine x={exitX} stroke="#16a085" strokeDasharray="3 3" />
          <ReferenceLine y={exitY} stroke="#16a085" strokeDasharray="3 3" />
          <ReferenceDot
            x={exitX} y={exitY} r={5} fill="#16a085" stroke="none"
            label={{ position:'bottom', value:'Exit', fill:'#16a085', fontSize:10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
