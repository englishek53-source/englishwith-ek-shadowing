/* ============================================================
   EnglishWith_EK — Library Content (Demo)
   ------------------------------------------------------------
   A separate data file for the 📚 Library section, loaded by
   index.html BEFORE the main script (same technique as lessons.js).

   Each item follows the exact same structure as a lesson, plus
   two extra fields:
     category:  one of "podcast" | "movie" | "ted" | "news" |
                "conversation" | "audiobook" | "story"
     type:      a human-readable label for the format

   ⚠️ These are DEMO items so you can test the full flow
   (categories → item list → player with sentences + vocabulary).
   The videoId points at a demo video just so the player has
   something to show — replace every item with your real content.
   Keep the structure the same and everything will just work.
   ============================================================ */

const libraryContent = [

  /* ---------- 🎙 Podcasts ---------- */
  {
    category: "podcast",
    type: "Podcast",
    videoId: "8KkKuTCFvzI",
    title: "Podcast Demo: The Habit of Happiness",
    level: "B1",
    sentences: [
      ["What", "makes", "people", "happy", "in", "the", "long", "run?"],
      ["It's", "not", "fame,", "money,", "or", "working", "harder."],
      ["The", "answer", "is", "simple:", "warm", "relationships."],
      ["Take", "care", "of", "your", "connections,", "and", "they", "will", "take", "care", "of", "you."]
    ],
    vocab: [
      ["habit", "something you do regularly"],
      ["fame", "being known by many people"],
      ["warm", "friendly and kind"],
      ["connection", "a bond with someone"],
      ["long run", "a long period of time"]
    ],
    expressions: [
      "in the long run",
      "warm relationships",
      "take care of"
    ],
    reflection: "What is one habit that makes you happier?",
    quote: "The good life is built with good relationships."
  },

  /* ---------- 🎬 Movies ---------- */
  {
    category: "movie",
    type: "Movie",
    videoId: "Ks-_Mh1QhMc",
    title: "Movie Demo: The Job Interview",
    level: "B2",
    sentences: [
      ["Come", "in,", "please.", "Have", "a", "seat."],
      ["Thank", "you", "for", "taking", "the", "time", "to", "see", "me."],
      ["Tell", "me", "about", "yourself", "and", "your", "experience."],
      ["I", "believe", "a", "good", "first", "impression", "starts", "with", "confidence."],
      ["We'll", "be", "in", "touch", "by", "the", "end", "of", "the", "week."]
    ],
    vocab: [
      ["interview", "a formal meeting to assess someone"],
      ["impression", "the feeling someone makes on you"],
      ["experience", "knowledge gained from doing things"],
      ["confident", "sure of yourself"],
      ["candidate", "a person applying for a job"]
    ],
    expressions: [
      "have a seat",
      "be in touch",
      "first impression"
    ],
    reflection: "What do you do to feel confident before an important meeting?",
    quote: "Don't fake it till you make it. Fake it till you become it."
  },

  /* ---------- 🎓 TED Talks ---------- */
  {
    category: "ted",
    type: "TED Talk",
    videoId: "UNP03fDSj1U",
    title: "TED Demo: Change Your Habits in 30 Days",
    level: "A2",
    sentences: [
      ["Here's", "my", "challenge", "to", "you."],
      ["Try", "something", "new", "for", "thirty", "days."],
      ["It", "doesn't", "have", "to", "be", "big", "or", "expensive."],
      ["Small", "steps", "build", "big", "change."]
    ],
    vocab: [
      ["challenge", "a difficult task that tests you"],
      ["step", "one action toward a goal"],
      ["expensive", "costing a lot"],
      ["habit", "a regular action"]
    ],
    expressions: [
      "give it a try",
      "thirty days",
      "small steps"
    ],
    reflection: "What new habit will you try for the next thirty days?",
    quote: "What are you waiting for? The next thirty days are going to pass whether you like it or not."
  },

  /* ---------- 📰 News ---------- */
  {
    category: "news",
    type: "News",
    videoId: "qp0HIF3SfI4",
    title: "News Demo: The Power of Purpose",
    level: "B2",
    sentences: [
      ["Today,", "we", "look", "at", "why", "some", "companies", "inspire", "us", "more", "than", "others."],
      ["It", "all", "starts", "with", "a", "clear", "sense", "of", "purpose."],
      ["When", "people", "believe", "in", "the", "why,", "they", "follow", "the", "what."],
      ["The", "future", "belongs", "to", "those", "who", "lead", "with", "meaning."]
    ],
    vocab: [
      ["purpose", "the reason for doing something"],
      ["inspire", "to motivate others"],
      ["company", "a business organization"],
      ["meaning", "significance or value"],
      ["report", "a news broadcast or article"]
    ],
    expressions: [
      "a sense of purpose",
      "believe in",
      "belongs to"
    ],
    reflection: "What gives your work meaning?",
    quote: "People don't buy what you do; they buy why you do it."
  },

  /* ---------- 💬 Conversations ---------- */
  {
    category: "conversation",
    type: "Conversation",
    videoId: "iCvmsMzlF7o",
    title: "Conversation Demo: Small Talk at a Coffee Shop",
    level: "A2",
    sentences: [
      ["Hi", "there!", "What", "can", "I", "get", "for", "you", "today?"],
      ["I'd", "like", "a", "latte", "and", "a", "blueberry", "muffin,", "please."],
      ["Lovely", "weather", "we're", "having,", "isn't", "it?"],
      ["Absolutely!", "Perfect", "day", "for", "a", "walk", "in", "the", "park."],
      ["Have", "a", "great", "day!", "See", "you", "tomorrow."]
    ],
    vocab: [
      ["latte", "a coffee drink with milk"],
      ["muffin", "a small sweet baked good"],
      ["weather", "the state of the sky and air"],
      ["park", "a public green area"],
      ["order", "to ask for food or drink"]
    ],
    expressions: [
      "small talk",
      "have a great day",
      "see you tomorrow"
    ],
    reflection: "Practice this dialogue aloud with a friend. How did it feel?",
    quote: "Connection is why we are here."
  },

  /* ---------- 🎧 Audiobooks ---------- */
  {
    category: "audiobook",
    type: "Audiobook",
    videoId: "H14bBuluwB8",
    title: "Audiobook Demo: The Power of Grit",
    level: "C1",
    sentences: [
      ["Chapter", "three:", "the", "power", "of", "passion", "and", "perseverance."],
      ["Enthusiasm", "is", "common;", "endurance", "is", "rare."],
      ["The", "tortoise", "beats", "the", "hare", "when", "the", "race", "is", "long."],
      ["Keep", "your", "eyes", "on", "the", "finish", "line,", "and", "never", "stop", "moving."]
    ],
    vocab: [
      ["chapter", "a section of a book"],
      ["perseverance", "continuing despite difficulty"],
      ["endurance", "the ability to keep going"],
      ["enthusiasm", "strong excitement"],
      ["tortoise", "a slow-moving animal with a shell"]
    ],
    expressions: [
      "finish line",
      "keep your eyes on",
      "keep going"
    ],
    reflection: "What long-term goal deserves more of your grit?",
    quote: "Our potential is one thing. What we do with it is quite another."
  },

  /* ---------- 📖 Stories ---------- */
  {
    category: "story",
    type: "Story",
    videoId: "5MgBikgcWnY",
    title: "Story Demo: The Little Lighthouse",
    level: "A1",
    sentences: [
      ["Once", "upon", "a", "time,", "there", "was", "a", "little", "lighthouse."],
      ["It", "stood", "on", "a", "rock", "by", "the", "sea."],
      ["Every", "night,", "it", "lit", "the", "way", "for", "ships", "at", "sea."],
      ["One", "stormy", "night,", "its", "light", "went", "out."],
      ["But", "the", "little", "lighthouse", "never", "gave", "up,", "and", "soon", "it", "shone", "again."]
    ],
    vocab: [
      ["lighthouse", "a tower with a light that guides ships"],
      ["sea", "the large body of salt water"],
      ["storm", "bad weather with wind and rain"],
      ["shone", "past of shine"],
      ["gave up", "stopped trying"]
    ],
    expressions: [
      "once upon a time",
      "lit the way",
      "never gave up"
    ],
    reflection: "Can you retell this story in your own words?",
    quote: "Small lights can guide big ships home."
  }

];
