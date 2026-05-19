import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import { LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '../constants/preferences';
import { usePreferences } from '../hooks/usePreferences';
import { generateArticle } from '../services/api';
import type { DifficultyLevel, ReaderLocationState } from '../types/api';

function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const {
    preferredLanguage,
    setPreferredLanguage,
    difficultyLevel,
    setDifficultyLevel,
  } = usePreferences();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { article } = await generateArticle({
        topic: topic.trim(),
        level: difficultyLevel,
      });

      const state: ReaderLocationState = {
        article,
        topic: topic.trim(),
        difficultyLevel,
        preferredLanguage,
      };

      navigate('/reader', { state });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to generate an article right now.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-12 sm:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-stone-300/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600 shadow-sm">
            Learn by reading, tap by curiosity
          </p>
          <div className="space-y-4">
            <h1 className="max-w-2xl font-display text-5xl leading-tight text-ink sm:text-6xl">
              WordTap turns every article into a live English lesson.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              Generate a fresh article, read at your pace, and tap any word for an instant
              translation in your language.
            </p>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-paper backdrop-blur sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-ink">AI-written reading</p>
              <p className="mt-1 text-sm text-stone-600">
                Articles stay simple, natural, and matched to your level.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Word-by-word help</p>
              <p className="mt-1 text-sm text-stone-600">
                Click any word and get a quick tooltip instead of losing your flow.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Your preferences saved</p>
              <p className="mt-1 text-sm text-stone-600">
                Language and difficulty stay ready each time you return.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-6 shadow-paper backdrop-blur sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700" htmlFor="topic">
                Topic (optional)
              </label>
              <input
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Travel, technology, food, or anything you like"
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-ink outline-none transition focus:border-ember focus:bg-white"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-700" htmlFor="difficulty">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficultyLevel}
                  onChange={(event) =>
                    setDifficultyLevel(event.target.value as DifficultyLevel)
                  }
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-ink outline-none transition focus:border-ember focus:bg-white"
                >
                  {LEVEL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-700" htmlFor="language">
                  Translation language
                </label>
                <select
                  id="language"
                  value={preferredLanguage}
                  onChange={(event) => setPreferredLanguage(event.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-ink outline-none transition focus:border-ember focus:bg-white"
                >
                  {LANGUAGE_OPTIONS.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-ink px-5 py-3 text-base font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <Loader label="Generating article..." /> : 'Generate Article'}
            </button>

            {error ? <ErrorState message={error} /> : null}
          </form>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
