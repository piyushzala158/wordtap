const WORD_PATTERN = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;
const SENTENCE_END_PATTERN = /[.!?]+$/;

export type Token =
  | { type: 'space'; value: string }
  | { type: 'word'; value: string }
  | { type: 'punctuation'; value: string };

export type TokenWithSentence = Token & { sentence?: string };

export function splitParagraph(paragraph: string): Token[] {
  return paragraph.split(/(\s+)/).flatMap((segment) => {
    if (!segment) {
      return [];
    }

    if (/^\s+$/.test(segment)) {
      return [{ type: 'space', value: segment }];
    }

    return (
      segment.match(/[A-Za-z]+(?:['-][A-Za-z]+)*|[^A-Za-z\s]+/g)?.map(
        (token): Token => ({
          type: WORD_PATTERN.test(token) ? 'word' : 'punctuation',
          value: token,
        }),
      ) || [{ type: 'punctuation', value: segment }]
    );
  });
}

export function splitIntoParagraphs(article: string): string[] {
  return article
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function normalizeWord(word: string): string {
  return word.toLowerCase();
}

export function splitParagraphWithSentenceContext(paragraph: string): TokenWithSentence[] {
  const tokens: TokenWithSentence[] = splitParagraph(paragraph).map((token) => ({ ...token }));
  const sentenceTokenIndexes: number[] = [];
  let sentenceBuffer = '';

  function flushSentence(): void {
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
