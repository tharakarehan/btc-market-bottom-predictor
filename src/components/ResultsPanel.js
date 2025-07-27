import React from 'react';
import PriceChart from './PriceChart';
import TrendCard from './TrendCard';

export default function ResultsPanel({ result }) {
  // Fixed sizes via CSS; if no result, render empty placeholders
  if (!result) {
    return (
      <div className="results-panel">
        <div className="main-chart placeholder" />
        <div className="trends-sidebar">
          <TrendCard title="Bitcoin Trend" data={[]} />
          <TrendCard title="Buy-Bitcoin Trend" data={[]} />
          <TrendCard title="Bitcoin Price Trend" data={[]} />
        </div>
      </div>
    );
  }

  const {
    status,
    real,
    predicted,
    best_index,
    gained_profit,
    actual_profit,
    bitcoin_trend,
    buy_bitcoin_trend,
    bitcoin_price_trend
  } = result;

  // calculate percentage
  const gainedPct = actual_profit !== 0 
    ? (gained_profit / actual_profit) * 100 
    : 0;

  return (
    <div className="results-panel">
      <div className="main-chart">
        <PriceChart real={real} predicted={predicted} bestIndex={best_index} />
         {/* New stats row: status + table */}
         <div className="stats-row">
          <div className={`status-block ${status ? 'buy' : 'hold'}`}>
            <span className="status-icon">
              {status ? '✔️' : '✖️'}
            </span>
            <span className="status-text">
              {status ? 'Buy Now' : 'Hold'}
            </span>
          </div>
        <div className="stats-table-wrapper">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gained Profit</td>
                <td>${gained_profit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Actual Profit</td>
                <td>${actual_profit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Gained %</td>
                <td>{gainedPct.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
      <div className="trends-sidebar">
        <TrendCard title="Bitcoin Trend" data={bitcoin_trend} />
        <TrendCard title="Buy-Bitcoin Trend" data={buy_bitcoin_trend} />
        <TrendCard title="Bitcoin Price Trend" data={bitcoin_price_trend} />
      </div>
    </div>
  );
}