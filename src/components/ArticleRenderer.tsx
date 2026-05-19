import {
  splitIntoParagraphs,
  splitParagraphWithSentenceContext,
  type TokenWithSentence,
} from '../utils/articleTokens';

interface ArticleRendererProps {
  article: string;
  activeWord: string | null;
  clickedWords: Set<string>;
  onWordClick: (word: string, sentenceContext: string, element: HTMLButtonElement) => void;
}

function ArticleRenderer({
  article,
  activeWord,
  clickedWords,
  onWordClick,
}: ArticleRendererProps): JSX.Element {
  const paragraphs = splitIntoParagraphs(article);

  return (
    <div className="space-y-6 text-lg leading-9 text-stone-800">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const tokens = splitParagraphWithSentenceContext(paragraph);

        return (
          <p key={`${paragraphIndex}-${paragraph.slice(0, 20)}`} className="whitespace-pre-wrap">
            {tokens.map((token: TokenWithSentence, tokenIndex) => {
              if (token.type === 'space') {
                return (
                  <span key={`${paragraphIndex}-${tokenIndex}`} aria-hidden="true">
                    {token.value}
                  </span>
                );
              }

              if (token.type === 'punctuation') {
                return (
                  <span key={`${paragraphIndex}-${tokenIndex}`} className="text-stone-500">
                    {token.value}
                  </span>
                );
              }

              const isActive =
                activeWord !== null && activeWord.toLowerCase() === token.value.toLowerCase();
              const isClicked = clickedWords.has(token.value.toLowerCase());

              return (
                <button
                  key={`${paragraphIndex}-${tokenIndex}-${token.value}`}
                  type="button"
                  onClick={(event) =>
                    onWordClick(token.value, token.sentence || paragraph, event.currentTarget)
                  }
                  className={`word-chip inline rounded-lg px-1.5 py-0.5 text-left focus:outline-none focus:ring-2 focus:ring-ember/30 ${
                    isActive
                      ? 'bg-amber-200/80 text-ink shadow-sm'
                      : isClicked
                        ? 'bg-white/70 text-pine'
                        : 'text-stone-900 hover:bg-white/70 hover:text-pine'
                  }`}
                >
                  {token.value}
                </button>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default ArticleRenderer;
