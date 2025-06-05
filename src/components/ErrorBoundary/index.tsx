import GordonError from 'components/Error';
import { Component, ErrorInfo, ReactNode } from 'react';
import analytics from 'services/analytics';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'production' && this.state.hasError) {
      analytics.onError(`${error.toString()} ${errorInfo.componentStack}`);
    }
  }

  render() {
    return this.state.hasError ? <GordonError error={this.state.error} /> : this.props.children;
  }
}

export default ErrorBoundary;
