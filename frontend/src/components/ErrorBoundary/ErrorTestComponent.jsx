import React, { useState } from 'react';

// This is a test component to demonstrate ErrorBoundary functionality
// Remove this component in production or use it for testing purposes only
const ErrorTestComponent = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the ErrorBoundary
    throw new Error('Test error triggered intentionally!');
  }

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px dashed #ff6347',
      borderRadius: '10px',
      backgroundColor: '#fff5f5',
      textAlign: 'center'
    }}>
      <h3>🧪 Error Boundary Test Component</h3>
      <p>This component is for testing the Error Boundary functionality.</p>
      <button
        onClick={() => setShouldError(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6347',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        🚨 Trigger Error (Test ErrorBoundary)
      </button>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Note: Remove this component in production
      </p>
    </div>
  );
};

export default ErrorTestComponent;
