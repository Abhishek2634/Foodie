import React from 'react';
import './ErrorBoundary.css';
import { 
  createStandardError, 
  logErrorToService, 
  isRetryableError, 
  getRetryDelay 
} from './errorUtils';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      standardError: null,
      isRetrying: false,
      retryAttempts: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Create standardized error object
    const standardError = createStandardError(error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
      standardError: standardError
    });

    // Log error to external services
    logErrorToService(error, errorInfo, standardError.type);
  }

  handleRetry = () => {
    const { retryAttempts } = this.state;
    const maxRetries = 3;

    if (retryAttempts >= maxRetries) {
      this.handleReload();
      return;
    }

    this.setState({ isRetrying: true });
    
    // Calculate retry delay with exponential backoff
    const delay = getRetryDelay(retryAttempts + 1);
    
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        standardError: null,
        isRetrying: false,
        retryAttempts: retryAttempts + 1
      });
    }, delay);
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { standardError, isRetrying, retryAttempts } = this.state;
      const maxRetries = 3;
      const canRetry = isRetryableError(this.state.error) && retryAttempts < maxRetries;

      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">
              <span role="img" aria-label="error icon">
                {standardError?.emoji || '🍽️💥'}
              </span>
            </div>
            
            <h1 className="error-title">
              {standardError?.title || 'Oops! Something went wrong'}
            </h1>
            
            <p className="error-message">
              {standardError?.message || 
               "Don't worry, even the best chefs sometimes drop a dish! Our kitchen encountered an unexpected error while preparing your experience."
              }
            </p>

            <div className="error-actions">
              {canRetry && (
                <button 
                  className="btn-retry"
                  onClick={this.handleRetry}
                  disabled={isRetrying}
                >
                  {isRetrying ? (
                    <>
                      <span className="loading-spinner"></span>
                      Retrying...
                    </>
                  ) : (
                    <>
                      🔄 Try Again {retryAttempts > 0 && `(${retryAttempts}/${maxRetries})`}
                    </>
                  )}
                </button>
              )}
              
              <button 
                className="btn-reload"
                onClick={this.handleReload}
              >
                🏠 Reload Page
              </button>
            </div>

            {/* Development mode error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>🐛 Developer Details (Development Mode)</summary>
                <div className="error-stack">
                  <h3>Error Type:</h3>
                  <pre>{standardError?.type || 'UNKNOWN_ERROR'}</pre>
                  
                  <h3>Error ID:</h3>
                  <pre>{standardError?.id || 'N/A'}</pre>
                  
                  <h3>Error:</h3>
                  <pre>{this.state.error.toString()}</pre>
                  
                  <h3>Component Stack:</h3>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                  
                  <h3>Stack Trace:</h3>
                  <pre>{this.state.error.stack}</pre>

                  <h3>Timestamp:</h3>
                  <pre>{standardError?.timestamp || new Date().toISOString()}</pre>
                </div>
              </details>
            )}

            <div className="error-footer">
              <p>
                If this problem persists, please contact our support team.
                We're here to help! 🍕
              </p>
              {standardError?.id && (
                <p className="error-id">
                  Error ID: <code>{standardError.id}</code>
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
