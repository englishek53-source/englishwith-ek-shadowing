<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EnglishWith_EK Shadowing</title>

<style>

/* ---------- Theme Variables ---------- */
:root{
  --bg:#F8F6F2;
  --text:#2B241F;
  --muted:#6d6d6d;
  --card-bg:#ffffff;
  --accent:#7D8E74;
  --accent-dark:#5f6f57;
  --accent-light:rgba(125,142,116,.08);
  --tag-bg:#DCCDB8;
  --word-color:#9F907B;
  --shadow:rgba(0,0,0,.08);
  --border:#E1DACB;
  --loop-accent:#E8863F;
  --loop-accent-bg:rgba(232,134,63,.12);
  --red:#C25B52;
  --red-light:rgba(194,91,82,.12);
  --gold:#D4A94F;
}

[data-theme="dark"]{
  --bg:#17140F;
  --text:#F1EEE8;
  --muted:#B4AA9C;
  --card-bg:#241F1A;
  --accent:#8FA084;
  --accent-dark:#a9bb9f;
  --accent-light:rgba(143,160,132,.15);
  --tag-bg:#4A3F33;
  --word-color:#B9AB94;
  --shadow:rgba(0,0,0,.5);
  --border:#3A332A;
  --loop-accent:#F0A05E;
  --loop-accent-bg:rgba(240,160,94,.15);
  --red:#E07A70;
  --red-light:rgba(224,122,112,.15);
  --gold:#E5BC72;
}

.progress-container {
  width: 90%;
  max-width: 900px;
  margin: 15px auto 0;
  text-align: center;
}

.progress-bg {
  width: 100%;
  background: #e0e0e0;
  border-radius: 10px;
  height: 10px;
  overflow: hidden;
  margin-top: 5px;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  width: 0%;
  transition: width 0.3s ease;
}

.completed {
  color: #4caf50;
  font-weight: bold;
}

body{
  margin:0;
  font-family:Arial, sans-serif;
  background:var(--bg);
  color:var(--text);
  transition:background .3s ease, color .3s ease;
}

header{
  padding:25px;
  text-align:center;
}

h1{
  font-size:42px;
  margin:10px;
}

p{
  color:var(--muted);
}

button{
  background:var(--accent);
  color:white;
  border:none;
  padding:15px 35px;
  border-radius:50px;
  font-size:18px;
  cursor:pointer;
  margin-top:20px;
  font-family:inherit;
}

/* ---------- Utility Bar (Theme / Focus) ---------- */
.utility-bar{
  display:flex;
  justify-content:center;
  gap:10px;
  padding:10px 0 0;
  flex-wrap:wrap;
}

.mode-btn{
  margin-top:0;
  padding:9px 18px 9px 14px;
  font-size:14px;
  font-weight:600;
  border-radius:50px;
  background:transparent;
  color:var(--muted);
  border:1.5px solid var(--border);
  display:flex;
  align-items:center;
  gap:8px;
  transition:all .2s ease;
}

.mode-btn:hover{
  border-color:var(--accent);
  color:var(--text);
}

.mode-btn .icon{
  width:17px;
  height:17px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}

.mode-btn .icon svg{
  width:100%;
  height:100%;
  stroke:currentColor;
  fill:none;
  stroke-width:2;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.mode-btn.active{
  background:var(--accent);
  color:#fff;
  border-color:var(--accent);
}

/* ---------- Filter Bar ---------- */
.filter-bar{
  width:90%;
  max-width:900px;
  margin:15px auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  flex-wrap:wrap;
  font-size:14px;
  color:var(--muted);
}
.filter-bar select{
  padding:8px 14px;
  border-radius:50px;
  border:1px solid var(--tag-bg);
  background:var(--card-bg);
  color:var(--text);
  font-size:14px;
}

.video{
  width:90%;
  max-width:900px;
  margin:auto;
  border-radius:25px;
  overflow:hidden;
  box-shadow:0 10px 30px var(--shadow);
  position:relative;
  padding-top:56.25%; /* 16:9 ratio */
  background:var(--card-bg);
}

.video iframe{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  border:0;
}

/* ---------- Shadowing Card ---------- */
.shadow-card{
  width:90%;
  max-width:900px;
  background:var(--card-bg);
  margin:30px auto;
  border-radius:24px;
  box-shadow:0 10px 30px var(--shadow);
  padding:35px 30px;
  box-sizing:border-box;
}

.shadow-controls{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:24px;
  margin-bottom:25px;
  flex-wrap:wrap;
}

.playback-group{
  display:flex;
  align-items:center;
  gap:6px;
  background:var(--bg);
  border-radius:999px;
  padding:8px;
}

.icon-btn{
  margin-top:0;
  background:transparent;
  color:var(--muted);
  border:none;
  width:38px;
  height:38px;
  border-radius:50%;
  padding:0;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:background .15s ease, color .15s ease;
}

.icon-btn:hover{
  background:var(--accent-light);
  color:var(--accent);
}

.icon-btn svg{
  width:18px;
  height:18px;
  stroke:currentColor;
  fill:none;
  stroke-width:2;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.shadow-controls .play-btn{
  width:56px;
  height:56px;
  border-radius:50%;
  padding:0;
  margin-top:0;
  font-size:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 4px 10px var(--shadow);
}

.play-btn svg{
  width:22px;
  height:22px;
  fill:currentColor;
  stroke:none;
}

.settings-group{
  display:flex;
  align-items:center;
  gap:10px;
}

.loop-btn{
  margin-top:0;
  background:transparent;
  color:var(--muted);
  border:1.5px solid var(--border);
  padding:9px 18px;
  border-radius:50px;
  font-size:14px;
  font-weight:600;
  display:flex;
  align-items:center;
  gap:7px;
  cursor:pointer;
  transition:all .2s ease;
}

.loop-btn svg{
  width:16px;
  height:16px;
  stroke:currentColor;
  fill:none;
  stroke-width:2;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.loop-btn:hover{
  border-color:var(--loop-accent);
}

.loop-btn.active{
  background:var(--loop-accent-bg);
  color:var(--loop-accent);
  border-color:var(--loop-accent);
}

.sync-btn.active{
  background:var(--accent-light);
  color:var(--accent-dark);
  border-color:var(--accent);
}

#speedSelect{
  background:transparent;
  color:var(--muted);
  border:1.5px solid var(--border);
  padding:9px 16px;
  border-radius:50px;
  font-size:14px;
  font-weight:600;
  cursor:pointer;
}

.sentence{
    display:block;
    text-align:left;
    max-width:600px;
    margin:0 auto 20px;
    line-height:2;
}
.word{
    display:inline-block;
    padding:2px 4px;
    margin-right: 4px;
    background:none;
    border-radius:8px;
    color:var(--word-color);
    font-size:30px;
    font-weight:500;
    border:2px solid transparent;
    transition:all .25s ease;
}

.word.active{
    color:var(--accent);
    border:2px solid var(--accent);
    background:var(--accent-light);
}

.lesson-nav{
  width:90%;
  max-width:900px;
  margin:0 auto 15px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.lesson-nav button{
  margin-top:0;
  padding:8px 18px;
  font-size:14px;
}

.lesson-progress{
  font-size:14px;
  font-weight:700;
  color:var(--accent);
}

.lesson-title{
  width:90%;
  max-width:900px;
  margin:0 auto 20px;
  text-align:center;
}

.lesson-number{
  display:inline-block;
  background:var(--tag-bg);
  color:var(--text);
  padding:6px 18px;
  border-radius:999px;
  font-size:14px;
  font-weight:700;
  letter-spacing:.5px;
  margin-bottom:10px;
}

.lesson-title h2{
  font-size:28px;
  margin:10px 0 0;
}

/* ---------- Lesson Sections ---------- */
.lesson-section{
  width:90%;
  max-width:900px;
  background:var(--card-bg);
  margin:20px auto;
  border-radius:24px;
  box-shadow:0 10px 30px var(--shadow);
  padding:35px 30px;
  box-sizing:border-box;
}

.lesson-section h3{
  margin-top:0;
  font-size:22px;
  color:var(--text);
}

.vocab-table{
  width:100%;
  border-collapse:collapse;
}

.vocab-table th, .vocab-table td{
  text-align:left;
  padding:10px 12px;
  border-bottom:1px solid var(--tag-bg);
  font-size:16px;
}

.vocab-table th{
  color:var(--accent);
  font-size:14px;
  text-transform:uppercase;
  letter-spacing:.5px;
}

.save-word-btn{
  background:none;
  border:none;
  color:var(--border);
  font-size:20px;
  cursor:pointer;
  padding:0;
  line-height:1;
  margin-top:0;
}
.save-word-btn.saved{
  color:var(--gold);
}

.remove-word-btn{
  background:none;
  border:none;
  font-size:16px;
  cursor:pointer;
  padding:0;
  margin-top:0;
}

#myVocabEmpty{
  color:var(--muted);
  font-size:15px;
}

.expressions-list{
  list-style:none;
  margin:0;
  padding:0;
}

.expressions-list li{
  padding:10px 16px;
  background:var(--bg);
  border-radius:14px;
  margin-bottom:10px;
  font-size:16px;
}

.reflection-box{
  background:var(--tag-bg);
  border-radius:18px;
  padding:20px;
  font-size:17px;
  font-style:italic;
}

.quote-section{
  text-align:center;
  background:#2B241F;
  color:#F8F6F2;
}

.quote-section p{
  color:#F8F6F2;
  font-size:22px;
  font-style:italic;
  line-height:1.5;
  margin:0;
}

.lesson-nav button:disabled{
  opacity:.4;
  cursor:default;
}

.cards{
  display:flex;
  justify-content:center;
  gap:20px;
  flex-wrap:wrap;
  padding:40px;
}

.card{
  background:var(--card-bg);
  padding:25px;
  border-radius:20px;
  width:250px;
  box-shadow:0 5px 20px var(--shadow);
  text-align:center;
}

/* ---------- Voice Practice Card ---------- */
.practice-card{
  width:90%;
  max-width:900px;
  background:var(--card-bg);
  margin:20px auto 0;
  border-radius:24px;
  box-shadow:0 10px 30px var(--shadow);
  padding:30px 28px;
  box-sizing:border-box;
}

.practice-card h3{
  margin:0 0 4px;
  font-size:20px;
  color:var(--text);
  text-align:center;
}

.practice-sub{
  text-align:center;
  font-size:13px;
  color:var(--muted);
  margin-bottom:20px;
}

.practice-target{
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:14px;
  padding:16px;
  text-align:center;
  margin-bottom:18px;
}

.practice-target .ptlabel{
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.5px;
  color:var(--muted);
  font-weight:700;
  margin-bottom:6px;
}

.practice-target .ptsentence{
  font-size:18px;
  font-weight:600;
  color:var(--text);
  margin-bottom:10px;
  line-height:1.4;
}

.listen-btn{
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:var(--accent);
  color:#fff;
  border:none;
  border-radius:20px;
  padding:8px 18px;
  font-size:13px;
  font-weight:600;
  cursor:pointer;
  margin-top:0;
}
.listen-btn svg{ width:13px; height:13px; fill:currentColor; }
.listen-btn:active{ transform:scale(.96); }

.record-wrap{
  position:relative;
  width:78px;
  height:78px;
  margin:4px auto 10px;
}
.pulse-ring{
  position:absolute;
  inset:0;
  border-radius:50%;
  background:var(--red-light);
  opacity:0;
}
.record-wrap.recording .pulse-ring{ animation:pulseRing 1.4s ease-out infinite; }
@keyframes pulseRing{
  0%{opacity:.6; transform:scale(1);}
  100%{opacity:0; transform:scale(1.6);}
}
.record-btn{
  position:relative;
  width:78px; height:78px;
  border-radius:50%;
  border:none;
  cursor:pointer;
  background:var(--accent);
  color:#fff;
  display:flex; align-items:center; justify-content:center;
  transition:background .25s ease, transform .15s ease;
  z-index:1;
  margin-top:0;
  padding:0;
}
.record-btn:active{ transform:scale(.94); }
.record-btn.recording{ background:var(--red); }
.record-btn svg{ width:28px; height:28px; }

.practice-status{
  text-align:center;
  font-size:13px;
  font-weight:600;
  color:var(--muted);
  margin-bottom:16px;
  min-height:16px;
}
.practice-status.recording{ color:var(--red); }
.practice-status.ready{ color:var(--accent-dark); }

.playback-row{
  display:none;
  align-items:center;
  justify-content:center;
  gap:10px;
  margin-bottom:16px;
}
.playback-row.visible{ display:flex; }
.play-my-btn, .redo-btn{
  display:flex; align-items:center; gap:6px;
  padding:8px 14px;
  border-radius:24px;
  border:1.5px solid var(--border);
  background:var(--bg);
  color:var(--text);
  font-size:13px;
  font-weight:600;
  cursor:pointer;
  margin-top:0;
}
.play-my-btn{ border-color:var(--accent); color:var(--accent-dark); }
.play-my-btn svg, .redo-btn svg{ width:13px; height:13px; }

.result-box{
  display:none;
  border-top:1px solid var(--border);
  padding-top:16px;
}
.result-box.visible{ display:block; }

.accuracy-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:10px;
}
.accuracy-row .alabel{
  font-size:13px;
  font-weight:700;
  color:var(--text);
}
.accuracy-score{
  font-size:22px;
  font-weight:800;
}
.accuracy-score.good{ color:var(--accent-dark); }
.accuracy-score.mid{ color:var(--gold); }
.accuracy-score.low{ color:var(--red); }

.transcript-label{
  font-size:11px;
  text-transform:uppercase;
  color:var(--muted);
  font-weight:700;
  margin-bottom:6px;
}
.transcript-box{
  font-size:15px;
  line-height:1.6;
  padding:10px 12px;
  background:var(--bg);
  border-radius:10px;
  border:1px solid var(--border);
}
.word-correct{ color:var(--accent-dark); font-weight:600; }
.word-wrong{ color:var(--red); font-weight:600; text-decoration:line-through; text-decoration-color:var(--red-light); }

.no-support{
  font-size:12px;
  color:var(--muted);
  text-align:center;
  padding:6px;
}

/* ---------- Focus Mode ---------- */
body.focus-mode .lesson-section,
body.focus-mode .cards,
body.focus-mode .filter-bar,
body.focus-mode .lesson-nav,
body.focus-mode .progress-container,
body.focus-mode header p,
body.focus-mode header h1,
body.focus-mode header button,
body.focus-mode header a,
body.focus-mode #themeToggle,
body.focus-mode #authBox{
  display:none !important;
}

body.focus-mode header{
  padding:15px 25px 5px;
}

body.focus-mode .utility-bar{
  padding:10px 0 0;
}

/* ---------- Library ---------- */
body.library-mode .curriculum-only,
body.library-item-mode .curriculum-only{
  display:none;
}

body.library-mode #playerArea{
  display:none;
}

body:not(.library-mode) #libraryBrowser{
  display:none;
}

body:not(.library-item-mode) .back-to-library-btn{
  display:none;
}

.back-to-library-btn{
  display:inline-flex;
  align-items:center;
  gap:6px;
  width:90%;
  max-width:900px;
  margin:0 auto 15px;
  background:transparent;
  border:1.5px solid var(--border);
  color:var(--muted);
  padding:8px 18px;
  font-size:14px;
  border-radius:50px;
  cursor:pointer;
}
.back-to-library-btn:hover{
  border-color:var(--accent);
  color:var(--text);
}

#libraryBrowser{
  width:90%;
  max-width:900px;
  margin:20px auto;
}

.library-categories{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  justify-content:center;
}

.library-cat-btn{
  margin-top:0;
  background:var(--card-bg);
  color:var(--text);
  border:1.5px solid var(--border);
  padding:14px 20px;
  border-radius:16px;
  font-size:15px;
  font-weight:600;
  cursor:pointer;
  box-shadow:0 5px 15px var(--shadow);
}
.library-cat-btn:hover{
  border-color:var(--accent);
}

.library-back-btn{
  margin-top:0;
  background:transparent;
  border:1.5px solid var(--border);
  color:var(--muted);
  padding:8px 16px;
  border-radius:50px;
  font-size:13px;
  cursor:pointer;
  grid-column:1 / -1;
  justify-self:start;
}

.library-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));
  gap:16px;
}

.library-item-card{
  background:var(--card-bg);
  border:1.5px solid var(--border);
  border-radius:18px;
  padding:20px;
  box-shadow:0 5px 15px var(--shadow);
  cursor:pointer;
  transition:transform .15s ease, border-color .15s ease;
}
.library-item-card:hover{
  border-color:var(--accent);
  transform:translateY(-2px);
}

.library-item-title{
  font-weight:700;
  font-size:16px;
  color:var(--text);
  margin-bottom:6px;
}

.library-item-level{
  display:inline-block;
  background:var(--tag-bg);
  color:var(--text);
  padding:3px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
}

.library-empty{
  color:var(--muted);
  font-size:14px;
  grid-column:1 / -1;
}

#authBox {
  text-align: center;
  margin: 30px auto;
  padding: 15px;
}

/* ---------- Mobile ---------- */
@media (max-width:480px){
  h1{font-size:30px;}
  .word{font-size:26px;}
  .lesson-nav{flex-direction:column;gap:10px;}
  .utility-bar{gap:8px;}
  .shadow-controls{gap:14px;}
  .shadow-card, .lesson-section, .practice-card{padding:25px 18px;}
  .mode-btn{padding:8px 14px 8px 12px; font-size:13px;}
}

</style>
</head>

<body>

<div class="utility-bar">
  <button id="themeToggle" class="mode-btn">
    <span class="icon" id="themeIcon">
      <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </span>
    <span class="label" id="themeLabel">Dark Mode</span>
  </button>
  <button id="focusToggle" class="mode-btn">
    <span class="icon">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="1.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22.5" y2="12"/></svg>
    </span>
    <span class="label" id="focusLabel">Focus Mode</span>
  </button>
  <button id="myVocabToggle" class="mode-btn">
    <span class="icon">
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 12 2"/></svg>
    </span>
    <span class="label" id="myVocabLabel">My Words</span>
  </button>
  <button id="libraryToggle" class="mode-btn">
    <span class="icon">
      <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    </span>
    <span class="label" id="libraryLabel">Library</span>
  </button>
</div>

<header>
  <h1>EnglishWith_EK</h1>
  <p>Listen • Repeat • Speak Naturally</p>
  <button id="startShadowingBtn">Start Shadowing</button> 
  <a href="achievements.html" style="display:inline-block; margin-top:10px; padding:8px 16px; background:#fff; border:1px solid #E1DACB; border-radius:8px; text-decoration:none; color:#2B241F; font-weight:600;">🏆 Achievements</a>
</header>

<div class="progress-container curriculum-only">
  <div id="progressText">0 / 0 lessons completed</div>
  <div class="progress-bg">
    <div id="progressBar" class="progress-fill"></div>
  </div>
</div>

<div class="filter-bar curriculum-only">
  <label for="levelFilter">🎓 Filter by level (CEFR):</label>
  <select id="levelFilter"></select>
</div>

<div id="libraryBrowser">
  <div class="library-categories" id="libraryCategories"></div>
  <div class="library-grid" id="libraryGrid" style="display:none;"></div>
</div>

<div class="lesson-section" id="myVocabSection" style="display:none;">
  <h3>⭐ My Saved Words</h3>
  <table class="vocab-table">
    <thead>
      <tr><th>Word</th><th>Meaning</th><th>Action</th></tr>
    </thead>
    <tbody id="myVocabBody"></tbody>
  </table>
  <p id="myVocabEmpty" style="display:none;">No saved words yet. Tap ⭐ next to any word in the Vocabulary table to save it.</p>
</div>

<div class="lesson-nav curriculum-only">
  <button id="prevLessonBtn">◀ Previous Lesson</button>
  <span class="lesson-progress" id="lessonProgress">Lesson 1 / 30</span>
  <button id="nextLessonBtn">Next Lesson ▶</button>
</div>

<button id="backToLibraryBtn" class="back-to-library-btn">← Back to Library</button>

<div id="playerArea">

<div class="lesson-title">
  <span class="lesson-number" id="lessonNumber">Lesson 01</span>
  <h2 id="lessonTitle"></h2>
</div>

<div class="video">
  <div id="lessonVideo"></div>
</div>

<div class="shadow-card">

  <div class="shadow-controls">

    <div class="playback-group">
      <button id="prevBtn" class="icon-btn" aria-label="Previous sentence">
        <svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
      </button>
      <button class="play-btn" id="playBtn" aria-label="Play">
        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
      <button id="nextBtn" class="icon-btn" aria-label="Next sentence">
        <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
      </button>
    </div>

    <div class="settings-group">
      <button id="syncBtn" class="loop-btn sync-btn">
        <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        Sync
      </button>
      <button id="loopBtn" class="loop-btn">
        <svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
        Loop
      </button>
      <select id="speedSelect">
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1" selected>1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>

  </div>

  <div class="sentence" id="sentence"></div>

</div>

<div class="practice-card">
  <h3>🎙️ Practice Your Pronunciation</h3>
  <div class="practice-sub">Listen to the sentence, then record yourself repeating it</div>

  <div class="practice-target">
    <div class="ptlabel">Current Sentence</div>
    <div class="ptsentence" id="ptSentence">—</div>
    <button class="listen-btn" id="listenBtn">
      <svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
      Listen to Original
    </button>
  </div>

  <div class="record-wrap" id="recordWrap">
    <div class="pulse-ring"></div>
    <button class="record-btn" id="recordBtn" aria-label="Start recording">
      <svg id="micIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
      <svg id="stopIcon" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
        <rect x="6" y="6" width="12" height="12" rx="2"></rect>
      </svg>
    </button>
  </div>

  <div class="practice-status" id="practiceStatus">Tap to start recording</div>

  <div class="playback-row" id="playbackRow">
    <button class="play-my-btn" id="playMyBtn">
      <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
      Play My Voice
    </button>
    <button class="redo-btn" id="redoBtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
      </svg>
      Redo
    </button>
  </div>

  <div class="result-box" id="resultBox">
    <div class="accuracy-row">
      <span class="alabel">Pronunciation Match</span>
      <span class="accuracy-score" id="accuracyScore">--%</span>
    </div>
    <div class="transcript-label">What we heard you say</div>
    <div class="transcript-box" id="transcriptBox">—</div>
  </div>

  <div class="no-support" id="noSupport" style="display:none;">
    Speech recognition isn't supported in this browser. Try Chrome on desktop or Android for pronunciation analysis.
  </div>
</div>

<div class="lesson-section">
  <h3>📚 Vocabulary</h3>
  <table class="vocab-table">
    <thead>
      <tr><th>Word</th><th>Meaning</th><th>Save</th></tr>
    </thead>
    <tbody id="vocabBody"></tbody>
  </table>
</div>

<div class="lesson-section">
  <h3>💬 Useful Expressions</h3>
  <ul class="expressions-list" id="expressionsList"></ul>
</div>

<div class="lesson-section">
  <h3>❓ Reflection Question</h3>
  <div class="reflection-box" id="reflectionBox"></div>
</div>

<div class="lesson-section quote-section">
  <p id="quoteText"></p>
</div>

</div><div class="cards curriculum-only">
  <div class="card">
    <h2>Daily Conversation</h2>
    <p>Practice everyday English.</p>
  </div>

  <div class="card">
    <h2>Psychology</h2>
    <p>Learn through powerful ideas.</p>
  </div>

  <div class="card">
    <h2>Motivation</h2>
    <p>Improve English while growing.</p>
  </div>
</div>

<div id="authBox">
    <button id="loginBtn">🔑 Sign in with Google</button>
    <button id="logoutBtn" style="display:none;">🚪 Sign Out</button>
    <p id="userName"></p>
</div>

<script src="lessons.js"></script>
<script src="https://www.youtube.com/iframe_api"></script>
<script>

let currentLesson = 0;
let sentenceIndex = 0;
let wordIndex = -1;
let playing = false;
let timer = null;
let loopSentence = false;
let player = null;
let pendingVideoId = null;
let levelFilter = "All";
let filteredLessons = typeof lessons !== 'undefined' ? lessons.map((l, i) => i) : [];
const baseWordInterval = 500; // ms per word at 1x speed
let syncMode = false;
let syncPollTimer = null;

const sentenceEl = document.getElementById("sentence");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const loopBtn = document.getElementById("loopBtn");
const syncBtn = document.getElementById("syncBtn");
const speedSelect = document.getElementById("speedSelect");
const prevLessonBtn = document.getElementById("prevLessonBtn");
const nextLessonBtn = document.getElementById("nextLessonBtn");
const lessonProgress = document.getElementById("lessonProgress");
const lessonNumber = document.getElementById("lessonNumber");
const lessonTitle = document.getElementById("lessonTitle");
const vocabBody = document.getElementById("vocabBody");
const expressionsList = document.getElementById("expressionsList");
const reflectionBox = document.getElementById("reflectionBox");
const quoteText = document.getElementById("quoteText");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const focusToggle = document.getElementById("focusToggle");
const focusLabel = document.getElementById("focusLabel");
const levelSelect = document.getElementById("levelFilter");
const myVocabToggle = document.getElementById("myVocabToggle");
const myVocabLabel = document.getElementById("myVocabLabel");
const myVocabSection = document.getElementById("myVocabSection");
const myVocabBody = document.getElementById("myVocabBody");
const myVocabEmpty = document.getElementById("myVocabEmpty");
const libraryToggle = document.getElementById("libraryToggle");
const libraryLabel = document.getElementById("libraryLabel");
const libraryBrowser = document.getElementById("libraryBrowser");
const libraryCategoriesEl = document.getElementById("libraryCategories");
const libraryGridEl = document.getElementById("libraryGrid");
const backToLibraryBtn = document.getElementById("backToLibraryBtn");

/* ---------- Icons ---------- */
const ICON_MOON = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
const ICON_SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="1.5" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22.5"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="1.5" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22.5" y2="12"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

/* ---------- Dark / Light Mode ---------- */
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ek-theme", theme);
  const isDark = theme === "dark";
  themeIcon.innerHTML = isDark ? ICON_SUN : ICON_MOON;
  themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.classList.toggle("active", isDark);
}

applyTheme(localStorage.getItem("ek-theme") || "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Focus Mode ---------- */
focusToggle.addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
  const active = document.body.classList.contains("focus-mode");
  focusToggle.classList.toggle("active", active);
  focusLabel.textContent = active ? "Exit Focus" : "Focus Mode";
});

/* ---------- Start Shadowing Button Smooth Scroll ---------- */
document.getElementById("startShadowingBtn").addEventListener("click", () => {
  document.getElementById("playerArea").scrollIntoView({ behavior: 'smooth' });
});

/* ---------- Library Content ---------- */
const libraryContent = (typeof window.libraryContent !== "undefined") ? window.libraryContent : [
  { category: "Podcasts", title: "Demo Podcast Episode", level: "B2", videoId: "",
    sentences: [["This","is","a","demo","podcast","sentence."]], sentenceTimes: [0],
    vocab: [["Demo","An example used for testing"]], expressions: ["This is just a demo."],
    reflection: "Replace this with a real podcast episode.", quote: "Real content coming soon." }
];

const LIBRARY_CATEGORIES = [
  { key: "Podcasts", label: "🎙 Podcasts" },
  { key: "Movies", label: "🎬 Movies" },
  { key: "TED Talks", label: "🎓 TED Talks" },
  { key: "News", label: "📰 News" },
  { key: "Conversations", label: "💬 Conversations" },
  { key: "Audiobooks", label: "📚 Audiobooks" },
  { key: "Stories", label: "📖 Stories" }
];

let currentLibraryCategory = null;
let currentLibraryItem = null;

function getActiveContent(){
  return document.body.classList.contains("library-item-mode") ? currentLibraryItem : lessons[currentLesson];
}

function renderLibraryCategories(){
  libraryGridEl.style.display = "none";
  libraryCategoriesEl.style.display = "flex";
  libraryCategoriesEl.innerHTML = "";
  LIBRARY_CATEGORIES.forEach(cat => {
    const count = libraryContent.filter(i => i.category === cat.key).length;
    const btn = document.createElement("button");
    btn.className = "library-cat-btn";
    btn.textContent = cat.label + " (" + count + ")";
    btn.addEventListener("click", () => {
      currentLibraryCategory = cat.key;
      renderLibraryGrid(cat.key);
    });
    libraryCategoriesEl.appendChild(btn);
  });
}

function renderLibraryGrid(categoryKey){
  libraryCategoriesEl.style.display = "none";
  libraryGridEl.style.display = "grid";
  libraryGridEl.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.className = "library-back-btn";
  backBtn.textContent = "← Categories";
  backBtn.addEventListener("click", renderLibraryCategories);
  libraryGridEl.appendChild(backBtn);

  const items = libraryContent.filter(i => i.category === categoryKey);

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "library-empty";
    empty.textContent = "No items in this category yet.";
    libraryGridEl.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "library-item-card";
    card.innerHTML =
      "<div class=\"library-item-title\">" + item.title + "</div>" +
      "<div class=\"library-item-level\">" + (item.level || "") + "</div>";
    card.addEventListener("click", () => openLibraryItem(item));
    libraryGridEl.appendChild(card);
  });
}

function openLibraryItem(item){
  pause();
  stopSyncPolling();
  syncMode = false;
  syncBtn.classList.remove("active");
  setSyncControlsDisabled(false);

  currentLibraryItem = item;
  document.body.classList.remove("library-mode");
  document.body.classList.add("library-item-mode");
  libraryToggle.classList.add("active");
  libraryLabel.textContent = "My Lessons";

  lessonTitle.textContent = item.title;
  lessonNumber.textContent = (item.category || "Library") + (item.level ? " · " + item.level : "");

  loadVideo(item.videoId);
  renderVocabTable(item);

  expressionsList.innerHTML = "";
  (item.expressions || []).forEach(exp => {
    const li = document.createElement("li");
    li.textContent = exp;
    expressionsList.appendChild(li);
  });

  reflectionBox.textContent = item.reflection || "";
  quoteText.textContent = item.quote ? "\"" + item.quote + "\"" : "";

  sentenceIndex = 0;
  wordIndex = -1;
  renderSentence();
  updatePracticeTarget();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

libraryToggle.addEventListener("click", () => {
  const inLibrary = document.body.classList.contains("library-mode") || document.body.classList.contains("library-item-mode");
  if (inLibrary) {
    document.body.classList.remove("library-mode", "library-item-mode");
    libraryToggle.classList.remove("active");
    libraryLabel.textContent = "Library";
  } else {
    pause();
    stopSyncPolling();
    document.body.classList.add("library-mode");
    libraryToggle.classList.add("active");
    libraryLabel.textContent = "My Lessons";
    renderLibraryCategories();
  }
});

backToLibraryBtn.addEventListener("click", () => {
  pause();
  stopSyncPolling();
  document.body.classList.remove("library-item-mode");
  document.body.classList.add("library-mode");
  if (currentLibraryCategory) {
    renderLibraryGrid(currentLibraryCategory);
  } else {
    renderLibraryCategories();
  }
});

/* ---------- CEFR Level Filter ---------- */
function buildLevelOptions(){
  const levels = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];
  levelSelect.innerHTML = "";
  levels.forEach(lvl => {
    const opt = document.createElement("option");
    opt.value = lvl;
    opt.textContent = lvl;
    levelSelect.appendChild(opt);
  });
}

function applyFilter(lvl){
  levelFilter = lvl;
  filteredLessons = lessons
    .map((l, i) => i)
    .filter(i => lvl === "All" || lessons[i].level === lvl);

  if (filteredLessons.length === 0) filteredLessons = lessons.map((l, i) => i);

  if (!filteredLessons.includes(currentLesson)) {
    loadLesson(filteredLessons[0]);
  } else {
    updateLessonNavUI();
  }
}

levelSelect.addEventListener("change", () => applyFilter(levelSelect.value));

function updateLessonNavUI(){
  const pos = filteredLessons.indexOf(currentLesson);
  const num = String(currentLesson + 1).padStart(2, "0");
  lessonNumber.textContent = "Lesson " + num;
  lessonProgress.textContent = "Lesson " + (pos + 1) + " / " + filteredLessons.length;
  prevLessonBtn.disabled = pos <= 0;
  nextLessonBtn.disabled = pos >= filteredLessons.length - 1;
}

/* ---------- Saved Vocabulary (localStorage) ---------- */
function getSavedVocab(){
  try {
    return JSON.parse(localStorage.getItem("ek-saved-vocab")) || [];
  } catch (e) {
    return [];
  }
}

function isWordSaved(word){
  return getSavedVocab().some(item => item.word === word);
}

function saveVocabWord(word, meaning){
  const saved = getSavedVocab();
  if (!saved.some(item => item.word === word)) {
    saved.push({ word, meaning });
    localStorage.setItem("ek-saved-vocab", JSON.stringify(saved));
  }
}

function removeVocabWord(word){
  const saved = getSavedVocab().filter(item => item.word !== word);
  localStorage.setItem("ek-saved-vocab", JSON.stringify(saved));
}

function renderVocabTable(lesson){
  vocabBody.innerHTML = "";
  if(!lesson || !lesson.vocab) return;
  lesson.vocab.forEach(([word, meaning]) => {
    const saved = isWordSaved(word);
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + word + "</td>" +
      "<td>" + meaning + "</td>" +
      "<td><button class=\"save-word-btn" + (saved ? " saved" : "") + "\" data-word=\"" + word + "\" data-meaning=\"" + meaning.replace(/"/g, "&quot;") + "\">" + (saved ? "★" : "☆") + "</button></td>";
    vocabBody.appendChild(tr);
  });
}

function renderMyVocabPanel(){
  const saved = getSavedVocab();
  myVocabBody.innerHTML = "";
  if (saved.length === 0) {
    myVocabEmpty.style.display = "block";
    return;
  }
  myVocabEmpty.style.display = "none";
  saved.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + item.word + "</td>" +
      "<td>" + item.meaning + "</td>" +
      "<td><button class=\"remove-word-btn\" data-word=\"" + item.word + "\">🗑️</button></td>";
    myVocabBody.appendChild(tr);
  });
}

vocabBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".save-word-btn");
  if (!btn) return;
  const word = btn.dataset.word;
  const meaning = btn.dataset.meaning;
  if (isWordSaved(word)) {
    removeVocabWord(word);
  } else {
    saveVocabWord(word, meaning);
  }
  renderVocabTable(getActiveContent());
  renderMyVocabPanel();
});

myVocabBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-word-btn");
  if (!btn) return;
  removeVocabWord(btn.dataset.word);
  renderVocabTable(getActiveContent());
  renderMyVocabPanel();
});

myVocabToggle.addEventListener("click", () => {
  const showing = myVocabSection.style.display !== "none";
  myVocabSection.style.display = showing ? "none" : "block";
  myVocabToggle.classList.toggle("active", !showing);
  myVocabLabel.textContent = showing ? "My Words" : "Hide My Words";
  if (!showing) renderMyVocabPanel();
});

/* ---------- YouTube Player ---------- */
function onYouTubeIframeAPIReady(){
  if(typeof lessons === 'undefined' || !lessons[currentLesson]) return;
  player = new YT.Player("lessonVideo", {
    videoId: pendingVideoId || lessons[currentLesson].videoId,
    playerVars: { rel: 0 },
    events: {
      onReady: () => {
        if (pendingVideoId) {
          player.loadVideoById(pendingVideoId);
          pendingVideoId = null;
        }
        player.setPlaybackRate(parseFloat(speedSelect.value));
      }
    }
  });
}

function loadVideo(videoId){
  if (player && player.loadVideoById) {
    player.loadVideoById(videoId);
    player.setPlaybackRate(parseFloat(speedSelect.value));
  } else {
    pendingVideoId = videoId;
  }
}

function getWordInterval(){
  return baseWordInterval / parseFloat(speedSelect.value);
}

speedSelect.addEventListener("change", () => {
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(parseFloat(speedSelect.value));
  }
  if (playing) {
    clearInterval(timer);
    timer = setInterval(stepWord, getWordInterval());
  }
});

/* ---------- Loop Sentence ---------- */
loopBtn.addEventListener("click", () => {
  loopSentence = !loopSentence;
  loopBtn.classList.toggle("active", loopSentence);
});

/* ---------- Sync ---------- */
function getSentenceTimes(){
  return getActiveContent().sentenceTimes || null;
}

function findSentenceIndexForTime(times, t){
  let idx = 0;
  for (let i = 0; i < times.length; i++){
    if (t >= times[i]) idx = i;
    else break;
  }
  return idx;
}

function startSyncedWordAnimation(){
  clearInterval(timer);
  const times = getSentenceTimes();
  const rawWords = getActiveContent().sentences[sentenceIndex];
  const words = Array.isArray(rawWords) ? rawWords : rawWords.split(" ");
  const start = times[sentenceIndex];
  const end = times[sentenceIndex + 1] != null ? times[sentenceIndex + 1] : start + 5;
  const duration = Math.max(end - start, 1);
  const interval = (duration * 1000) / words.length;

  playing = true;
  playBtn.innerHTML = ICON_PAUSE;
  timer = setInterval(stepWord, interval);
}

function startSyncPolling(){
  stopSyncPolling();
  syncPollTimer = setInterval(() => {
    if (!player || !player.getCurrentTime) return;
    const times = getSentenceTimes();
    if (!times) return;

    const t = player.getCurrentTime();
    const idx = findSentenceIndexForTime(times, t);

    if (idx !== sentenceIndex) {
      sentenceIndex = idx;
      wordIndex = -1;
      renderSentence();
      updatePracticeTarget();
      startSyncedWordAnimation();
    }
  }, 300);
}

function stopSyncPolling(){
  if (syncPollTimer) clearInterval(syncPollTimer);
  syncPollTimer = null;
}

function setSyncControlsDisabled(disabled){
  prevBtn.disabled = disabled;
  nextBtn.disabled = disabled;
  playBtn.disabled = disabled;
}

syncBtn.addEventListener("click", () => {
  if (!syncMode) {
    if (!getSentenceTimes()) {
      alert("This lesson doesn't have sentence timing data yet.");
      return;
    }
    syncMode = true;
    syncBtn.classList.add("active");
    pause();
    setSyncControlsDisabled(true);
    startSyncPolling();
  } else {
    syncMode = false;
    syncBtn.classList.remove("active");
    stopSyncPolling();
    pause();
    setSyncControlsDisabled(false);
  }
});

/* ---------- Lesson Loading ---------- */
function loadLesson(index){
  pause();
  stopSyncPolling();
  syncMode = false;
  syncBtn.classList.remove("active");
  setSyncControlsDisabled(false);
  currentLesson = index;
  const lesson = lessons[currentLesson];

  if(!lesson) return;

  lessonTitle.textContent = lesson.title;
  loadVideo(lesson.videoId);

  renderVocabTable(lesson);

  expressionsList.innerHTML = "";
  if(lesson.expressions) {
    lesson.expressions.forEach(exp => {
      const li = document.createElement("li");
      li.textContent = exp;
      expressionsList.appendChild(li);
    });
  }

  reflectionBox.textContent = lesson.reflection || "";
  quoteText.textContent = lesson.quote ? "\"" + lesson.quote + "\"" : "";

  sentenceIndex = 0;
  wordIndex = -1;
  renderSentence();
  updatePracticeTarget();

  updateLessonNavUI();
}

function renderSentence() {
    const activeContent = getActiveContent();
    if(!activeContent || !activeContent.sentences || !activeContent.sentences[sentenceIndex]) return;

    let sentence = activeContent.sentences[sentenceIndex];
    if (Array.isArray(sentence)) {
        sentence = sentence.join(" ");
    }

    const words = sentence.split(" ");
    sentenceEl.innerHTML = "";

    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;

        if (index < wordIndex) span.classList.add("done");
        if (index === wordIndex) span.classList.add("active");

        sentenceEl.appendChild(span);
        sentenceEl.append(" ");
    });
}

function stepWord() {
    const activeContent = getActiveContent();
    if(!activeContent || !activeContent.sentences) return;

    const rawWords = activeContent.sentences[sentenceIndex];
    const words = Array.isArray(rawWords) ? rawWords : rawWords.split(" ");

    wordIndex++;

    if (wordIndex >= words.length) {
        if (loopSentence) {
            wordIndex = -1;
            renderSentence();
            return;
        }
        wordIndex = words.length - 1;
        renderSentence();
        pause();
        return;
    }

    renderSentence();
}

function play(){
  playing = true;
  playBtn.innerHTML = ICON_PAUSE;
  playBtn.setAttribute("aria-label", "Pause");
  timer = setInterval(stepWord, getWordInterval());
}

function pause(){
  playing = false;
  playBtn.innerHTML = ICON_PLAY;
  playBtn.setAttribute("aria-label", "Play");
  clearInterval(timer);
}

playBtn.addEventListener("click", () => {
  const activeContent = getActiveContent();
  if(!activeContent || !activeContent.sentences) return;
  
  const rawWords = activeContent.sentences[sentenceIndex];
  const words = Array.isArray(rawWords) ? rawWords : rawWords.split(" ");
  if(playing){
    pause();
  } else {
    if(wordIndex >= words.length - 1){
      wordIndex = -1;
    }
    play();
  }
});

nextBtn.addEventListener("click", () => {
  pause();
  const total = getActiveContent().sentences.length;
  sentenceIndex = (sentenceIndex + 1) % total;
  wordIndex = -1;
  renderSentence();
  updatePracticeTarget();
});

prevBtn.addEventListener("click", () => {
  pause();
  const total = getActiveContent().sentences.length;
  sentenceIndex = (sentenceIndex - 1 + total) % total;
  wordIndex = -1;
  renderSentence();
  updatePracticeTarget();
});

nextLessonBtn.addEventListener("click", () => {
  if (typeof markLessonComplete === "function") markLessonComplete(currentLesson);

  const pos = filteredLessons.indexOf(currentLesson);
  if (pos < filteredLessons.length - 1) {
    loadLesson(filteredLessons[pos + 1]);
  } else {
    if (typeof updateProgressUI === "function") updateProgressUI();
    alert("🎉 Congratulations! You have completed all lessons in this category.");
  }
});

prevLessonBtn.addEventListener("click", () => {
    const pos = filteredLessons.indexOf(currentLesson);
    if (pos > 0) loadLesson(filteredLessons[pos - 1]);
});

/* ---------- Voice Practice ---------- */
const ptSentence = document.getElementById("ptSentence");
const listenBtn = document.getElementById("listenBtn");

const recordWrap = document.getElementById("recordWrap");
const recordBtn = document.getElementById("recordBtn");
const micIcon = document.getElementById("micIcon");
const stopIcon = document.getElementById("stopIcon");
const practiceStatus = document.getElementById("practiceStatus");

const playbackRow = document.getElementById("playbackRow");
const playMyBtn = document.getElementById("playMyBtn");
const redoBtn = document.getElementById("redoBtn");

const resultBox = document.getElementById("resultBox");
const accuracyScore = document.getElementById("accuracyScore");
const transcriptBox = document.getElementById("transcriptBox");
const noSupport = document.getElementById("noSupport");

let mediaRecorder;
let audioChunks = [];
let audioURL;
let isRecording = false;

function getCurrentTargetSentence(){
  const activeContent = getActiveContent();
  if(!activeContent || !activeContent.sentences) return "";
  let sentence = activeContent.sentences[sentenceIndex];
  if (Array.isArray(sentence)) sentence = sentence.join(" ");
  return sentence;
}

function updatePracticeTarget(){
  ptSentence.textContent = getCurrentTargetSentence() || "—";
  resetPracticeUI();
}

function resetPracticeUI(){
  playbackRow.classList.remove("visible");
  resultBox.classList.remove("visible");
  practiceStatus.textContent = "Tap to start recording";
  practiceStatus.className = "practice-status";
  audioChunks = [];
  recognizedText = "";
}

listenBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(getCurrentTargetSentence());
  utter.lang = "en-US";
  utter.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let recognizedText = "";
let recognitionEnded = false;
let recordingStopped = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    recognizedText = event.results[0][0].transcript;
  };

  recognition.onerror = () => {};

  recognition.onend = () => {
    recognitionEnded = true;
    maybeShowResults();
  };
} else {
  noSupport.style.display = "block";
}

function maybeShowResults(){
  if (recordingStopped && (recognitionEnded || !SpeechRecognition)) {
    showPracticeResults();
  }
}

function pickSupportedMimeType(){
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus"
  ];
  for (const type of candidates) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return "";
}

recordBtn.addEventListener("click", async () => {
  if (!isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const mimeType = pickSupportedMimeType();
      mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

      audioChunks = [];
      recognizedText = "";
      recognitionEnded = false;
      recordingStopped = false;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blobType = mediaRecorder.mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunks, { type: blobType });
        audioURL = URL.createObjectURL(audioBlob);
        playbackRow.classList.add("visible");

        if (audioBlob.size < 1000) {
          practiceStatus.textContent = "⚠️ Recording seems empty — check mic permission and try again";
          practiceStatus.className = "practice-status recording";
        } else {
          practiceStatus.textContent = SpeechRecognition ? "Analyzing pronunciation..." : "Recording saved ✓";
          practiceStatus.className = "practice-status ready";
        }

        stream.getTracks().forEach(track => track.stop());

        recordingStopped = true;
        maybeShowResults();
      };

      mediaRecorder.start(250);
      if (recognition) {
        try { recognition.start(); } catch (e) {}
      }
      isRecording = true;

      recordBtn.classList.add("recording");
      recordWrap.classList.add("recording");
      micIcon.style.display = "none";
      stopIcon.style.display = "block";
      practiceStatus.textContent = "Recording... tap to stop";
      practiceStatus.className = "practice-status recording";
      playbackRow.classList.remove("visible");
      resultBox.classList.remove("visible");

    } catch (err) {
      practiceStatus.textContent = "Microphone access denied";
      practiceStatus.className = "practice-status recording";
    }

  } else {
    if(mediaRecorder) mediaRecorder.stop();
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
    isRecording = false;
    recordBtn.classList.remove("recording");
    recordWrap.classList.remove("recording");
    micIcon.style.display = "block";
    stopIcon.style.display = "none";
  }
});

playMyBtn.addEventListener("click", () => {
  if (!audioURL) return;
  const audio = new Audio(audioURL);
  audio.onerror = () => {
    practiceStatus.textContent = "⚠️ Couldn't play the recording";
    practiceStatus.className = "practice-status recording";
  };
  audio.play().catch(() => {
    practiceStatus.textContent = "⚠️ Couldn't play the recording";
    practiceStatus.className = "practice-status recording";
  });
});

redoBtn.addEventListener("click", () => {
  resetPracticeUI();
});

function normalizeWords(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function showPracticeResults() {
  if (!SpeechRecognition) return;

  practiceStatus.textContent = "Recording saved ✓";
  practiceStatus.className = "practice-status ready";

  const targetWords = normalizeWords(getCurrentTargetSentence());
  const saidWords = normalizeWords(recognizedText);

  let matches = 0;
  targetWords.forEach((word, i) => {
    const said = saidWords[i];
    if (said && said === word) matches++;
  });

  const pct = targetWords.length ? Math.round((matches / targetWords.length) * 100) : 0;

  accuracyScore.textContent = pct + "%";
  accuracyScore.className = "accuracy-score " + (pct >= 80 ? "good" : pct >= 50 ? "mid" : "low");
  transcriptBox.textContent = recognizedText || "(nothing recognized — try speaking clearly)";

  resultBox.classList.add("visible");
}

/* ---------- Initialisation ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildLevelOptions();
  if (typeof lessons !== 'undefined' && lessons.length > 0) {
    loadLesson(0);
  }
  if (typeof updateProgressUI === "function") {
    updateProgressUI();
  }
});

</script>

<script type="module" src="firebase.js"></script>

</body>
</html>
