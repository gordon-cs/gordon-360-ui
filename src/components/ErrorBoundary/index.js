import React from 'react';

/**
 * This is a wrapper class for the main app.js until React provides a hook alternative to
 * componentDidCatch()
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      this.state.props.analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }

    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
