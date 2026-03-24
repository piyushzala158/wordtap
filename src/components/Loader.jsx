function Loader({ label = 'Loading...' }) {
  return (
    <div className="inline-flex items-center gap-3 text-sm font-medium text-stone-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-ember" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
