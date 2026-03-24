const WORD_PATTERN = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;

export function splitParagraph(paragraph) {
  return paragraph.split(/(\s+)/).flatMap((segment) => {
    if (!segment) {
      return [];
    }

    if (/^\s+$/.test(segment)) {
      return [{ type: 'space', value: segment }];
    }

    return segment
      .match(/[A-Za-z]+(?:['-][A-Za-z]+)*|[^A-Za-z\s]+/g)
      ?.map((token) => ({
        type: WORD_PATTERN.test(token) ? 'word' : 'punctuation',
        value: token,
      })) || [{ type: 'punctuation', value: segment }];
  });
}

export function splitIntoParagraphs(article) {
  return article
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function normalizeWord(word) {
  return word.toLowerCase();
}
