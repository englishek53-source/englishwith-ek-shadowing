/* ============================================================
   EnglishWith_EK — Word Popup (tap a word in the sentence)
   ------------------------------------------------------------
   Tapping any word in the shadowing card opens a small card:
     🔊  hear the word pronounced (browser TTS, en-US)
     💡  meaning — 1) current lesson/library vocab table,
         2) any lesson/library vocab, 3) Free Dictionary API
         (https://dictionaryapi.dev — no key needed)
     ⭐  save / un-save the word in "My Saved Words"
   Loaded AFTER i18n.js and BEFORE the main inline script, so
   the main script can call closeWordPopup() when the sentence,
   lesson or view changes.
   ============================================================ */

(function () {

  var wordPopup = document.getElementById("wordPopup");
  var wpWord = document.getElementById("wpWord");
  var wpSpeak = document.getElementById("wpSpeak");
  var wpSave = document.getElementById("wpSave");
  var wpMeaning = document.getElementById("wpMeaning");

  // The main inline script uses const sentenceEl; we resolve it here.
  var wpSentenceEl = document.getElementById("sentence");

  var wpCurrentWord = "";
  var wpCurrentMeaning = "";
  var wpDictCache = {};   // normalized word -> meaning (null = not found)
  var wpGlobalVocab = null;

  function wpNormalize(w) {
    return String(w).toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  }

  function buildGlobalVocab() {
    var map = {};
    var all = (typeof lessons !== "undefined" ? lessons : [])
      .concat(typeof libraryData !== "undefined" ? libraryData : []);
    all.forEach(function (item) {
      (item.vocab || []).forEach(function (pair) {
        var key = wpNormalize(pair[0]);
        if (key && !map[key]) map[key] = pair[1];
      });
    });
    wpGlobalVocab = map;
  }

  // 1) current lesson/library vocab → 2) any content → 3) null (dictionary API next)
  function findMeaning(word) {
    var n = wpNormalize(word);
    if (!n) return null;
    var content = (typeof getActiveContent === "function") ? getActiveContent() : null;
    if (content && Array.isArray(content.vocab)) {
      for (var i = 0; i < content.vocab.length; i++) {
        if (wpNormalize(content.vocab[i][0]) === n) return content.vocab[i][1];
      }
    }
    if (!wpGlobalVocab) buildGlobalVocab();
    return wpGlobalVocab[n] || null;
  }

  // Free Dictionary API — no key needed; graceful when offline or unknown.
  function lookupDictMeaning(word) {
    var n = wpNormalize(word);
    if (!n || /[^a-z\s]/.test(n)) return Promise.resolve(null); // contractions/numbers skipped
    if (n in wpDictCache) return Promise.resolve(wpDictCache[n]);
    return fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(n))
      .then(function (r) { if (!r.ok) throw new Error("nf"); return r.json(); })
      .then(function (data) {
        var m = "";
        if (data && data[0] && data[0].meanings && data[0].meanings.length) {
          var defs = data[0].meanings[0].definitions;
          if (defs && defs[0] && defs[0].definition) m = defs[0].definition;
        }
        wpDictCache[n] = m || null;
        return m || null;
      })
      .catch(function () { wpDictCache[n] = null; return null; });
  }

  function openWordPopup(word, el) {
    wpCurrentWord = word;
    var local = findMeaning(word);
    wpCurrentMeaning = local || "";
    wpWord.textContent = word;
    wpMeaning.textContent = local ? local : "…";
    wpSave.textContent = isWordSaved(word) ? "★" : "☆";
    wpSave.classList.toggle("saved", isWordSaved(word));

    if (!local) {
      lookupDictMeaning(word).then(function (m) {
        if (wpCurrentWord !== word) return; // popup already moved on
        wpCurrentMeaning = m || "";
        wpMeaning.textContent = m ? m : "—";
        if (m) {
          wpSave.textContent = isWordSaved(word) ? "★" : "☆";
          wpSave.classList.toggle("saved", isWordSaved(word));
        }
      });
    }

    var rect = el.getBoundingClientRect();
    var popupW = 264;
    var left = rect.left + rect.width / 2 - popupW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - popupW - 8));
    var top = rect.bottom + 8;
    var estH = 120;
    if (top + estH > window.innerHeight - 8) top = Math.max(8, rect.top - estH - 8);
    wordPopup.style.left = left + "px";
    wordPopup.style.top = top + "px";
    wordPopup.hidden = false;
  }

  // Global so the main inline script can close it on sentence/lesson/view changes.
  window.closeWordPopup = function () {
    wordPopup.hidden = true;
    wpCurrentWord = "";
  };

  wpSentenceEl.addEventListener("click", function (e) {
    var w = e.target.closest(".word");
    if (!w) return;
    openWordPopup(w.textContent, w);
  });

  wpSpeak.addEventListener("click", function () {
    if (!wpCurrentWord || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(wpCurrentWord);
    u.lang = "en-US";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  });

  wpSave.addEventListener("click", function () {
    if (!wpCurrentWord) return;
    if (isWordSaved(wpCurrentWord)) {
      removeVocabWord(wpCurrentWord);
    } else {
      saveVocabWord(wpCurrentWord, wpCurrentMeaning || wpCurrentWord);
    }
    var saved = isWordSaved(wpCurrentWord);
    wpSave.textContent = saved ? "★" : "☆";
    wpSave.classList.toggle("saved", saved);
    if (typeof renderVocabTable === "function") renderVocabTable(getActiveContent());
    if (typeof renderMyVocabPanel === "function") renderMyVocabPanel();
  });

  // Close on outside click, Escape, scroll or resize.
  document.addEventListener("click", function (e) {
    if (wordPopup.hidden) return;
    if (!wordPopup.contains(e.target) && !e.target.closest(".word")) window.closeWordPopup();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") window.closeWordPopup(); });
  window.addEventListener("scroll", window.closeWordPopup, { passive: true });
  window.addEventListener("resize", window.closeWordPopup);

})();
