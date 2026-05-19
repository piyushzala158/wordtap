import type { DifficultyLevel } from '../types/api';

export const DEFAULT_LANGUAGE = 'Gujarati';
export const DEFAULT_LEVEL: DifficultyLevel = 'beginner';

export const STORAGE_KEYS = {
  language: 'wordtap.preferredLanguage',
  level: 'wordtap.difficultyLevel',
};

export const LEVEL_OPTIONS: Array<{ value: DifficultyLevel; label: string }> = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const LANGUAGE_OPTIONS: string[] = [
  'Gujarati',
  'Hindi',
  'Spanish',
  'French',
  'German',
];
