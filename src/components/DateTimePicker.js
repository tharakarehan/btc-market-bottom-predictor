import React from 'react';

export default function DateTimePicker({ date, time, onDateChange, onTimeChange }) {
  // Compute maxTime as nearest 5-min slot to now
  const now = new Date();
  now.setSeconds(0, 0);
  now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
  const maxTime = now.toTimeString().slice(0,5);

  return (
    <div className="datetime-picker">
      <input
        type="date"
        value={date}
        onChange={e => onDateChange(e.target.value)}
      />
      <input
        type="time"
        step="300"
        max={maxTime}
        value={time}
        onChange={e => onTimeChange(e.target.value)}
      />
    </div>
  );
}