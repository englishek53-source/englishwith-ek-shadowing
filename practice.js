/* ============================================================
   EnglishWith_EK — Pronunciation Match Fix
   ------------------------------------------------------------
   Loaded BEFORE the main inline script in index.html (see the
   <script src="practice.js"> tag just above it).

   index.html is large enough that its voice-practice tail sits
   beyond the file-editing window, so the two buggy functions
   are patched here instead. The patch installs on window "load"
   (after the main script has run and defined its globals) by
   REPLACING the global bindings — the click handlers look the
   functions up at runtime, so they pick up the fixed versions.

   1. setupRecognition():
      Chrome's Web Speech API delivers one FINAL transcript
      segment per spoken chunk ("Have you ever", then "looked at
      someone else's life", ...). The old onresult OVERWROTE
      recognizedText, so only the last chunk survived and every
      full-sentence take scored ~0% ("doesn't match") even when
      the sentence was said correctly. We append each final
      segment instead.

   2. showPracticeResults():
      Score word-by-word with matchWords() (same typo tolerance
      as wordsMatch) and highlight the target sentence —
      green = heard correctly, red = missed — so the % is
      transparent and always matches what the learner sees.
   ============================================================ */

window.addEventListener("load", function () {

  // Main script didn't define the expected globals — nothing to patch.
  if (typeof setupRecognition !== "function" || typeof showPracticeResults !== "function") {
    return;
  }

  /* ---------- Fixed recognizer: accumulate final segments ---------- */
  window.setupRecognition = function () {
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = true;   // stream partial text live — more reliable
    rec.maxAlternatives = 1;
    recognitionError = "";
    lastInterimText = "";

    rec.onstart = () => {
      console.log("[recog] started");
      setRecogStatus("🎙️ Listening…");
    };
    rec.onspeechstart = () => {
      console.log("[recog] speech detected");
      setRecogStatus("🗣️ Speaking — listening…");
    };
    rec.onaudiostart = () => console.log("[recog] audio captured");
    rec.onaudioend = () => console.log("[recog] audio capture ended");

    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) {
          // FIX: append each final segment instead of overwriting, otherwise
          // only the LAST spoken chunk survives and the whole-sentence score
          // collapses to ~0%.
          const seg = (r[0].transcript || "").trim();
          if (seg) recognizedText = recognizedText ? recognizedText + " " + seg : seg;
        } else {
          interim += r[0].transcript;
        }
      }
      if (interim) lastInterimText = interim;
      const live = recognizedText || interim;
      if (live) setRecogStatus("🔍 " + live);
      console.log("[recog] result:", JSON.stringify({ final: recognizedText, interim }));
    };

    rec.onerror = (event) => {
      const code = event && event.error;
      console.log("[recog] error:", code);
      if (code === "not-allowed" || code === "service-not-allowed") {
        recognitionError = "Microphone is blocked — click the 🔒 icon in the address bar, allow Microphone, then try again.";
      } else if (code === "network") {
        recognitionError = "Speech service is unreachable (network blocked) — check your internet connection and try again.";
      } else if (code === "no-speech") {
        recognitionError = "No speech detected — speak louder and closer to the microphone.";
      } else if (code === "audio-capture") {
        recognitionError = "No microphone found on this device.";
      } else if (code === "aborted") {
        // Stopped on purpose — not an error.
      } else {
        recognitionError = "Speech recognition failed (" + (code || "unknown error") + ") — please try again.";
      }
    };

    rec.onend = () => {
      recognitionEnded = true;
      if (recognitionTimeout) { clearTimeout(recognitionTimeout); recognitionTimeout = null; }
      // If the user is STILL recording, Chrome's recognition may have dropped
      // early (or hit its ~60s cap) — silently restart it to keep capturing.
      if (isRecording && !stopRequested && recognitionRestarts < 3 && recognitionError === "") {
        recognitionRestarts++;
        try { rec.start(); return; } catch (e) {}
      }
      maybeShowResults();
    };

    return rec;
  };

  /* ---------- Word matcher: which target words were heard ---------- */
  // Greedy bag-match with the same typo tolerance as wordsMatch(): each heard
  // word can satisfy at most one target word, so repeated words still count
  // correctly and extra filler words don't hurt.
  function matchWords(target, said) {
    const used = new Array(said.length).fill(false);
    const matched = [];
    for (let i = 0; i < target.length; i++) {
      let found = false;
      for (let j = 0; j < said.length; j++) {
        if (!used[j] && wordsMatch(target[i], said[j])) {
          used[j] = true;
          found = true;
          break;
        }
      }
      matched.push(found);
    }
    return matched;
  }

  /* ---------- Fixed results: transparent word-level scoring ---------- */
  window.showPracticeResults = function () {
    practiceStatus.textContent = "Recording saved ✓";
    practiceStatus.className = "practice-status ready";

    // Chrome sometimes only delivers interim (partial) results when a take is
    // stopped quickly — use the latest interim text as a fallback so we always
    // compare against what was actually heard, not an empty transcript.
    const saidText = (recognizedText || lastInterimText || "").trim();

    // No speech recognition in this browser — the recording still works fine.
    if (!SpeechRecognition) {
      transcriptBox.textContent = "Speech recognition isn't available in this browser. Use Chrome (desktop or Android) for pronunciation analysis — your recording still plays below.";
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score mid";
      resultBox.classList.add("visible");
      return;
    }

    // Recognition failed — explain the real cause instead of a confusing 0%.
    if (!saidText && recognitionError) {
      transcriptBox.textContent = recognitionError;
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score low";
      resultBox.classList.add("visible");
      return;
    }

    // Recording worked but the mic heard nothing.
    if (!saidText) {
      transcriptBox.textContent = "Nothing recognized — speak clearly, a bit louder, and closer to the microphone, then tap Redo and try again.";
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score low";
      resultBox.classList.add("visible");
      return;
    }

    const targetSentence = (getCurrentTargetSentence() || "").trim();
    const targetWords = normalizeWords(targetSentence);
    const saidWords = normalizeWords(saidText);

    if (targetWords.length === 0) {
      transcriptBox.textContent = "No target sentence available for this item.";
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score mid";
      resultBox.classList.add("visible");
      return;
    }

    const matched = matchWords(targetWords, saidWords);
    const correctCount = matched.filter(Boolean).length;
    const pct = Math.round((correctCount / targetWords.length) * 100);

    accuracyScore.textContent = pct + "%";
    accuracyScore.className = "accuracy-score " + (pct >= 80 ? "good" : pct >= 50 ? "mid" : "low");

    // Highlight the target sentence word by word — green = heard correctly,
    // red = missed. Uses the same matcher as the score, so the % always
    // matches what the learner sees.
    targetMatchBox.innerHTML = "";
    const rawTokens = targetSentence.split(/\s+/);
    let ti = 0;
    for (let i = 0; i < rawTokens.length; i++) {
      const span = document.createElement("span");
      span.textContent = rawTokens[i] + " ";
      if (/[A-Za-z0-9']/.test(rawTokens[i])) {
        span.className = matched[ti] ? "word-correct" : "word-wrong";
        ti++;
      }
      targetMatchBox.appendChild(span);
    }

    transcriptBox.textContent = saidText;

    resultBox.classList.add("visible");
  };

});
