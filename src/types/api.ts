export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GenerateArticleRequest {
  topic: string;
  level: DifficultyLevel;
}

export interface GenerateArticleResponse {
  article: string;
}

export interface TranslateWordRequest {
  word: string;
  sentenceContext: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  surfaceWord: string;
  baseWord: string;
  isContextSensitive: boolean;
  translation: string;
  originalWordInTargetScript?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  similarWords?: string[];
  oppositeWords?: string[];
}

export interface ReaderLocationState {
  article: string;
  topic: string;
  difficultyLevel: DifficultyLevel;
  preferredLanguage: string;
}

export interface TooltipAnchor {
  word: string;
  sentenceContext: string;
  x: number;
  y: number;
  element: HTMLButtonElement;
}
