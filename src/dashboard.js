import { getSession, signOut } from "./auth.js";
import { loadProgress } from "./progress.js";

const LEVEL_MASTERED = 3;

// Each topic owns its own word list/app; the dashboard only needs enough to
// render a card and a rough progress figure. Topics are grouped into
// subcategories, which are grouped into top-level categories, so new
// subjects (or whole new categories) can be added without restructuring.
const CATEGORIES = [
  {
    id: "language",
    title: "Language",
    subcategories: [
      {
        id: "japanese",
        title: "Japanese",
        topics: [
          {
            id: "kana-en-loanwords",
            title: "Katakana & Hiragana",
            description:
              "Read English loanwords (コーヒー, ホテル, ...) written in katakana and hiragana.",
            href: "topics/kana/",
            totalItems: 60,
          },
          {
            id: "japanese-basic-vocab",
            title: "Basic Vocabulary",
            description:
              "Native Japanese words — greetings, numbers, family, everyday nouns & verbs.",
            href: "topics/japanese-vocab/",
            totalItems: 70,
          },
        ],
      },
      {
        id: "latin",
        title: "Latin",
        topics: [
          {
            id: "latin-inscriptions",
            title: "Latin Inscriptions",
            description:
              "Translate the abbreviations & formulas found on real Roman inscriptions (D M, H S E, S P Q R, ...).",
            href: "topics/latin/",
            totalItems: 54,
          },
        ],
      },
      {
        id: "mayan",
        title: "Mayan",
        topics: [
          {
            id: "mayan-inscriptions",
            title: "Maya Inscriptions",
            description:
              "Read bar-and-dot numerals and the core glyphs used on Classic-period monuments.",
            href: "topics/mayan/",
            totalItems: 42,
          },
        ],
      },
    ],
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
  for (const category of CATEGORIES) {
    const categoryEl = document.createElement("div");
    categoryEl.className = "category";

    const heading = document.createElement("h2");
    heading.className = "category-title";
    heading.textContent = category.title;
    categoryEl.appendChild(heading);

    for (const sub of category.subcategories) {
      const subEl = document.createElement("div");
      subEl.className = "subcategory";

      const subHeading = document.createElement("h3");
      subHeading.className = "subcategory-title";
      subHeading.textContent = sub.title;
      subEl.appendChild(subHeading);

      for (const topic of sub.topics) {
        const card = document.createElement("a");
        card.className = "topic-card";
        card.href = topic.href;
        card.innerHTML = `
          <div class="topic-title">${topic.title}</div>
          <div class="topic-desc">${topic.description}</div>
          <div class="topic-progress">Loading progress...</div>
        `;
        subEl.appendChild(card);

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

      categoryEl.appendChild(subEl);
    }

    topicListEl.appendChild(categoryEl);
  }
}

signoutBtn.addEventListener("click", async () => {
  await signOut();
  location.href = "login/index.html";
});
