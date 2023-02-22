import GordonError from 'components/Error/Error';
import { Component } from 'react';
import analytics from 'services/analytics';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.NODE_ENV === 'production' && this.state.hasError) {
      analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }
  }

  render() {
    return this.state.hasError ? <GordonError error={this.state.error} /> : this.props.children;
  }
}
