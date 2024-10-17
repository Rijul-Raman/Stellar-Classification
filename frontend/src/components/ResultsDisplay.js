import React from 'react';

function ResultsDisplay({ result }) {
  return (
    <div className="results">
      <h2>Classification Result</h2>
      <p>Class: {result.class}</p>
      <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
    </div>
  );
}

export default ResultsDisplay;
