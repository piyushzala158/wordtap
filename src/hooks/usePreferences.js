import { useEffect, useState } from 'react';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LEVEL,
  STORAGE_KEYS,
} from '../constants/preferences';

export function usePreferences() {
  const [preferredLanguage, setPreferredLanguage] = useState(DEFAULT_LANGUAGE);
  const [difficultyLevel, setDifficultyLevel] = useState(DEFAULT_LEVEL);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEYS.language);
    const savedLevel = window.localStorage.getItem(STORAGE_KEYS.level);

    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
    }

    if (savedLevel) {
      setDifficultyLevel(savedLevel);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.language, preferredLanguage);
  }, [preferredLanguage]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.level, difficultyLevel);
  }, [difficultyLevel]);

  return {
    preferredLanguage,
    setPreferredLanguage,
    difficultyLevel,
    setDifficultyLevel,
  };
}
