import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LEVEL,
  STORAGE_KEYS,
} from '../constants/preferences';
import type { DifficultyLevel } from '../types/api';

interface UsePreferencesResult {
  preferredLanguage: string;
  setPreferredLanguage: Dispatch<SetStateAction<string>>;
  difficultyLevel: DifficultyLevel;
  setDifficultyLevel: Dispatch<SetStateAction<DifficultyLevel>>;
}

export function usePreferences(): UsePreferencesResult {
  const [preferredLanguage, setPreferredLanguage] = useState(DEFAULT_LANGUAGE);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(DEFAULT_LEVEL);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEYS.language);
    const savedLevel = window.localStorage.getItem(STORAGE_KEYS.level);

    if (savedLanguage) {
      setPreferredLanguage(savedLanguage);
    }

    if (savedLevel) {
      setDifficultyLevel(savedLevel as DifficultyLevel);
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
