import { useState } from 'react';
import analytics from 'services/analytics';

const ErrorBoundary = (props) => {
  const [hasError, setHasError] = useState();
  const [error, setError] = useState();
  const [errorInfo, setErrorInfo] = useState();

  const getDerivedStateFromError = (error) => {
    setHasError(true);
    setError(error);
    setErrorInfo(error.details);
  };

  if (process.env.NODE_ENV === 'production' && hasError) {
    analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
  }

  return hasError ? <h1>Error</h1> : props.children;
};

export default ErrorBoundary;
