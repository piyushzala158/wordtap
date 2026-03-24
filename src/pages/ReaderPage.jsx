import { useMemo, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import ArticleRenderer from '../components/ArticleRenderer';
import ErrorState from '../components/ErrorState';
import Tooltip from '../components/Tooltip';
import { DEFAULT_LANGUAGE } from '../constants/preferences';
import { translateWord } from '../services/api';
import { normalizeWord } from '../utils/articleTokens';

function ReaderPage() {
  const location = useLocation();
  const translationCache = useRef(new Map());
  const [activeWord, setActiveWord] = useState(null);
  const [tooltipAnchor, setTooltipAnchor] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipError, setTooltipError] = useState('');
  const [loadingWord, setLoadingWord] = useState(false);
  const [clickedWords, setClickedWords] = useState(() => new Set());

  const article = location.state?.article;
  const topic = location.state?.topic || '';
  const difficultyLevel = location.state?.difficultyLevel || 'beginner';
  const preferredLanguage = location.state?.preferredLanguage || DEFAULT_LANGUAGE;

  const articleMeta = useMemo(
    () => ({
      title: topic ? topic : 'Today’s reading',
      level: difficultyLevel,
      language: preferredLanguage,
    }),
    [difficultyLevel, preferredLanguage, topic],
  );

  if (!article) {
    return <Navigate to="/" replace />;
  }

  async function handleWordClick(word, sentenceContext, element) {
    const normalized = normalizeWord(word);
    const normalizedSentence = sentenceContext.trim().toLowerCase();
    const cacheKey = `${normalized}:${preferredLanguage.toLowerCase()}:${normalizedSentence}`;
    const rect = element.getBoundingClientRect();

    setActiveWord(word);
    setTooltipAnchor({
      word,
      sentenceContext,
      x: rect.left + rect.width / 2,
      y: rect.top,
      element,
    });
    setTooltipError('');
    setClickedWords((previous) => new Set(previous).add(normalized));

    const cached = translationCache.current.get(cacheKey);
    if (cached) {
      setTooltipData(cached);
      setLoadingWord(false);
      return;
    }

    setTooltipData(null);
    setLoadingWord(true);

    try {
      const response = await translateWord({
        word,
        sentenceContext,
        targetLanguage: preferredLanguage,
      });

      translationCache.current.set(cacheKey, response);
      setTooltipData(response);
    } catch (requestError) {
      setTooltipError(requestError.message || 'Unable to translate that word.');
    } finally {
      setLoadingWord(false);
    }
  }

  function closeTooltip() {
    setTooltipAnchor(null);
    setTooltipData(null);
    setTooltipError('');
    setLoadingWord(false);
    setActiveWord(null);
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8 lg:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-paper backdrop-blur sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex text-sm font-semibold text-ember transition hover:text-amber-700"
            >
              ← Generate another article
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {articleMeta.level} level · {articleMeta.language}
              </p>
              <h1 className="mt-2 font-display text-4xl capitalize text-ink">
                {articleMeta.title}
              </h1>
            </div>
          </div>
          <p className="max-w-lg text-sm leading-7 text-stone-600">
            Tap any word to see a quick translation tooltip without leaving the article.
          </p>
        </div>

        <section className="rounded-[2rem] border border-stone-200/80 bg-white/80 p-6 shadow-paper backdrop-blur sm:p-10">
          <ArticleRenderer
            article={article}
            activeWord={activeWord}
            clickedWords={clickedWords}
            onWordClick={handleWordClick}
          />
        </section>

        <section className="rounded-[2rem] border border-stone-200/80 bg-white/65 p-5 text-sm text-stone-600 shadow-sm">
          <p className="font-semibold text-ink">Reading tip</p>
          <p className="mt-1 leading-7">
            Try reading one paragraph first, then tap only the words you truly need.
            That keeps comprehension strong while still building vocabulary.
          </p>
        </section>

        {tooltipError && !tooltipAnchor ? <ErrorState message={tooltipError} /> : null}
      </div>

      <Tooltip
        anchor={tooltipAnchor}
        data={tooltipData}
        loading={loadingWord}
        error={tooltipError}
        onClose={closeTooltip}
      />
    </main>
  );
}

export default ReaderPage;
