const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

function analyzeSentiment(text) {
  const tokens = tokenizer.tokenize(text || '');
  const score = analyzer.getSentiment(tokens);

  let label = 'neutral';
  if (score > 0) label = 'positive';
  else if (score < 0) label = 'negative';

  return { score, label };
}

module.exports = analyzeSentiment;
