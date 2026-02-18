import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#1a1a1a] border border-red-500/20 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Something went wrong
            </h1>

            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 overflow-auto max-h-48 text-left">
              <p className="text-red-400 font-mono text-xs break-all">
                {this.state.error?.message || "Unknown error occurred"}
              </p>
            </div>

            <p className="text-neutral-400 text-sm">
              We're sorry for the inconvenience. Please try reloading the page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <RefreshCw size={20} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
