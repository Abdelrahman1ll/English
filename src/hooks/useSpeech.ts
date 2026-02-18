import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Universal Speech Hook
 * - Uses Web Speech API when available
 * - Falls back to Audio TTS on unsupported browsers (Huawei, WebView)
 */
export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // ----------------------------
  // Load voices (Chrome / Safari)
  // ----------------------------
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length) setVoices(list);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // ----------------------------------
  // Audio fallback (Huawei-safe)
  // ----------------------------------
  const playAudioFallback = useCallback((text: string, onEnd?: () => void) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(
        `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(
          text,
        )}`,
      );

      audio.onended = onEnd ?? null;
      audio.onerror = () => onEnd?.();

      audioRef.current = audio;
      audio.play();
    } catch {
      onEnd?.();
    }
  }, []);

  // ----------------------------
  // Stop/Cancel everything
  // ----------------------------
  const stop = useCallback(() => {
    try {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    } catch {
      // Ignore errors during cancellation
    }
  }, []);

  // Alias cancel to stop for backward compatibility
  const cancel = stop;

  // ----------------------------------
  // Main speak function (SAFE)
  // ----------------------------------
  const speak = useCallback(
    (text: string, onEnd?: () => void, rate = 0.9) => {
      if (!text) return;

      // Stop any existing playback first
      stop();

      // Try Web Speech API first
      if ("speechSynthesis" in window) {
        try {
          const expression = new SpeechSynthesisUtterance(text);
          let hasStarted = false;

          // Timeout fallback - only if it really doesn't start
          const fallbackTimeout = setTimeout(() => {
            if (!hasStarted) {
              console.log("SpeechSynthesis failed to start, falling back.");
              playAudioFallback(text, onEnd);
            }
          }, 1500); // 1.5s is a good balance

          expression.onstart = () => {
            hasStarted = true;
            clearTimeout(fallbackTimeout);
          };

          expression.onend = () => {
            onEnd?.();
          };

          expression.onerror = (e) => {
            console.error("SpeechSynthesis error:", e);
            clearTimeout(fallbackTimeout);
            if (!hasStarted) playAudioFallback(text, onEnd);
          };

          // Enhanced Voice Selection:
          // We want ONE natural voice. Let's prefer Google US English Male/Female 
          // or Samantha/Daniel depending on availability.
          const findVoice = () => {
            // First choice: Google Natural/Premium English
            const premiumMatch = voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Premium") ||
                  v.name.includes("Natural") ||
                  v.name.includes("Google"))
            );
            if (premiumMatch) return premiumMatch;

            // Second choice: Samantha or Daniel (High quality macOS)
            const samanthaDaniel = voices.find(
              (v) => v.name.includes("Samantha") || v.name.includes("Daniel")
            );
            if (samanthaDaniel) return samanthaDaniel;

            // Third choice: Any US English
            const enUSMatch = voices.find((v) => v.lang === "en-US");
            if (enUSMatch) return enUSMatch;

            return voices.find((v) => v.lang.startsWith("en"));
          };

          const voice = findVoice();
          if (voice) expression.voice = voice;

          expression.lang = "en-US";
          expression.rate = rate;

          utteranceRef.current = expression;
          window.speechSynthesis.speak(expression);
          return;
        } catch (err) {
          console.error("SpeechSynthesis setup failed:", err);
        }
      }

      // Fallback audio
      playAudioFallback(text, onEnd);
    },
    [voices, playAudioFallback, stop],
  );

  // Cleanup
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    speak,
    stop,
    cancel,
    voices,
  };
}
