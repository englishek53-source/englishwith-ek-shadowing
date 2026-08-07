/* ============================================================
   EnglishWith_EK — Website Language (i18n)
   ------------------------------------------------------------
   Translates the UI (not the lesson content) into the learner's
   language, like shadowing apps do. Loaded BEFORE the main
   script in index.html so window.t() is ready when the app
   renders. The chosen language is saved in localStorage.

   Languages: en (default), ar, fr, es, tr.
   To add another language: add a key to I18N_LANGS below and a
   dictionary entry — nothing else changes.
   ============================================================ */

(function () {

  var SAVE_KEY = "ek-lang";

  var I18N_LANGS = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "tr", label: "Türkçe" }
  ];

  var DICT = {
    en: {
      tagline: "Listen • Repeat • Speak Naturally",
      startShadowing: "Start Shadowing",
      achievements: "🏆 Achievements",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      focusMode: "Focus Mode",
      exitFocus: "Exit Focus",
      myWords: "My Words",
      hideMyWords: "Hide My Words",
      library: "Library",
      libraryBadge: "📚 Library",
      backToCourse: "Back to Course",
      mySavedWords: "⭐ My Saved Words",
      word: "Word",
      meaning: "Meaning",
      myVocabEmpty: "You haven't saved any words yet. Tap ⭐ next to any word in the Vocabulary table to save it.",
      filterByLevel: "🎓 Filter by level (CEFR):",
      all: "All",
      prevLesson: "◀ Previous Lesson",
      nextLesson: "Next Lesson ▶",
      backToLibrary: "← Back to Library",
      lesson: "Lesson",
      lessonProgress: "Lesson {0} / {1}",
      loop: "Loop",
      practiceTitle: "🎙️ Practice Your Pronunciation",
      practiceSub: "Listen to the sentence, then record yourself repeating it",
      currentSentence: "Current Sentence",
      listenOriginal: "Listen to Original",
      tapToRecord: "Tap to start recording",
      playMyVoice: "Play My Voice",
      redo: "Redo",
      pronunciationMatch: "Pronunciation Match",
      targetLabel: "Target — green = heard correctly, red = missed",
      whatWeHeard: "What we heard you say",
      vocabulary: "📚 Vocabulary",
      expressions: "💬 Useful Expressions",
      reflection: "❓ Reflection Question",
      cardDailyTitle: "Daily Conversation",
      cardDailyText: "Practice everyday English.",
      cardPsychTitle: "Psychology",
      cardPsychText: "Learn through powerful ideas.",
      cardMotTitle: "Motivation",
      cardMotText: "Improve English while growing.",
      chooseCategory: "Choose a Category",
      librarySub: "Podcasts, movies, TED Talks and more — pick a format and start shadowing.",
      searchPlaceholder: "🔍 Search by title or type...",
      allLevels: "🎓 All levels",
      allCategories: "← All Categories",
      items: "{0} items",
      shadow: "▶ Shadow",
      sentencesMeta: "{0} sentences",
      libraryEmpty: "The library is empty — add items to library.js to get started.",
      noResults: "No items match your search or level filter.",
      itemOf: "Item {0} / {1}",
      progressText: "{0} / {1} lessons completed ({2}%)",
      "cat.podcast": "Podcasts",
      "cat.movie": "Movies",
      "cat.ted": "TED Talks",
      "cat.news": "News",
      "cat.conversation": "Conversations",
      "cat.audiobook": "Audiobooks",
      "cat.story": "Stories",
      recordingSaved: "Recording saved ✓",
      analyzing: "🎯 Analyzing pronunciation...",
      listening: "🎙️ Listening…",
      speaking: "🗣️ Speaking — listening…",
      noSupport: "Speech recognition isn't supported in this browser. Try Chrome on desktop or Android for pronunciation analysis.",
      practiceNotAvailable: "Speech recognition isn't available in this browser. Add your SpeechAce key in config.js for pronunciation analysis on every device — your recording still plays below.",
      nothingRecognized: "Nothing recognized — speak clearly, a bit louder, and closer to the microphone, then tap Redo and try again.",
      serviceUnreachable: "⚠️ Pronunciation service is unreachable right now — check your internet connection and tap Redo to try again.",
      noTarget: "No target sentence available for this item."
    },

    ar: {
      tagline: "اسمع • كرّر • تكلّم بطلاقة",
      startShadowing: "ابدأ الشادوينغ",
      achievements: "🏆 الإنجازات",
      themeDark: "الوضع الداكن",
      themeLight: "الوضع الفاتح",
      focusMode: "وضع التركيز",
      exitFocus: "خروج من التركيز",
      myWords: "كلماتي",
      hideMyWords: "إخفاء كلماتي",
      library: "المكتبة",
      libraryBadge: "📚 المكتبة",
      backToCourse: "العودة للمنهج",
      mySavedWords: "⭐ كلماتي المحفوظة",
      word: "الكلمة",
      meaning: "المعنى",
      myVocabEmpty: "لسا ما حفظت أي كلمة. اضغط ⭐ جنب أي كلمة بجدول Vocabulary لتحفظها.",
      filterByLevel: "🎓 تصفية حسب المستوى (CEFR):",
      all: "الكل",
      prevLesson: "◀ الدرس السابق",
      nextLesson: "الدرس التالي ▶",
      backToLibrary: "← العودة للمكتبة",
      lesson: "درس",
      lessonProgress: "درس {0} / {1}",
      loop: "تكرار",
      practiceTitle: "🎙️ تمرّن على نطقك",
      practiceSub: "اسمع الجملة ثم سجّل نفسك وأنت تعيدها",
      currentSentence: "الجملة الحالية",
      listenOriginal: "اسمع النسخة الأصلية",
      tapToRecord: "اضغط لبدء التسجيل",
      playMyVoice: "تشغيل صوتي",
      redo: "إعادة",
      pronunciationMatch: "تطابق النطق",
      targetLabel: "الجملة الهدف — أخضر = سُمعت صح، أحمر = لم تُسمع",
      whatWeHeard: "ما سمعناه منك",
      vocabulary: "📚 المفردات",
      expressions: "💬 تعابير مفيدة",
      reflection: "❓ سؤال تأمّل",
      cardDailyTitle: "محادثة يومية",
      cardDailyText: "تدرّب على الإنجليزية اليومية.",
      cardPsychTitle: "علم النفس",
      cardPsychText: "تعلّم عبر أفكار مؤثرة.",
      cardMotTitle: "التحفيز",
      cardMotText: "حسّن إنجليزيتك وأنت تتطور.",
      chooseCategory: "اختر تصنيفاً",
      librarySub: "بودكاست، أفلام، TED وأكثر — اختر نوعاً وابدأ الشادوينغ.",
      searchPlaceholder: "🔍 ابحث بالعنوان أو النوع...",
      allLevels: "🎓 كل المستويات",
      allCategories: "← كل التصنيفات",
      items: "{0} عناصر",
      shadow: "▶ شادوينغ",
      sentencesMeta: "{0} جمل",
      libraryEmpty: "المكتبة فارغة — أضف عناصر إلى library.js للبدء.",
      noResults: "لا توجد عناصر تطابق البحث أو مستوى التصفية.",
      itemOf: "عنصر {0} / {1}",
      progressText: "{0} / {1} درس مكتمل ({2}%)",
      "cat.podcast": "بودكاست",
      "cat.movie": "أفلام",
      "cat.ted": "محادثات TED",
      "cat.news": "أخبار",
      "cat.conversation": "محادثات",
      "cat.audiobook": "كتب صوتية",
      "cat.story": "قصص",
      recordingSaved: "تم حفظ التسجيل ✓",
      analyzing: "🎯 جارٍ تحليل النطق...",
      listening: "🎙️ أستمع…",
      speaking: "🗣️ تتحدث — أستمع…",
      noSupport: "تحليل النطق غير مدعوم في هذا المتصفح. جرّب Chrome على الكمبيوتر أو الأندرويد لتحليل النطق.",
      practiceNotAvailable: "تحليل النطق غير متوفر في هذا المتصفح. أضف مفتاح SpeechAce في config.js لتحليل النطق على كل الأجهزة — تسجيلك يشتغل بالأسفل.",
      nothingRecognized: "لم يتم التعرف على شيء — تكلّم بوضوح وبصوت أعلى وأقرب من الميكروفون، ثم اضغط إعادة وجرّب مجدداً.",
      serviceUnreachable: "⚠️ خدمة النطق غير متاحة حالياً — تحقق من اتصالك بالإنترنت واضغط إعادة للمحاولة.",
      noTarget: "لا توجد جملة هدف لهذا العنصر."
    },

    fr: {
      tagline: "Écoutez • Répétez • Parlez naturellement",
      startShadowing: "Commencer le Shadowing",
      achievements: "🏆 Réalisations",
      themeDark: "Mode sombre",
      themeLight: "Mode clair",
      focusMode: "Mode Focus",
      exitFocus: "Quitter le focus",
      myWords: "Mes mots",
      hideMyWords: "Masquer mes mots",
      library: "Bibliothèque",
      libraryBadge: "📚 Bibliothèque",
      backToCourse: "Retour au cours",
      mySavedWords: "⭐ Mes mots enregistrés",
      word: "Mot",
      meaning: "Sens",
      myVocabEmpty: "Vous n'avez encore enregistré aucun mot. Touchez ⭐ à côté d'un mot du tableau Vocabulaire pour l'enregistrer.",
      filterByLevel: "🎓 Filtrer par niveau (CEFR) :",
      all: "Tous",
      prevLesson: "◀ Leçon précédente",
      nextLesson: "Leçon suivante ▶",
      backToLibrary: "← Retour à la bibliothèque",
      lesson: "Leçon",
      lessonProgress: "Leçon {0} / {1}",
      loop: "Boucle",
      practiceTitle: "🎙️ Pratiquez votre prononciation",
      practiceSub: "Écoutez la phrase, puis enregistrez-vous en la répétant",
      currentSentence: "Phrase actuelle",
      listenOriginal: "Écouter l'original",
      tapToRecord: "Appuyez pour enregistrer",
      playMyVoice: "Jouer ma voix",
      redo: "Refaire",
      pronunciationMatch: "Correspondance de prononciation",
      targetLabel: "Cible — vert = bien entendu, rouge = manqué",
      whatWeHeard: "Ce que nous vous avons entendu dire",
      vocabulary: "📚 Vocabulaire",
      expressions: "💬 Expressions utiles",
      reflection: "❓ Question de réflexion",
      cardDailyTitle: "Conversation quotidienne",
      cardDailyText: "Pratiquez l'anglais de tous les jours.",
      cardPsychTitle: "Psychologie",
      cardPsychText: "Apprenez grâce à des idées puissantes.",
      cardMotTitle: "Motivation",
      cardMotText: "Améliorez votre anglais tout en grandissant.",
      chooseCategory: "Choisissez une catégorie",
      librarySub: "Podcasts, films, TED Talks et plus — choisissez un format et commencez le shadowing.",
      searchPlaceholder: "🔍 Rechercher par titre ou type...",
      allLevels: "🎓 Tous les niveaux",
      allCategories: "← Toutes les catégories",
      items: "{0} éléments",
      shadow: "▶ Shadowing",
      sentencesMeta: "{0} phrases",
      libraryEmpty: "La bibliothèque est vide — ajoutez des éléments à library.js pour commencer.",
      noResults: "Aucun élément ne correspond à votre recherche ou à votre filtre de niveau.",
      itemOf: "Élément {0} / {1}",
      progressText: "{0} / {1} leçons terminées ({2}%)",
      "cat.podcast": "Podcasts",
      "cat.movie": "Films",
      "cat.ted": "Conférences TED",
      "cat.news": "Actualités",
      "cat.conversation": "Conversations",
      "cat.audiobook": "Livres audio",
      "cat.story": "Histoires",
      recordingSaved: "Enregistrement sauvegardé ✓",
      analyzing: "🎯 Analyse de la prononciation...",
      listening: "🎙️ Écoute…",
      speaking: "🗣️ Vous parlez — j'écoute…",
      noSupport: "La reconnaissance vocale n'est pas prise en charge dans ce navigateur. Essayez Chrome sur ordinateur ou Android pour l'analyse de la prononciation.",
      practiceNotAvailable: "La reconnaissance vocale n'est pas disponible dans ce navigateur. Ajoutez votre clé SpeechAce dans config.js pour l'analyse de la prononciation sur tous les appareils — votre enregistrement reste disponible ci-dessous.",
      nothingRecognized: "Rien n'a été reconnu — parlez clairement, un peu plus fort et plus près du microphone, puis touchez Refaire pour réessayer.",
      serviceUnreachable: "⚠️ Le service de prononciation est indisponible pour le moment — vérifiez votre connexion internet et touchez Refaire pour réessayer.",
      noTarget: "Aucune phrase cible disponible pour cet élément."
    },

    es: {
      tagline: "Escucha • Repite • Habla con naturalidad",
      startShadowing: "Empezar Shadowing",
      achievements: "🏆 Logros",
      themeDark: "Modo oscuro",
      themeLight: "Modo claro",
      focusMode: "Modo enfoque",
      exitFocus: "Salir del enfoque",
      myWords: "Mis palabras",
      hideMyWords: "Ocultar mis palabras",
      library: "Biblioteca",
      libraryBadge: "📚 Biblioteca",
      backToCourse: "Volver al curso",
      mySavedWords: "⭐ Mis palabras guardadas",
      word: "Palabra",
      meaning: "Significado",
      myVocabEmpty: "Aún no has guardado ninguna palabra. Toca ⭐ junto a cualquier palabra de la tabla de Vocabulario para guardarla.",
      filterByLevel: "🎓 Filtrar por nivel (CEFR):",
      all: "Todos",
      prevLesson: "◀ Lección anterior",
      nextLesson: "Siguiente lección ▶",
      backToLibrary: "← Volver a la biblioteca",
      lesson: "Lección",
      lessonProgress: "Lección {0} / {1}",
      loop: "Repetir",
      practiceTitle: "🎙️ Practica tu pronunciación",
      practiceSub: "Escucha la frase y luego grábate repitiéndola",
      currentSentence: "Frase actual",
      listenOriginal: "Escuchar el original",
      tapToRecord: "Toca para grabar",
      playMyVoice: "Reproducir mi voz",
      redo: "Rehacer",
      pronunciationMatch: "Coincidencia de pronunciación",
      targetLabel: "Objetivo — verde = bien, rojo = faltó",
      whatWeHeard: "Lo que te escuchamos decir",
      vocabulary: "📚 Vocabulario",
      expressions: "💬 Expresiones útiles",
      reflection: "❓ Pregunta de reflexión",
      cardDailyTitle: "Conversación diaria",
      cardDailyText: "Practica inglés cotidiano.",
      cardPsychTitle: "Psicología",
      cardPsychText: "Aprende con ideas poderosas.",
      cardMotTitle: "Motivación",
      cardMotText: "Mejora tu inglés mientras creces.",
      chooseCategory: "Elige una categoría",
      librarySub: "Podcasts, películas, TED Talks y más — elige un formato y empieza a hacer shadowing.",
      searchPlaceholder: "🔍 Buscar por título o tipo...",
      allLevels: "🎓 Todos los niveles",
      allCategories: "← Todas las categorías",
      items: "{0} elementos",
      shadow: "▶ Sombreado",
      sentencesMeta: "{0} frases",
      libraryEmpty: "La biblioteca está vacía — añade elementos a library.js para empezar.",
      noResults: "Ningún elemento coincide con tu búsqueda o filtro de nivel.",
      itemOf: "Elemento {0} / {1}",
      progressText: "{0} / {1} lecciones completadas ({2}%)",
      "cat.podcast": "Podcasts",
      "cat.movie": "Películas",
      "cat.ted": "Charlas TED",
      "cat.news": "Noticias",
      "cat.conversation": "Conversaciones",
      "cat.audiobook": "Audiolibros",
      "cat.story": "Historias",
      recordingSaved: "Grabación guardada ✓",
      analyzing: "🎯 Analizando pronunciación...",
      listening: "🎙️ Escuchando…",
      speaking: "🗣️ Hablando — escuchando…",
      noSupport: "El reconocimiento de voz no es compatible con este navegador. Prueba Chrome en ordenador o Android para el análisis de pronunciación.",
      practiceNotAvailable: "El reconocimiento de voz no está disponible en este navegador. Añade tu clave de SpeechAce en config.js para el análisis de pronunciación en todos los dispositivos — tu grabación sigue disponible abajo.",
      nothingRecognized: "No se reconoció nada — habla con claridad, un poco más alto y más cerca del micrófono, y toca Rehacer para intentarlo de nuevo.",
      serviceUnreachable: "⚠️ El servicio de pronunciación no está disponible ahora mismo — revisa tu conexión a internet y toca Rehacer para intentarlo de nuevo.",
      noTarget: "No hay frase objetivo disponible para este elemento."
    },

    tr: {
      tagline: "Dinle • Tekrarla • Doğal Konuş",
      startShadowing: "Shadowing'e Başla",
      achievements: "🏆 Başarılar",
      themeDark: "Karanlık Mod",
      themeLight: "Aydınlık Mod",
      focusMode: "Odak Modu",
      exitFocus: "Odaktan Çık",
      myWords: "Kelimelerim",
      hideMyWords: "Kelimelerimi Gizle",
      library: "Kütüphane",
      libraryBadge: "📚 Kütüphane",
      backToCourse: "Derse Dön",
      mySavedWords: "⭐ Kayıtlı Kelimelerim",
      word: "Kelime",
      meaning: "Anlam",
      myVocabEmpty: "Henüz kelime kaydetmedin. Kaydetmek için Kelime Bilgisi tablosundaki herhangi bir kelimenin yanındaki ⭐ simgesine dokun.",
      filterByLevel: "🎓 Seviyeye göre filtrele (CEFR):",
      all: "Tümü",
      prevLesson: "◀ Önceki Ders",
      nextLesson: "Sonraki Ders ▶",
      backToLibrary: "← Kütüphaneye Dön",
      lesson: "Ders",
      lessonProgress: "Ders {0} / {1}",
      loop: "Döngü",
      practiceTitle: "🎙️ Telaffuzunuzu Çalışın",
      practiceSub: "Cümleyi dinleyin, ardından tekrar ederken kendinizi kaydedin",
      currentSentence: "Mevcut Cümle",
      listenOriginal: "Orijinali Dinle",
      tapToRecord: "Kayda başlamak için dokunun",
      playMyVoice: "Sesimi Çal",
      redo: "Yeniden",
      pronunciationMatch: "Telaffuz Eşleşmesi",
      targetLabel: "Hedef — yeşil = doğru duyuldu, kırmızı = kaçtı",
      whatWeHeard: "Söylediğini duyduğumuz",
      vocabulary: "📚 Kelime Bilgisi",
      expressions: "💬 Kullanışlı İfadeler",
      reflection: "❓ Düşünme Sorusu",
      cardDailyTitle: "Günlük Konuşma",
      cardDailyText: "Günlük İngilizce pratiği yapın.",
      cardPsychTitle: "Psikoloji",
      cardPsychText: "Güçlü fikirlerle öğrenin.",
      cardMotTitle: "Motivasyon",
      cardMotText: "Gelişirken İngilizcenizi geliştirin.",
      chooseCategory: "Bir Kategori Seçin",
      librarySub: "Podcast'ler, filmler, TED Konuşmaları ve daha fazlası — bir format seçin ve shadowing'e başlayın.",
      searchPlaceholder: "🔍 Başlığa veya türe göre ara...",
      allLevels: "🎓 Tüm seviyeler",
      allCategories: "← Tüm Kategoriler",
      items: "{0} öğe",
      shadow: "▶ Shadowing",
      sentencesMeta: "{0} cümle",
      libraryEmpty: "Kütüphane boş — başlamak için library.js dosyasına öğe ekleyin.",
      noResults: "Aramanızla veya seviye filtresiyle eşleşen öğe yok.",
      itemOf: "Öğe {0} / {1}",
      progressText: "{0} / {1} ders tamamlandı (%{2})",
      "cat.podcast": "Podcast'ler",
      "cat.movie": "Filmler",
      "cat.ted": "TED Konuşmaları",
      "cat.news": "Haberler",
      "cat.conversation": "Konuşmalar",
      "cat.audiobook": "Sesli Kitaplar",
      "cat.story": "Hikayeler",
      recordingSaved: "Kayıt kaydedildi ✓",
      analyzing: "🎯 Telaffuz analiz ediliyor...",
      listening: "🎙️ Dinliyorum…",
      speaking: "🗣️ Konuşuyorsun — dinliyorum…",
      noSupport: "Bu tarayıcıda konuşma tanıma desteklenmiyor. Telaffuz analizi için masaüstü veya Android'de Chrome kullanın.",
      practiceNotAvailable: "Bu tarayıcıda konuşma tanıma mevcut değil. Tüm cihazlarda telaffuz analizi için config.js dosyasına SpeechAce anahtarınızı ekleyin — kaydınız aşağıda oynamaya devam eder.",
      nothingRecognized: "Hiçbir şey tanınamadı — net, biraz daha yüksek sesle ve mikrofona yakın konuşun, ardından Yeniden'e dokunup tekrar deneyin.",
      serviceUnreachable: "⚠️ Telaffuz hizmeti şu anda kullanılamıyor — internet bağlantınızı kontrol edin ve tekrar denemek için Yeniden'e dokunun.",
      noTarget: "Bu öğe için hedef cümle mevcut değil."
    }
  };

  function savedLang() {
    var l = "en";
    try { l = localStorage.getItem(SAVE_KEY) || "en"; } catch (e) {}
    return DICT[l] ? l : "en";
  }

  function t(key, vars) {
    var lang = t._current || "en";
    var dict = DICT[lang] || DICT.en;
    var str = dict[key] !== undefined ? dict[key] : (DICT.en[key] !== undefined ? DICT.en[key] : key);
    if (vars && vars.length) {
      for (var i = 0; i < vars.length; i++) {
        str = str.split("{" + i + "}").join(String(vars[i]));
      }
    }
    return str;
  }
  t._current = savedLang();

  // Set the document direction + language attribute (Arabic is RTL).
  function applyDir(lang) {
    var doc = document.documentElement;
    doc.lang = lang;
    doc.dir = lang === "ar" ? "rtl" : "ltr";
  }

  // Translate every element carrying a data-i18n key (+ optional data-i18n-placeholder).
  function translateStatic() {
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      if (!key) continue;
      if (els[i].hasAttribute("data-i18n-placeholder")) {
        els[i].setAttribute("placeholder", t(key));
      } else {
        els[i].textContent = t(key);
      }
    }
  }

  // Refresh every dynamic region rendered by JS, so a language switch is complete.
  function refreshDynamic() {
    if (typeof buildLevelOptions === "function") buildLevelOptions();
    if (typeof updateLessonNavUI === "function") updateLessonNavUI();
    if (typeof setModeUI === "function") setModeUI(view && view.indexOf("library") === 0 ? "library" : "course");
    if (typeof renderLibraryCategories === "function" && typeof view !== "undefined" && view === "libraryCategories") renderLibraryCategories();
    if (typeof renderCategoryItems === "function" && typeof view !== "undefined" && view === "libraryItems") renderCategoryItems();
    if (typeof updatePracticeTarget === "function") updatePracticeTarget();
  }

  function applyLanguage(lang, save) {
    if (!DICT[lang]) lang = "en";
    t._current = lang;
    if (save) {
      try { localStorage.setItem(SAVE_KEY, lang); } catch (e) {}
    }
    applyDir(lang);
    translateStatic();
    refreshDynamic();
    var sel = document.getElementById("langSelect");
    if (sel) sel.value = lang;
  }

  // ---- expose ----
  window.I18N = {
    langs: I18N_LANGS,
    t: t,
    applyLanguage: applyLanguage,
    current: function () { return t._current; }
  };
  window.t = t;   // used by the main script's render functions

  // ---- language selector ----
  function initSelector() {
    var sel = document.getElementById("langSelect");
    if (!sel) return;
    if (sel.options.length === 0) {
      I18N_LANGS.forEach(function (l) {
        var opt = document.createElement("option");
        opt.value = l.code;
        opt.textContent = "🌐 " + l.label;
        sel.appendChild(opt);
      });
    }
    sel.value = t._current;
    sel.addEventListener("change", function () {
      applyLanguage(sel.value, true);
    });
  }

  // The selector sits above this script in the DOM; the rest of the page
  // finishes parsing before DOMContentLoaded, so translate there too.
  initSelector();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyLanguage(t._current, false); });
  } else {
    applyLanguage(t._current, false);
  }

})();
