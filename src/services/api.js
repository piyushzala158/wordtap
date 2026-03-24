const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
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
