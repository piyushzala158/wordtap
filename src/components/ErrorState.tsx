import type { ReactNode } from 'react';

interface ErrorStateProps {
  message: string;
  action?: ReactNode;
}

function ErrorState({ message, action }: ErrorStateProps): JSX.Element {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
      <p className="text-sm font-medium">{message}</p>
      {action}
    </div>
  );
}

export default ErrorState;
