import { useCallback, useRef, useEffect } from "react";

export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Function to unlock audio on mobile
  const unlockAudio = useCallback(() => {
    if ("speechSynthesis" in window) {
      // Create a silent utterance to unlock the speech engine
      const silent = new SpeechSynthesisUtterance("");
      silent.volume = 0;
      window.speechSynthesis.speak(silent);
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void, rate = 0.9) => {
    if (!("speechSynthesis" in window)) return;

    // Some mobile browsers require explicit resume
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    // Keep reference to prevent GC on mobile
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Basic cleanup
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { speak, cancel, unlockAudio };
}
