import { Component } from 'react';
import analytics from 'services/analytics';
import GordonError from 'components/Error';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production' && this.state.hasError) {
      analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }

    return {
      error: error,
      errorInfo: errorInfo,
    };
  }

  render() {
    return this.state.hasError ? <GordonError /> : this.props.children;
  }
}
