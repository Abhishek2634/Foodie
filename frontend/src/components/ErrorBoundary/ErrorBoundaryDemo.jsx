import React, { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

// Component that throws different types of errors for testing
const ErrorTrigger = ({ errorType }) => {
  switch (errorType) {
    case 'component':
      // Component error
      throw new Error('Component rendering failed - test error');
    
    case 'network':
      // Simulate network error
      throw new Error('Network request failed - fetch error occurred');
    
    case 'data':
      // Simulate data parsing error
      throw new Error('JSON parse error - invalid data format');
    
    case 'permission':
      // Simulate permission error
      throw new Error('Unauthorized access - permission denied');
    
    case 'async':
      // This won't be caught by ErrorBoundary (for demonstration)
      setTimeout(() => {
        throw new Error('Async error - this won\'t be caught by ErrorBoundary');
      }, 100);
      return <div>Async error triggered (check console)</div>;
    
    default:
      return <div>No error type selected</div>;
  }
};

const ErrorBoundaryDemo = () => {
  const [errorType, setErrorType] = useState(null);
  const [showNestedBoundary, setShowNestedBoundary] = useState(false);

  const triggerError = (type) => {
    setErrorType(type);
  };

  const resetError = () => {
    setErrorType(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Outfit, sans-serif' }}>
      <h1>🧪 Error Boundary Testing Interface</h1>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h2>Test Different Error Types</h2>
        <p>Click the buttons below to test how our ErrorBoundary handles different types of errors:</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap',
          marginBottom: '15px'
        }}>
          <button 
            onClick={() => triggerError('component')}
            style={{
              padding: '10px 15px',
              background: '#ff6347',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔧 Component Error
          </button>
          
          <button 
            onClick={() => triggerError('network')}
            style={{
              padding: '10px 15px',
              background: '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🌐 Network Error
          </button>
          
          <button 
            onClick={() => triggerError('data')}
            style={{
              padding: '10px 15px',
              background: '#ffa726',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            📊 Data Error
          </button>
          
          <button 
            onClick={() => triggerError('permission')}
            style={{
              padding: '10px 15px',
              background: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🔒 Permission Error
          </button>
          
          <button 
            onClick={() => triggerError('async')}
            style={{
              padding: '10px 15px',
              background: '#607d8b',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ⏰ Async Error (Not Caught)
          </button>
        </div>
        
        <button 
          onClick={resetError}
          style={{
            padding: '10px 15px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset Demo
        </button>
      </div>

      <div style={{ 
        background: '#fff3cd', 
        padding: '15px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>🎯 Testing Features</h3>
        <ul>
          <li><strong>Error Categorization:</strong> Different error types show different messages</li>
          <li><strong>Retry Logic:</strong> Some errors show retry button with attempt counter</li>
          <li><strong>Development Mode:</strong> Detailed error info visible in dev mode</li>
          <li><strong>Error Logging:</strong> Check browser console for logged error details</li>
          <li><strong>Responsive Design:</strong> Resize window to test mobile layout</li>
        </ul>
      </div>

      <div style={{ 
        background: '#d1ecf1', 
        padding: '15px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '1px solid #bee5eb'
      }}>
        <h3>📝 Expected Behavior</h3>
        <ul>
          <li><strong>Component/Network/Data Errors:</strong> Show "Try Again" button with retry logic</li>
          <li><strong>Permission Errors:</strong> Show specialized message about access</li>
          <li><strong>Async Errors:</strong> Won't be caught (ErrorBoundary limitation)</li>
          <li><strong>Error Recovery:</strong> "Try Again" resets the error state</li>
          <li><strong>Reload Option:</strong> Always available as fallback</li>
        </ul>
      </div>

      {/* Nested ErrorBoundary Test */}
      <div style={{ 
        background: '#f8d7da', 
        padding: '15px', 
        borderRadius: '10px', 
        marginBottom: '20px',
        border: '1px solid #f5c6cb'
      }}>
        <h3>🔗 Nested ErrorBoundary Test</h3>
        <p>Test how ErrorBoundaries work when nested:</p>
        <button 
          onClick={() => setShowNestedBoundary(!showNestedBoundary)}
          style={{
            padding: '8px 12px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showNestedBoundary ? 'Hide' : 'Show'} Nested Boundary Test
        </button>
        
        {showNestedBoundary && (
          <div style={{ marginTop: '15px', padding: '15px', background: 'white', borderRadius: '5px' }}>
            <ErrorBoundary>
              <h4>Inner ErrorBoundary</h4>
              <button 
                onClick={() => triggerError('component')}
                style={{
                  padding: '8px 12px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Trigger Error in Inner Boundary
              </button>
            </ErrorBoundary>
          </div>
        )}
      </div>

      {/* Main error display area */}
      <div style={{ 
        minHeight: '200px',
        background: 'white',
        border: '2px dashed #dee2e6',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ErrorBoundary>
          {errorType ? (
            <ErrorTrigger errorType={errorType} />
          ) : (
            <div style={{ textAlign: 'center', color: '#6c757d' }}>
              <h3>🍽️ Error Testing Area</h3>
              <p>Click a button above to trigger an error and see the ErrorBoundary in action!</p>
            </div>
          )}
        </ErrorBoundary>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: '#e2e3e5',
        borderRadius: '10px',
        fontSize: '14px',
        color: '#495057'
      }}>
        <p><strong>Note:</strong> This testing interface is for development purposes only. 
        Remove from production builds or protect with environment checks.</p>
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo;
