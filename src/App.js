import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from './components/LoadingScreen';
import DateTimePicker from './components/DateTimePicker';
import ResultsPanel from './components/ResultsPanel';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0,5));
  const [result, setResult] = useState(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    // show initial animation for 1.5s
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const handlePredict = async () => {
    setPredicting(true);
    const datetime = `${date} ${time}:00`;
    try {
      const resp = await axios.get('http://127.0.0.1:5000/predict', {
        params: { datetime }
      });
      setResult(resp.data);
    } catch (err) {
      console.error(err);
    }
    setPredicting(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="app-container">
      <div className="card">
        <h1>BTC Market Bottom Predictor</h1>
        <DateTimePicker
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
        <button onClick={handlePredict} disabled={predicting}>
          {predicting ? 'Predicting...' : 'Predict'}
        </button>
        {result && <ResultsPanel result={result} />}
      </div>
    </div>
  );
}

export default App;