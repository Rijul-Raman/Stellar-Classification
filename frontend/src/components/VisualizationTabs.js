import React, { useState } from 'react';
import ConfusionMatrix from './ConfusionMatrix';
import ROCCurve from './ROCCurve';
import ClassPredictionError from './ClassPredictionError';

function VisualizationTabs() {
  const [activeTab, setActiveTab] = useState('confusion');

  return (
    <div className="visualization-tabs">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('confusion')}>Confusion Matrix</button>
        <button onClick={() => setActiveTab('roc')}>ROC Curve</button>
        <button onClick={() => setActiveTab('error')}>Class Prediction Error</button>
      </div>
      <div className="tab-content">
        {activeTab === 'confusion' && <ConfusionMatrix />}
        {activeTab === 'roc' && <ROCCurve />}
        {activeTab === 'error' && <ClassPredictionError />}
      </div>
    </div>
  );
}

export default VisualizationTabs;