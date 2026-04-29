export const validateWriting = (input: string, errorCount: number = 0) => {
  // 1. Detect segments by punctuation or newlines
  const segments = input.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 2);
  
  // 2. Word count fallback (in case they write a long paragraph without dots)
  // Every 8 words counts as a sentence/line
  const words = input.trim().split(/\s+/).filter(w => w.length > 0);
  const wordScore = Math.floor(words.length / 7); 

  const effectiveSegments = Math.max(segments.length, wordScore);
  
  let currentScore = 0;
  let currentFeedback: string[] = [];

  // 3. Score calculation (max 5 points)
  const segmentPoints = Math.min(effectiveSegments, 5);
  currentScore += segmentPoints;
  
  if (effectiveSegments >= 5) {
    currentFeedback.push(`Great job! You've written enough content (+5 points)`);
  } else if (effectiveSegments > 0) {
    currentFeedback.push(`Content Progress: ${effectiveSegments} of 5 required sentences (+${effectiveSegments} points)`);
  } else {
    currentFeedback.push("Please write at least 5 sentences or lines.");
  }

  // 2. AI Error Penalty (0.1 per error)
  if (errorCount > 0) {
    const penalty = errorCount * 0.1;
    currentScore -= penalty;
    currentFeedback.push(`AI Analysis Penalty: -${penalty.toFixed(1)} for grammar/spelling errors`);
  }

  return {
    score: Math.max(0, currentScore),
    feedback: currentFeedback
  };
};
