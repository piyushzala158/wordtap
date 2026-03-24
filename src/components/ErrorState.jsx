function ErrorState({ message, action }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm">
      <p className="text-sm font-medium">{message}</p>
      {action}
    </div>
  );
}

export default ErrorState;
