import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <p className="text-red-400 mb-2">3D Graphics Unavailable</p>
            <p className="text-gray-400 text-sm">Your browser may not support WebGL or 3D graphics.</p>
            <p className="text-gray-500 text-xs mt-2">Try using a modern browser like Chrome, Firefox, or Edge.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
