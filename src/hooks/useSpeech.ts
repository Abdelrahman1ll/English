import { useCallback, useRef, useEffect, useState } from "react";

export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      setVoices(vs);
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

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

  const speak = useCallback(
    (text: string, onEnd?: () => void, rate = 0.9) => {
      if (!("speechSynthesis" in window)) return;

      // Cancel current speech first
      window.speechSynthesis.cancel();

      // Small timeout to allow cancel to complete (crucial for some Android devices)
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a good English voice
        const voice = voices.find(
          (v) =>
            (v.name.includes("Google") && v.lang.includes("en-US")) ||
            (v.name.includes("Samantha") && v.lang.includes("en")) ||
            v.lang === "en-US",
        );

        if (voice) {
          utterance.voice = voice;
        }

        utterance.lang = "en-US";
        utterance.rate = rate;

        if (onEnd) {
          utterance.onend = onEnd;
        }

        // Keep reference to prevent GC on mobile
        utteranceRef.current = utterance;

        // Ensure we're not paused
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        window.speechSynthesis.speak(utterance);
      }, 50);
    },
    [voices],
  );

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
