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

  // ----------------------------------
  // Main speak function (SAFE)
  // ----------------------------------
  const speak = useCallback(
    (text: string, onEnd?: () => void, rate = 0.9) => {
      if (!text) return;

      // Try Web Speech API first
      if ("speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(text);

          // Pick best English voice
          const voice =
            voices.find(
              (v) =>
                v.lang === "en-US" &&
                (v.name.includes("Google") || v.name.includes("Samantha")),
            ) || voices.find((v) => v.lang.startsWith("en"));

          if (voice) utterance.voice = voice;

          utterance.lang = "en-US";
          utterance.rate = rate;
          utterance.onend = onEnd ?? null;

          utteranceRef.current = utterance;
          window.speechSynthesis.speak(utterance);

          // 🔴 Huawei / broken engines detection
          setTimeout(() => {
            if (!window.speechSynthesis.speaking) {
              playAudioFallback(text, onEnd);
            }
          }, 1500);

          return;
        } catch {
          // fallback below
        }
      }

      // Fallback audio
      playAudioFallback(text, onEnd);
    },
    [voices, playAudioFallback],
  );

  // ----------------------------
  // Cancel everything
  // ----------------------------
  const cancel = useCallback(() => {
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

  // Cleanup
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return {
    speak,
    cancel,
  };
}
