
export function extractKeywords(text) {
  if (!text) return [];

  const words = text.toLowerCase().match(/[a-zA-Z]+/g);
  if (!words) return [];

  const commonWords = new Set([
    "and", "or", "the", "is", "in", "of", "to", "for", "with"
  ]);

  const filtered = words.filter((w) => !commonWords.has(w));

  return [...new Set(filtered)];
}
