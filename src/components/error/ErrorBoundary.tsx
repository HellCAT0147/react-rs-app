import { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface ErrorState {
  isError: boolean;
}

interface Props {
  children?: ReactNode;
}

class ErrorBoundary extends Component<Props, ErrorState> {
  public constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }
  componentDidCatch(): void {
    this.setState({ isError: true });
  }
  render(): ReactNode {
    if (this.state.isError)
      return (
        <h2 className={styles.manualError}>
          Managed error. It is ok, just refresh the page :)
        </h2>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
