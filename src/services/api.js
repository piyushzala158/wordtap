import { env } from '../config/env.js';

async function request(path, options) {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || 'Something went wrong.');
  }

  return payload;
}

export function generateArticle(body) {
  return request('/api/article', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function translateWord(body) {
  return request('/api/translate', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
