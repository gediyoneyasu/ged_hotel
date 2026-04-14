import React from 'react';

/**
 * Catches render errors so production (e.g. Vercel) does not show a blank white page silently.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      const msg = this.state.error?.message || String(this.state.error);
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '24px',
            fontFamily: 'system-ui, sans-serif',
            background: '#1a1a1a',
            color: '#eee',
            boxSizing: 'border-box',
          }}
        >
          <h1 style={{ color: '#c9a66b', marginBottom: 16 }}>Something went wrong</h1>
          <p style={{ marginBottom: 12, opacity: 0.9 }}>
            The app hit a runtime error. Open the browser console (F12) for details, or redeploy with
            the latest code.
          </p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              background: '#111',
              padding: 16,
              borderRadius: 8,
              fontSize: 13,
              border: '1px solid #333',
            }}
          >
            {msg}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 20,
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: '#c9a66b',
              color: '#1a1a1a',
              fontWeight: 600,
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
