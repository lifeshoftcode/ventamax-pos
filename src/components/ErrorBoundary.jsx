import React from 'react';
import { fbRecordError } from '../firebase/errors/fbRecordError';
import { selectUser } from '../features/auth/userSlice';
import { useSelector } from 'react-redux';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to Firebase
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Record error if we have user context
    if (this.props.user) {
      fbRecordError(this.props.user, error.stack, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Algo salió mal</h2>
          <p>Se ha producido un error inesperado. Nuestro equipo ha sido notificado.</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Intentar de nuevo
          </button>
          {import.meta.env?.DEV && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Detalles del error (desarrollo)</summary>
              <pre style={{ color: 'red' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide user context
export const ErrorBoundaryWithUser = ({ children }) => {
  const user = useSelector(selectUser);
  
  return (
    <ErrorBoundary user={user}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;