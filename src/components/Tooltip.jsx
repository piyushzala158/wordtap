import { useEffect, useRef } from 'react';
import Loader from './Loader';

function Tooltip({ anchor, data, loading, error, onClose }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!anchor) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        !anchor.element?.contains(event.target)
      ) {
        onClose();
      }
    }

    function handleViewportChange() {
      onClose();
    }

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('scroll', handleViewportChange, true);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('scroll', handleViewportChange, true);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [anchor, onClose]);

  if (!anchor) {
    return null;
  }

  const style = {
    left: anchor.x,
    top: anchor.y,
    transform: 'translate(-50%, calc(-100% - 14px))',
  };

  return (
    <div
      ref={tooltipRef}
      style={style}
      className="fixed z-30 w-[min(280px,calc(100vw-24px))] rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-paper backdrop-blur"
    >
      <div className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 -translate-y-2 rotate-45 border-b border-r border-stone-200 bg-white/95" />
      <div className="relative space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          {anchor.word}
        </p>
        {loading ? <Loader label="Translating word..." /> : null}
        {!loading && error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : null}
        {!loading && !error && data ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-ink">{data.translation}</p>
            {data.pronunciation ? (
              <p className="text-sm text-stone-600">
                Pronunciation: <span className="font-medium">{data.pronunciation}</span>
              </p>
            ) : null}
            {data.partOfSpeech ? (
              <p className="text-sm text-stone-600">
                Part of speech: <span className="font-medium">{data.partOfSpeech}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tooltip;
