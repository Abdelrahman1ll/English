import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Universal Speech Hook
 * - Prioritizes Professional ElevenLabs API (if key present)
 * - Uses Web Speech API with "Natural/Neural/Online" preference (Pro Free)
 * - Falls back to Google Translate Neural TTS (Stable Free Pro)
 * - Final fallback to High-Quality Audio TTS (Joanna)
 */
export function useSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // ----------------------------
  // Load voices (Chrome / Safari / Edge)
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
  // Audio fallback (AWS Polly via StreamElements)
  // ----------------------------------
  const playAudioFallback = useCallback(
    (text: string, onEnd?: () => void, rate = 0.7) => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        // Use "Joanna" instead of "Salli" for much better quality
        const audio = new Audio(
          `https://api.streamelements.com/kappa/v2/speech?voice=Joanna&text=${encodeURIComponent(
            text,
          )}`,
        );

        audio.playbackRate = rate;
        audio.onended = onEnd ?? null;
        audio.onerror = () => onEnd?.();

        audioRef.current = audio;
        audio.play();
      } catch {
        onEnd?.();
      }
    },
    [],
  );

  // ----------------------------------
  // Google Translate Neural TTS (Free Pro)
  // ----------------------------------
  const playGoogleTTS = useCallback(
    (text: string, onEnd?: () => void, rate = 0.7) => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
          text,
        )}&tl=en&client=tw-ob`;

        const audio = new Audio(url);
        audio.playbackRate = rate;
        audio.onended = onEnd ?? null;
        audio.onerror = () => {
          console.warn("Google TTS failed, using last resort fallback.");
          playAudioFallback(text, onEnd);
        };

        audioRef.current = audio;
        audio.play();
        return true;
      } catch {
        return false;
      }
    },
    [playAudioFallback],
  );

  // ----------------------------------
  // ElevenLabs Integration (Pro Quality)
  // ----------------------------------
  const playElevenLabs = useCallback(
    async (text: string, onEnd?: () => void) => {
      const apiKey = (import.meta as any).env.VITE_ELEVEN_LABS_API_KEY;
      const voiceId =
        (import.meta as any).env.VITE_ELEVEN_LABS_VOICE_ID ||
        "pNInz6ovClqMvhaAYqcH";

      if (!apiKey) return false;

      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "xi-api-key": apiKey,
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_monolingual_v1",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          },
        );

        if (!response.ok) throw new Error("ElevenLabs API error");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        audio.onended = () => {
          onEnd?.();
          URL.revokeObjectURL(url);
        };

        audioRef.current = audio;
        await audio.play();
        return true;
      } catch (err) {
        return false;
      }
    },
    [],
  );

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
    async (text: string, onEnd?: () => void, rate = 0.7) => {
      if (!text) return;

      // Stop any existing playback first
      stop();

      // 1. Try ElevenLabs (Highest Quality - Paid/Free Key)
      const elevenLabsSuccess = await playElevenLabs(text, onEnd);
      if (elevenLabsSuccess) return;

      // 2. Try Web Speech API (Local Neural/Natural Voices - Free Pro)
      if ("speechSynthesis" in window) {
        try {
          const expression = new SpeechSynthesisUtterance(text);
          let hasStarted = false;

          const fallbackTimeout = setTimeout(() => {
            if (!hasStarted) {
              playGoogleTTS(text, onEnd, rate);
            }
          }, 1500);

          expression.onstart = () => {
            hasStarted = true;
            clearTimeout(fallbackTimeout);
          };

          expression.onend = () => {
            onEnd?.();
          };

          expression.onerror = function () {
            clearTimeout(fallbackTimeout);
            if (!hasStarted) {
              window.speechSynthesis.cancel();
              playGoogleTTS(text, onEnd, rate);
            }
          };

          // EXTREME PRIORITY: Target only high-quality neural voices
          const findProVoice = () => {
            const list = window.speechSynthesis.getVoices();

            // A. Microsoft Natural (Edge) - The best free ones
            const edgeNatural = list.find(
              (v) =>
                v.lang.startsWith("en") &&
                v.name.toLowerCase().includes("natural"),
            );
            if (edgeNatural) return edgeNatural;

            // B. Google Online (Chrome) - Very good Wavenet-style
            const googleOnline = list.find(
              (v) =>
                v.lang.startsWith("en") &&
                v.name.toLowerCase().includes("google") &&
                v.name.toLowerCase().includes("online"),
            );
            if (googleOnline) return googleOnline;

            // C. Multi-platform Neural keywords
            const neuralAny = list.find(
              (v) =>
                v.lang.startsWith("en") &&
                v.name.toLowerCase().includes("neural"),
            );
            if (neuralAny) return neuralAny;

            // D. Premium OS Voices (macOS/iOS/Windows)
            const premiumAny = list.find(
              (v) =>
                v.lang.startsWith("en") &&
                v.name.toLowerCase().includes("premium"),
            );
            if (premiumAny) return premiumAny;

            // E. Best standard ones (Samantha, Joanna, Aria)
            const topStandard = list.find(
              (v) =>
                v.lang.startsWith("en") &&
                (v.name.includes("Samantha") ||
                  v.name.includes("Joanna") ||
                  v.name.includes("Aria")),
            );
            if (topStandard) return topStandard;

            return (
              list.find((v) => v.lang === "en-US") ||
              list.find((v) => v.lang.startsWith("en"))
            );
          };

          const voice = findProVoice();
          if (voice) expression.voice = voice;

          expression.lang = "en-US";
          expression.rate = rate;

          window.speechSynthesis.cancel();
          setTimeout(() => {
            window.speechSynthesis.speak(expression);
          }, 10);
          return;
        } catch (err) {
          // Fallback to Google
        }
      }

      // 3. Fallback to Google Neural TTS (Free stable API)
      playGoogleTTS(text, onEnd, rate);
    },
    [playElevenLabs, playGoogleTTS, stop],
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
