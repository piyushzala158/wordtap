import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { TooltipAnchor, TranslationResponse } from '../types/api';
import Loader from './Loader';

interface TooltipProps {
  anchor: TooltipAnchor | null;
  data: TranslationResponse | null;
  loading: boolean;
  error: string;
  onClose: () => void;
}

function Tooltip({ anchor, data, loading, error, onClose }: TooltipProps): JSX.Element | null {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!anchor) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent): void {
      const target = event.target as Node | null;

      if (
        target &&
        tooltipRef.current &&
        !tooltipRef.current.contains(target) &&
        !anchor.element.contains(target)
      ) {
        onClose();
      }
    }

    function handleViewportChange(): void {
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

  const style: CSSProperties = {
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
        {!loading && error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && data ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-ink">{data.translation}</p>
            {data.originalWordInTargetScript ? (
              <p className="text-sm text-stone-600">
                English word in your script:{' '}
                <span className="font-medium">{data.originalWordInTargetScript}</span>
              </p>
            ) : null}
            {data.partOfSpeech ? (
              <p className="text-sm text-stone-600">
                Part of speech: <span className="font-medium">{data.partOfSpeech}</span>
              </p>
            ) : null}
            {data.similarWords?.length ? (
              <p className="text-sm text-stone-600">
                Similar words: <span className="font-medium">{data.similarWords.join(', ')}</span>
              </p>
            ) : null}
            {data.oppositeWords?.length ? (
              <p className="text-sm text-stone-600">
                Opposite words:{' '}
                <span className="font-medium">{data.oppositeWords.join(', ')}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tooltip;
