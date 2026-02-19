import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Universal Speech Hook
 * - Uses Web Speech API when available
 * - Falls back to Audio TTS on unsupported browsers (Huawei, WebView)
 */
export function useSpeech() {
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
        `https://api.streamelements.com/kappa/v2/speech?voice=Salli&text=${encodeURIComponent(
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
            if (!hasStarted) {
              window.speechSynthesis.cancel(); // Critical to reset state on error
              playAudioFallback(text, onEnd);
            }
          };

          // Voice Selection: Prioritize clear, high-quality voices
          const findVoice = () => {
            // 1. Google US English (Extremely clear)
            const googleVoice = voices.find(
              (v) => v.lang === "en-US" && v.name.includes("Google")
            );
            if (googleVoice) return googleVoice;

            // 2. Samantha or Victoria (High quality macOS)
            const premiumFemale = voices.find(
              (v) => 
                v.lang.startsWith("en") && 
                (v.name.includes("Samantha") || v.name.includes("Victoria") || v.name.includes("Premium"))
            );
            if (premiumFemale) return premiumFemale;

            // 3. Fallback to any US English
            return voices.find((v) => v.lang === "en-US") || 
                   voices.find((v) => v.lang.startsWith("en"));
          };

          const voice = findVoice();
          if (voice) expression.voice = voice;

          expression.lang = "en-US";
          expression.rate = rate;

          // Reset state and add a tiny delay to prevent race conditions in Chromium
          window.speechSynthesis.cancel();
          
          setTimeout(() => {
            window.speechSynthesis.speak(expression);
          }, 10);
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
