import { getSession, signOut } from "./auth.js";
import { loadProgress } from "./progress.js";

const LEVEL_MASTERED = 3;

// Each topic owns its own word list/app; the dashboard only needs enough to
// render a card and a rough progress figure.
const TOPICS = [
  {
    id: "kana-en-loanwords",
    title: "Katakana & Hiragana",
    description:
      "Read English loanwords (コーヒー, ホテル, ...) written in katakana and hiragana.",
    href: "topics/kana/",
    totalItems: 60,
  },
  {
    id: "latin-inscriptions",
    title: "Latin Inscriptions",
    description:
      "Translate the abbreviations & formulas found on real Roman inscriptions (D M, H S E, S P Q R, ...).",
    href: "topics/latin/",
    totalItems: 54,
  },
];

const topicListEl = document.getElementById("topic-list");
const accountEmailEl = document.getElementById("account-email");
const signoutBtn = document.getElementById("signout-btn");

const session = await getSession();
if (!session) {
  location.href = "login/index.html";
} else {
  accountEmailEl.textContent = session.user.email;
  renderTopics();
}

async function renderTopics() {
  topicListEl.innerHTML = "";
  for (const topic of TOPICS) {
    const card = document.createElement("a");
    card.className = "topic-card";
    card.href = topic.href;
    card.innerHTML = `
      <div class="topic-title">${topic.title}</div>
      <div class="topic-desc">${topic.description}</div>
      <div class="topic-progress">Loading progress...</div>
    `;
    topicListEl.appendChild(card);

    try {
      const levels = await loadProgress(topic.id);
      const mastered = Object.values(levels).filter(
        (l) => l >= LEVEL_MASTERED
      ).length;
      card.querySelector(".topic-progress").textContent =
        `${mastered} / ${topic.totalItems} mastered`;
    } catch (err) {
      card.querySelector(".topic-progress").textContent =
        "Couldn't load progress";
    }
  }
}

signoutBtn.addEventListener("click", async () => {
  await signOut();
  location.href = "login/index.html";
});
