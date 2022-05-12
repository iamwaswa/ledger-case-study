import type { OrNull } from "~/types";
import { Component, ErrorInfo, ReactNode } from "react";

interface IErrorBoundaryProps {
  children: React.ReactNode;
  renderError?(error: Error): JSX.Element;
}

interface IErrorBoundaryState {
  error: OrNull<Error>;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    // * The object returned here will update state
    // * so that in the next render cycle the error
    // * will be present in state.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error);
    console.log(errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        this.props.renderError?.(this.state.error) ?? (
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        )
      );
    }

    return this.props.children;
  }
}
