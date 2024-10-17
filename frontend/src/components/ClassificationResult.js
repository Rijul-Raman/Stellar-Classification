import React from 'react';

function ClassificationResult({ result }) {
  return (
    <div>
      <h2>Classification Result</h2>
      <p>Celestial Body: {result.celestial_body}</p>
      <p>Description: {result.description}</p>
    </div>
  );
}

export default ClassificationResult;
