import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  public props!: { children: React.ReactNode };
  public state: { hasError: boolean; error: Error | null };
  
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Something went wrong on this page
            </h2>
            <p className="text-red-600 mb-4">
              We hit an unexpected error. Try reloading or starting over.
            </p>
            <details className="text-left text-xs text-gray-600 bg-white p-3 rounded mb-4">
              <summary className="cursor-pointer font-medium">
                Technical details (for support)
              </summary>
              <pre className="mt-2 overflow-auto text-xs">
                {this.state.error?.message}
                {"\n\n"}
                {this.state.error?.stack}
              </pre>
            </details>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear & Restart
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;
