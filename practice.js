/* ============================================================
   EnglishWith_EK — Pronunciation Analysis (fix + SpeechAce)
   ------------------------------------------------------------
   Loaded BEFORE the main inline script in index.html. This file
   patches the two buggy voice-practice functions on window
   "load" (after the main script has run and defined its globals):

   1. setupRecognition(): Chrome's Web Speech API delivers one
      FINAL transcript segment per spoken chunk ("Have you ever",
      then "looked at someone else's life", ...). The old onresult
      OVERWROTE recognizedText, so only the last chunk survived
      and every full-sentence take scored ~0% even when said
      correctly. We append each final segment instead.

   2. showPracticeResults(): real pronunciation scoring through
      SpeechAce (works on EVERY device incl. iPhone/iPad Safari)
      when a key is set in config.js; falls back to Chrome-only
      Web Speech transcript matching otherwise. Per-word scores
      drive the green/red target highlights.
   ============================================================ */

window.addEventListener("load", function () {

  // Main script didn't define the expected globals — nothing to patch.
  if (typeof setupRecognition !== "function" || typeof showPracticeResults !== "function") {
    return;
  }

  function getSpeechAceKey() {
    return (typeof window.SPEECHACE_API_KEY === "string" && window.SPEECHACE_API_KEY.trim())
      ? window.SPEECHACE_API_KEY.trim()
      : "";
  }

  /* ============================================================
     ---------- Fixed recognizer: accumulate final segments ----------
     ============================================================ */
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
      setRecogStatus(t("listening"));
    };
    rec.onspeechstart = () => {
      console.log("[recog] speech detected");
      setRecogStatus(t("speaking"));
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

  /* ============================================================
     ---------- Fixed practice UI reset (translated) ----------
     resetPracticeUI lives past the editable region of index.html,
     so it is overridden here with the same behavior + i18n.
     ============================================================ */
  window.resetPracticeUI = function () {
    playbackRow.classList.remove("visible");
    resultBox.classList.remove("visible");
    practiceStatus.textContent = t("tapToRecord");
    practiceStatus.className = "practice-status";
    setRecogStatus("");
    targetMatchBox.innerHTML = "";
    lastInterimText = "";
    audioChunks = [];
    recognizedText = "";
    if (recognitionTimeout) { clearTimeout(recognitionTimeout); recognitionTimeout = null; }
  };

  /* ============================================================
     ---------- Word matcher (fallback transcript scoring) ----------
     ============================================================ */
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

  /* ============================================================
     ---------- SpeechAce: real pronunciation scoring ----------
     Works from the browser on every device (iPhone/iPad included).
     ============================================================ */

  // Convert the recorded blob to 16-bit PCM WAV so SpeechAce accepts it,
  // whatever format the browser recorded (webm / mp4 / ogg).
  function audioBufferToWav(buffer) {
    const numChannels = Math.min(2, buffer.numberOfChannels);
    const sampleRate = buffer.sampleRate;
    const numFrames = buffer.length;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const dataSize = numFrames * blockAlign;
    const arrayBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(arrayBuffer);
    function writeString(offset, str) {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }
    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);                // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);               // 16 bits per sample
    writeString(36, "data");
    view.setUint32(40, dataSize, true);
    const channels = [];
    for (let c = 0; c < numChannels; c++) channels.push(buffer.getChannelData(c));
    let offset = 44;
    for (let i = 0; i < numFrames; i++) {
      for (let c = 0; c < numChannels; c++) {
        const s = Math.max(-1, Math.min(1, channels[c][i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;
      }
    }
    return new Blob([arrayBuffer], { type: "audio/wav" });
  }

  function blobToWavBlob(blob) {
    return new Promise(function (resolve, reject) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return reject(new Error("no-audio-context"));
      const ac = new AC();
      blob.arrayBuffer()
        .then(function (buf) { return ac.decodeAudioData(buf); })
        .then(function (audioBuffer) {
          const wav = audioBufferToWav(audioBuffer);
          try { ac.close(); } catch (e) {}
          resolve(wav);
        })
        .catch(function (err) {
          try { ac.close(); } catch (e) {}
          reject(err);
        });
    });
  }

  // POST the WAV + expected sentence to SpeechAce and return the JSON score.
  function scoreWithSpeechAce(wavBlob, text) {
    const key = getSpeechAceKey();
    const url = "https://api.speechace.com/api/scoring/text/v9/json?key=" +
      encodeURIComponent(key) + "&dialect=en-US&user_id=ek-shadowing";
    const form = new FormData();
    form.append("text", text);
    form.append("user_audio_file", wavBlob, "recording.wav");
    return fetch(url, { method: "POST", body: form }).then(function (r) {
      return r.json();
    }).then(function (data) {
      if (data && typeof data.text_score === "number" && data.text && data.text.length) {
        return data;
      }
      throw new Error("speechace-empty-response");
    });
  }

  // Async path: record -> WAV -> SpeechAce -> per-word highlights.
  // Any failure falls back to the transcript comparison when available.
  function scoreWithSpeechAceAsync(blob, targetSentence, targetWords, saidText) {
    blobToWavBlob(blob)
      .then(function (wav) { return scoreWithSpeechAce(wav, targetSentence); })
      .then(function (data) {
        // SpeechAce returns one entry per heard word with word_score (0-100).
        // Build a normalized-word -> best score map (order-insensitive), then
        // mark each target word "correct" when its score is decent (>= 60).
        const scoreMap = {};
        (data.text || []).forEach(function (w) {
          const key = normalizeWords(w.word || "")[0];
          if (key === undefined) return;
          const sc = w.word_score || 0;
          if (scoreMap[key] === undefined || sc > scoreMap[key]) scoreMap[key] = sc;
        });
        const matched = targetWords.map(function (tw) {
          return scoreMap[tw] !== undefined && scoreMap[tw] >= 60;
        });
        const correctCount = matched.filter(Boolean).length;
        const pct = Math.round((correctCount / targetWords.length) * 100);
        const heard = (data.text || []).map(function (w) { return w.word; }).join(" ");
        renderPronunciationUI(targetSentence, matched, pct, heard || saidText);
      })
      .catch(function () {
        // SpeechAce unavailable — fall back to transcript comparison if we can.
        if (SpeechRecognition && saidText) {
          const saidWords = normalizeWords(saidText);
          const matched = matchWords(targetWords, saidWords);
          const correctCount = matched.filter(Boolean).length;
          const pct = Math.round((correctCount / targetWords.length) * 100);
          renderPronunciationUI(targetSentence, matched, pct, saidText);
        } else {
          transcriptBox.textContent = t("serviceUnreachable");
          targetMatchBox.innerHTML = "";
          accuracyScore.textContent = "--%";
          accuracyScore.className = "accuracy-score mid";
          resultBox.classList.add("visible");
        }
      });
  }

  /* ============================================================
     ---------- Shared results rendering (score + highlights) ----------
     ============================================================ */
  function renderPronunciationUI(targetSentence, matched, pct, heardText) {
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

    transcriptBox.textContent = heardText || "—";

    resultBox.classList.add("visible");
  }

  /* ============================================================
     ---------- Fixed results entry point ----------
     ============================================================ */
  window.showPracticeResults = function () {
    practiceStatus.textContent = t("recordingSaved");
    practiceStatus.className = "practice-status ready";

    const saidText = (recognizedText || lastInterimText || "").trim();
    const targetSentence = (getCurrentTargetSentence() || "").trim();
    const targetWords = normalizeWords(targetSentence);

    // ---- Preferred: real pronunciation scoring (every device) ----
    if (getSpeechAceKey() && typeof audioChunks !== "undefined" && audioChunks.length > 0) {
      const blob = new Blob(audioChunks, {
        type: (typeof mediaRecorder !== "undefined" && mediaRecorder && mediaRecorder.mimeType) || "audio/webm"
      });
      practiceStatus.textContent = t("analyzing");
      practiceStatus.className = "practice-status ready";
      scoreWithSpeechAceAsync(blob, targetSentence, targetWords, saidText);
      return;
    }

    // ---- Fallback: Chrome-only Web Speech transcript matching ----
    if (!SpeechRecognition) {
      transcriptBox.textContent = t("practiceNotAvailable");
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score mid";
      resultBox.classList.add("visible");
      return;
    }

    if (targetWords.length === 0) {
      transcriptBox.textContent = t("noTarget");
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score mid";
      resultBox.classList.add("visible");
      return;
    }

    if (!saidText && recognitionError) {
      transcriptBox.textContent = recognitionError;
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score low";
      resultBox.classList.add("visible");
      return;
    }

    if (!saidText) {
      transcriptBox.textContent = t("nothingRecognized");
      targetMatchBox.innerHTML = "";
      accuracyScore.textContent = "--%";
      accuracyScore.className = "accuracy-score low";
      resultBox.classList.add("visible");
      return;
    }

    const saidWords = normalizeWords(saidText);
    const matched = matchWords(targetWords, saidWords);
    const correctCount = matched.filter(Boolean).length;
    const pct = Math.round((correctCount / targetWords.length) * 100);
    renderPronunciationUI(targetSentence, matched, pct, saidText);
  };

});
