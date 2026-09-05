import { buildDeck } from "./data.js";
import { getSession, signOut } from "../../../src/auth.js";
import { loadProgress, saveProgress, resetProgress } from "../../../src/progress.js";

const TOPIC_ID = "mayan-inscriptions";
const MASTERY_STREAK = 2; // correct answers in a row needed to retire a card this session
const TYPED_FROM_LEVEL = 2; // overall level at which a word always requires typing, not MCQ
const LEVEL_MASTERED = 3; // overall level at which a word counts as permanently mastered

const screens = {
  start: document.getElementById("screen-start"),
  quiz: document.getElementById("screen-quiz"),
  summary: document.getElementById("screen-summary"),
};

const el = {
  startBtn: document.getElementById("start-btn"),
  resetProgressBtn: document.getElementById("reset-progress-btn"),
  overallProgress: document.getElementById("overall-progress"),
  progressBar: document.getElementById("progress-bar"),
  progressLabel: document.getElementById("progress-label"),
  prompt: document.getElementById("prompt"),
  noteHint: document.getElementById("note-hint"),
  choices: document.getElementById("choices"),
  typedForm: document.getElementById("typed-form"),
  typedInput: document.getElementById("typed-input"),
  feedback: document.getElementById("feedback"),
  nextBtn: document.getElementById("next-btn"),
  summaryStats: document.getElementById("summary-stats"),
  restartBtn: document.getElementById("restart-btn"),
  signoutBtn: document.getElementById("signout-btn"),
};

let userId = null;

// A dot = 1, a bar = 5, a shell = 0 — dots stack above bars, exactly as in
// a single position of a Long Count date.
function renderMayaNumeral(value) {
  if (value === 0) {
    return `<div class="maya-numeral"><div class="maya-shell" title="zero"></div></div>`;
  }
  const bars = Math.floor(value / 5);
  const dots = value % 5;
  const dotsHtml = dots
    ? `<div class="maya-dots">${'<span class="maya-dot"></span>'.repeat(dots)}</div>`
    : "";
  const barsHtml = bars
    ? `<div class="maya-bars">${'<span class="maya-bar"></span>'.repeat(bars)}</div>`
    : "";
  return `<div class="maya-numeral">${dotsHtml}${barsHtml}</div>`;
}

async function renderOverallProgress() {
  try {
    const progress = await loadProgress(TOPIC_ID);
    const words = buildDeck();
    const mastered = words.filter(
      (w) => (progress[w.english] || 0) >= LEVEL_MASTERED
    ).length;
    el.overallProgress.textContent =
      mastered === words.length
        ? `All ${words.length} entries permanently mastered — keep practicing to stay sharp!`
        : `${mastered} / ${words.length} entries permanently mastered`;
  } catch (err) {
    el.overallProgress.textContent = `Couldn't load progress: ${err.message}`;
  }
}

function showScreen(name) {
  for (const [key, node] of Object.entries(screens)) {
    node.classList.toggle("hidden", key !== name);
  }
}

// Ignore spacing/punctuation/case differences and tolerate a small typo on
// longer answers; numerals and short words still require an exact match.
function normalizeAnswer(text) {
  return text.trim().toLowerCase().replace(/[\s-]+/g, "");
}

function levenshtein(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      rows[i][j] =
        a[i - 1] === b[j - 1]
          ? rows[i - 1][j - 1]
          : 1 + Math.min(rows[i - 1][j], rows[i][j - 1], rows[i - 1][j - 1]);
    }
  }
  return rows[a.length][b.length];
}

function isCloseEnough(answer, expected) {
  const a = normalizeAnswer(answer);
  const b = normalizeAnswer(expected);
  if (a === b) return true;
  const shorter = Math.min(a.length, b.length);
  if (shorter < 4) return false;
  const tolerance = shorter >= 12 ? 2 : 1;
  return levenshtein(a, b) <= tolerance;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

class Session {
  constructor(deck, progress) {
    this.progress = progress;
    this.deck = deck;
    this.total = deck.length;
    this.mistakesByWord = new Map();
    this.correctCount = 0;
    this.wrongCount = 0;
    this.queue = shuffle(deck.map((word) => ({ word, streak: 0 })));
    this.current = null;
  }

  get masteredCount() {
    return this.total - this.queue.length - (this.current ? 1 : 0);
  }

  nextCard() {
    if (this.current) {
      this.queue.push(this.current);
    }
    if (this.queue.length === 0) {
      this.current = null;
      return null;
    }
    this.current = this.queue.shift();
    return this.buildQuestion(this.current);
  }

  buildQuestion(card) {
    const level = this.progress[card.word.english] || 0;
    const useTyped = card.streak > 0 || level >= TYPED_FROM_LEVEL;
    let choices = null;
    if (!useTyped) {
      // Keep distractors within the same kind of item (numerals vs.
      // vocab) so the options stay meaningfully comparable.
      const pool = shuffle(
        this.deck.filter(
          (w) => w.type === card.word.type && w.english !== card.word.english
        )
      ).slice(0, 3);
      choices = shuffle([card.word.english, ...pool.map((w) => w.english)]);
    }
    return {
      card,
      isNumeral: card.word.type === "numeral",
      promptHtml:
        card.word.type === "numeral"
          ? renderMayaNumeral(card.word.value)
          : null,
      promptText: card.word.type === "numeral" ? null : card.word.maya,
      note: card.word.note || "",
      useTyped,
      choices,
    };
  }

  submitAnswer(card, answer) {
    const correct = isCloseEnough(answer, card.word.english);
    if (correct) {
      this.correctCount++;
      card.streak++;
      if (card.streak < MASTERY_STREAK) {
        this.reinsertLater(card);
      } else {
        this.current = null; // mastered, drop from queue
      }
    } else {
      this.wrongCount++;
      card.streak = 0;
      this.mistakesByWord.set(
        card.word.english,
        (this.mistakesByWord.get(card.word.english) || 0) + 1
      );
      this.reinsertSoon(card);
    }
    return correct;
  }

  reinsertLater(card) {
    const pos = Math.min(this.queue.length, 4 + Math.floor(Math.random() * 3));
    this.queue.splice(pos, 0, card);
    this.current = null;
  }

  reinsertSoon(card) {
    const pos = Math.min(this.queue.length, 1 + Math.floor(Math.random() * 2));
    this.queue.splice(pos, 0, card);
    this.current = null;
  }
}

let session = null;
let currentQuestion = null;

async function startSession() {
  const deck = buildDeck();
  let progress;
  try {
    progress = await loadProgress(TOPIC_ID);
  } catch (err) {
    el.overallProgress.textContent = `Couldn't load progress: ${err.message}`;
    return;
  }
  session = new Session(deck, progress);
  showScreen("quiz");
  advance();
}

function advance() {
  const q = session.nextCard();
  updateProgressBar();
  if (!q) {
    endSession();
    return;
  }
  currentQuestion = q;
  renderQuestion(q);
}

function updateProgressBar() {
  const pct = Math.round((session.masteredCount / session.total) * 100);
  el.progressBar.style.width = `${pct}%`;
  el.progressLabel.textContent = `${session.masteredCount} / ${session.total} mastered`;
}

function renderQuestion(q) {
  el.feedback.textContent = "";
  el.feedback.className = "feedback";
  el.nextBtn.classList.add("hidden");
  if (q.isNumeral) {
    el.prompt.innerHTML = q.promptHtml;
  } else {
    el.prompt.textContent = q.promptText;
  }
  el.noteHint.textContent = "";
  el.noteHint.classList.add("hidden");

  el.choices.innerHTML = "";
  el.typedForm.classList.add("hidden");
  el.choices.classList.add("hidden");

  if (q.useTyped) {
    el.typedForm.classList.remove("hidden");
    el.typedInput.value = "";
    el.typedInput.disabled = false;
    el.typedInput.focus();
  } else {
    el.choices.classList.remove("hidden");
    for (const choice of q.choices) {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => handleAnswer(choice));
      el.choices.appendChild(btn);
    }
  }
}

function handleAnswer(answer) {
  const q = currentQuestion;
  const correct = session.submitAnswer(q.card, answer);

  el.typedInput.disabled = true;
  for (const btn of el.choices.querySelectorAll("button")) {
    btn.disabled = true;
    if (btn.textContent.toLowerCase() === q.card.word.english.toLowerCase()) {
      btn.classList.add("correct");
    } else if (btn.textContent === answer && !correct) {
      btn.classList.add("incorrect");
    }
  }

  if (correct) {
    el.feedback.textContent = "Correct!";
    el.feedback.className = "feedback correct";
  } else {
    el.feedback.textContent = `Not quite — that's "${q.card.word.english}"`;
    el.feedback.className = "feedback incorrect";
  }
  if (q.note) {
    el.noteHint.textContent = q.isNumeral ? q.note : `${q.promptText}  →  ${q.note}`;
    el.noteHint.classList.remove("hidden");
  }
  el.nextBtn.classList.remove("hidden");
  el.nextBtn.focus();
}

el.typedForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (el.typedInput.disabled) return;
  handleAnswer(el.typedInput.value);
});

el.nextBtn.addEventListener("click", advance);

async function endSession() {
  const progress = session.progress;
  const changed = {};
  for (const { english } of session.deck) {
    const mistakes = session.mistakesByWord.get(english) || 0;
    const level = progress[english] || 0;
    let newLevel = level;
    if (mistakes === 0) {
      newLevel = Math.min(LEVEL_MASTERED, level + 1);
    } else if (mistakes >= 2) {
      newLevel = Math.max(0, level - 1);
    }
    if (newLevel !== level) {
      progress[english] = newLevel;
      changed[english] = newLevel;
    }
  }
  let saveError = null;
  try {
    await saveProgress(TOPIC_ID, userId, changed);
  } catch (err) {
    saveError = err.message;
  }

  const accuracy = Math.round(
    (session.correctCount / (session.correctCount + session.wrongCount)) * 100
  );
  const overallMastered = session.deck.filter(
    (w) => (progress[w.english] || 0) >= LEVEL_MASTERED
  ).length;
  el.summaryStats.innerHTML = `
    <p><strong>${session.total}</strong> entries mastered this round</p>
    <p><strong>${session.correctCount}</strong> correct answers, <strong>${session.wrongCount}</strong> mistakes</p>
    <p><strong>${accuracy}%</strong> accuracy this session</p>
    <p><strong>${overallMastered}</strong> / ${session.deck.length} entries permanently mastered overall</p>
    ${saveError ? `<p class="feedback incorrect">Couldn't save progress: ${saveError}</p>` : ""}
  `;
  showScreen("summary");
}

el.startBtn.addEventListener("click", startSession);
el.restartBtn.addEventListener("click", async () => {
  await renderOverallProgress();
  showScreen("start");
});
el.resetProgressBtn.addEventListener("click", async () => {
  if (confirm("Reset all saved progress for this topic?")) {
    try {
      await resetProgress(TOPIC_ID, userId);
    } catch (err) {
      el.overallProgress.textContent = `Couldn't reset progress: ${err.message}`;
      return;
    }
    await renderOverallProgress();
  }
});
el.signoutBtn.addEventListener("click", async () => {
  await signOut();
  location.href = "../../login/index.html";
});

(async function main() {
  const authSession = await getSession();
  if (!authSession) {
    location.href = "../../login/index.html";
    return;
  }
  userId = authSession.user.id;
  await renderOverallProgress();
  showScreen("start");
})();
