import { useCallback, useRef, useEffect, useState } from "react";

export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        try {
          const vs = window.speechSynthesis.getVoices();
          setVoices(vs);
        } catch (e) {
          console.error("Failed to load voices:", e);
        }
      };

      loadVoices();

      try {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } catch (e) {
        console.error("Failed to set onvoiceschanged:", e);
      }
    }
  }, []);

  // Function to unlock audio on mobile
  const unlockAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        // Create a silent utterance to unlock the speech engine
        const silent = new SpeechSynthesisUtterance("");
        silent.volume = 0;
        window.speechSynthesis.speak(silent);
        window.speechSynthesis.cancel();
      } catch (e) {
        console.error("Failed to unlock audio:", e);
      }
    }
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void, rate = 0.9) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window))
        return;

      try {
        // Cancel current speech first
        window.speechSynthesis.cancel();
      } catch (e) {
        console.error("Failed to cancel speech:", e);
      }

      // Small timeout to allow cancel to complete (crucial for some Android devices)
      setTimeout(() => {
        try {
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
        } catch (e) {
          console.error("Failed to speak:", e);
          // If speaking fails, call onEnd immediately so the UI doesn't get stuck
          if (onEnd) onEnd();
        }
      }, 50);
    },
    [voices],
  );

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.error("Failed to cancel:", e);
      }
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
