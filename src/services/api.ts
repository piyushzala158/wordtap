import { env } from '../config/env.js';
import type {
  GenerateArticleRequest,
  GenerateArticleResponse,
  TranslateWordRequest,
  TranslationResponse,
} from '../types/api';

async function request<TResponse>(path: string, options: RequestInit): Promise<TResponse> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload && typeof payload === 'object' && 'error' in payload
        ? String(payload.error)
        : 'Something went wrong.',
    );
  }

  return payload as TResponse;
}

export function generateArticle(
  body: GenerateArticleRequest,
): Promise<GenerateArticleResponse> {
  return request<GenerateArticleResponse>('/api/article', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function translateWord(body: TranslateWordRequest): Promise<TranslationResponse> {
  return request<TranslationResponse>('/api/translate', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
