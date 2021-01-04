import React from "react";

/* Components */
import ErrorPages from "~/Core/Modules/Error/Pages";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPages />
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
