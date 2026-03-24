const WORD_PATTERN = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;
const SENTENCE_END_PATTERN = /[.!?]+$/;

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

export function splitParagraphWithSentenceContext(paragraph) {
  const tokens = splitParagraph(paragraph).map((token) => ({ ...token }));
  const sentenceTokenIndexes = [];
  let sentenceBuffer = '';

  function flushSentence() {
    const sentence = sentenceBuffer.trim();

    if (!sentence) {
      sentenceTokenIndexes.length = 0;
      sentenceBuffer = '';
      return;
    }

    sentenceTokenIndexes.forEach((tokenIndex) => {
      tokens[tokenIndex].sentence = sentence;
    });

    sentenceTokenIndexes.length = 0;
    sentenceBuffer = '';
  }

  tokens.forEach((token, index) => {
    sentenceBuffer += token.value;

    if (token.type === 'word') {
      sentenceTokenIndexes.push(index);
    }

    if (token.type === 'punctuation' && SENTENCE_END_PATTERN.test(token.value)) {
      flushSentence();
    }
  });

  flushSentence();

  return tokens;
}
