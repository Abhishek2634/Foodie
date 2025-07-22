// Error utility functions for the ErrorBoundary system

/**
 * Error types for categorizing different kinds of errors
 */
export const ERROR_TYPES = {
  COMPONENT_ERROR: 'COMPONENT_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  DATA_ERROR: 'DATA_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

/**
 * Categorizes errors based on their message and stack trace
 * @param {Error} error - The error object
 * @returns {string} - The error category
 */
export const categorizeError = (error) => {
  const message = error.message?.toLowerCase() || '';
  const stack = error.stack?.toLowerCase() || '';

  if (message.includes('network') || message.includes('fetch') || message.includes('xhr')) {
    return ERROR_TYPES.NETWORK_ERROR;
  }
  
  if (message.includes('permission') || message.includes('unauthorized') || message.includes('forbidden')) {
    return ERROR_TYPES.PERMISSION_ERROR;
  }
  
  if (message.includes('json') || message.includes('parse') || message.includes('data')) {
    return ERROR_TYPES.DATA_ERROR;
  }
  
  if (stack.includes('react') || stack.includes('component')) {
    return ERROR_TYPES.COMPONENT_ERROR;
  }
  
  return ERROR_TYPES.UNKNOWN_ERROR;
};

/**
 * Generates user-friendly error messages based on error type
 * @param {string} errorType - The categorized error type
 * @returns {object} - Object with title and message
 */
export const getErrorMessage = (errorType) => {
  const messages = {
    [ERROR_TYPES.NETWORK_ERROR]: {
      title: "Connection Problem",
      message: "We're having trouble connecting to our servers. Please check your internet connection and try again.",
      emoji: "🌐"
    },
    [ERROR_TYPES.DATA_ERROR]: {
      title: "Data Loading Issue",
      message: "We encountered a problem while loading your delicious food data. Don't worry, your order is safe!",
      emoji: "📊"
    },
    [ERROR_TYPES.PERMISSION_ERROR]: {
      title: "Access Restricted",
      message: "It looks like you don't have permission to access this part of our kitchen. Please log in or contact support.",
      emoji: "🔒"
    },
    [ERROR_TYPES.COMPONENT_ERROR]: {
      title: "Interface Hiccup",
      message: "One of our interface components had a little hiccup. We're working on getting it back to perfect condition!",
      emoji: "🔧"
    },
    [ERROR_TYPES.UNKNOWN_ERROR]: {
      title: "Unexpected Issue",
      message: "Something unexpected happened in our kitchen. Our chefs are investigating this mystery ingredient!",
      emoji: "❓"
    }
  };

  return messages[errorType] || messages[ERROR_TYPES.UNKNOWN_ERROR];
};

/**
 * Logs errors to external services (placeholder for future implementation)
 * @param {Error} error - The error object
 * @param {object} errorInfo - Additional error information
 * @param {string} errorType - The categorized error type
 */
export const logErrorToService = (error, errorInfo, errorType) => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 Error Boundary Log');
    console.error('Error Type:', errorType);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Timestamp:', new Date().toISOString());
    console.error('User Agent:', navigator.userAgent);
    console.error('URL:', window.location.href);
    console.groupEnd();
  }

  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production') {
    try {
      // Example: Send to Sentry, LogRocket, or custom error service
      // Replace this with your preferred error reporting service
      
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorType,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: localStorage.getItem('userId') || 'anonymous', // If you track users
      };

      // Example API call (uncomment and modify based on your service)
      // fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData)
      // });

      // Example Sentry integration (if using Sentry)
      // if (window.Sentry) {
      //   window.Sentry.captureException(error, {
      //     tags: { errorType },
      //     contexts: { errorInfo }
      //   });
      // }

    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }
};

/**
 * Creates a standardized error object for consistent handling
 * @param {Error} originalError - The original error
 * @param {object} errorInfo - Additional React error info
 * @returns {object} - Standardized error object
 */
export const createStandardError = (originalError, errorInfo) => {
  const errorType = categorizeError(originalError);
  const { title, message, emoji } = getErrorMessage(errorType);

  return {
    originalError,
    errorInfo,
    type: errorType,
    title,
    message,
    emoji,
    timestamp: new Date().toISOString(),
    id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
};

/**
 * Checks if an error should trigger a retry
 * @param {Error} error - The error object
 * @returns {boolean} - Whether retry is recommended
 */
export const isRetryableError = (error) => {
  const errorType = categorizeError(error);
  
  // Network and data errors are typically retryable
  return [ERROR_TYPES.NETWORK_ERROR, ERROR_TYPES.DATA_ERROR].includes(errorType);
};

/**
 * Generates retry delay based on attempt number (exponential backoff)
 * @param {number} attemptNumber - The current retry attempt (starting from 1)
 * @returns {number} - Delay in milliseconds
 */
export const getRetryDelay = (attemptNumber) => {
  const baseDelay = 1000; // 1 second
  const maxDelay = 10000; // 10 seconds
  const delay = Math.min(baseDelay * Math.pow(2, attemptNumber - 1), maxDelay);
  
  // Add some jitter to avoid thundering herd
  const jitter = Math.random() * 0.1 * delay;
  return delay + jitter;
};

/**
 * Browser and device information for error context
 * @returns {object} - Device and browser info
 */
export const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenResolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString()
  };
};
