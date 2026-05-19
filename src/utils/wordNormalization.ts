interface NormalizedWordForms {
  normalizedWord: string;
  baseWordGuess: string;
}

function stripOuterPunctuation(word: string): string {
  return word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
}

function deriveBaseWord(word: string): string {
  if (word.endsWith('ies') && word.length > 4) {
    return `${word.slice(0, -3)}y`;
  }

  if (word.endsWith('ing') && word.length > 5) {
    const stem = word.slice(0, -3);
    if (/(.)\1$/.test(stem)) {
      return stem.slice(0, -1);
    }
    return stem;
  }

  if (word.endsWith('ed') && word.length > 4) {
    const stem = word.slice(0, -2);
    if (/(.)\1$/.test(stem)) {
      return stem.slice(0, -1);
    }
    return stem;
  }

  if (word.endsWith('es') && word.length > 4) {
    return word.slice(0, -2);
  }

  if (word.endsWith('s') && word.length > 3) {
    return word.slice(0, -1);
  }

  return word;
}

export function normalizeWordForms(rawWord: string): NormalizedWordForms {
  const normalizedWord = stripOuterPunctuation(rawWord.trim().toLowerCase());
  const baseWordGuess = deriveBaseWord(normalizedWord);

  return {
    normalizedWord,
    baseWordGuess: baseWordGuess || normalizedWord,
  };
}
