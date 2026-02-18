/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          ),
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Check if the input is a fuzzy match for the target
 * @param input value to check
 * @param target correct value
 */
export function isFuzzyMatch(input: string, target: string): boolean {
  if (!input || !target) return false;

  const normInput = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const normTarget = target
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  // 1. Direct match check
  if (normInput.includes(normTarget)) return true;

  // 2. Levenshtein distance check
  const distance = levenshtein(normInput, normTarget);
  const len = normTarget.length;

  // Adaptive threshold
  // Short words (<= 3 chars): must be exact (distance 0) or very close handled by includes?
  // Actually "two" -> "to" (dist 1). "one" -> "won" (dist 2).
  // Let's be generous but careful.

  if (len <= 3) return distance <= 0; // Strict for short words to avoid false positives?
  // Wait, "Two" vs "To" is distance 1.
  // "Six" vs "Sex" (oops) distance 1.
  // Maybe allow distance 1 for length 3 if strictly phonetic?
  // Let's stick to distance <= 1 for length 4-5.

  if (len <= 5) return distance <= 1;
  if (len <= 8) return distance <= 2;
  return distance <= 3;
}
