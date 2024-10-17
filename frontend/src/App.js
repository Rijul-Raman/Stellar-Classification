import React, { useState } from 'react';
import ClassificationForm from './components/ClassificationForm';
import ClassificationResult from './components/ClassificationResult';
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  const handleClassification = (classificationResult) => {
    setResult(classificationResult);
  };

  return (
    <div className="App">
      <h1>Stellar Classification ML Project</h1>
      <ClassificationForm onClassify={handleClassification} />
      {result && <ClassificationResult result={result} />}
    </div>
  );
}

export default App;
