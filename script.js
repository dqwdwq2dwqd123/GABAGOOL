/* =========================================================
   QUIZ CONFIG
   ✅ You choose the correct answer using correctIndex
   ========================================================= */

const quizData = [
  {
    question: "When poop is being quiet/silent during a game, what should Zakria do",
    options: [
      "STOP WHATEVER HE IS DOING AND ASK MARIA WHAT IS WRONG",
      "Carry on playing",
      "Carry on playing but ask just before bedtime"
    ],
    correctIndex: 0
  },
  {
    question: "When Maria has started replying to Zakria and texting, what should he do",
    options: [
      "Get his foot in the door and make plans to talk with poop",
      "Keep replying to the texts, [conversation will remain surface level]",
      "Beat around the bush",
      "Be cryptic"
    ],
    correctIndex: 0
  },
  {
    question: "When poop says 'I'm gonna go now', what should Zakria do",
    options: ["Admit defeat", "Fight for things more, advocate for poop to stay", "Say goodbye"],
    correctIndex: 1
  },
  {
    question: "What is the best reply in this situation",
    options: [
      "I will make this right poop",
      "I will make you better darling",
      "Darling I am going to make you feel better and make this right by doing the following..."
    ],
    correctIndex: 2
  },
  {
    question: "When poop has agreed to talk with Zakria, what should he do",
    options: [
      "Come with an idea of what he is going to say/talk about",
      "Stutter all over the place",
      "Repeat everything he has been saying"
    ],
    correctIndex: 0
  },
  {
    question: "God loves a WHAT DARLINGG",
    options: ["A TRIERR", "A FARTFACE IDIOT LOSER,"],
    correctIndex: 0
  },
  {
    question:
      "If it ever feels like poop has become a spectator/side character, something has gone wrong, what will Zakria do?",
    options: [
      "Make sure that poop doesn't feel like a side character, by involving poop and making her presence known, instead of casting her to one side",
      "Carry on as regular"
    ],
    correctIndex: 0
  },
  {
    question: "Poop requires what",
    options: ["Bubble Wrap", "TLC,", "Bakeups when upset", "All of the above"],
    correctIndex: 3
  },
  {
    question: "Which of the following is something that will make poop feel better",
    options: ["A matcha, brownie, dessert", "A wee message saying 'Poop I will make this right'", "Something that she has to suggest",],
    correctIndex: 0
  },
  {
    question: "When things are rough patchy, poop wants Zakria to be WHAT",
    options: ["AN EMBARASSING BITCH", "An assertive, emotionally intelligent baddie", "a BUM",],
    correctIndex: 1
  },

];

/* ===== STATE ===== */
let current = 0;
let chosen = [];
let score = 0;
let selectedIndex = null;

/* ===== ELEMENTS ===== */
const introScreen = document.getElementById("introScreen");
const quizApp = document.getElementById("quizApp");
const startBtn = document.getElementById("startBtn");

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");

const progressLabel = document.getElementById("progressLabel");
const scoreLabel = document.getElementById("scoreLabel");
const progressBar = document.getElementById("progressBar");

const revealScreen = document.getElementById("revealScreen");
const revealText = document.getElementById("revealText");
const restartBtn = document.getElementById("restartBtn");

/* ===== START ===== */
startBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  quizApp.classList.remove("hidden");
  resetQuiz();
  renderQuestion();
});

/* ===== QUIZ FLOW ===== */
function resetQuiz() {
  current = 0;
  chosen = [];
  score = 0;
  selectedIndex = null;

  scoreLabel.textContent = `Score: ${score}`;
  nextBtn.disabled = true;
  updateProgress();
}

function renderQuestion() {
  const q = quizData[current];
  selectedIndex = null;
  nextBtn.disabled = true;

  quizEl.innerHTML = `
    <div class="card">
      <h3>${escapeHtml(q.question)}</h3>
      ${q.options.map((opt, idx) => `
        <div class="option" data-idx="${idx}">
          ${escapeHtml(opt)}
        </div>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".option").forEach(el => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      el.classList.add("selected");
      selectedIndex = Number(el.dataset.idx);
      nextBtn.disabled = false;
    });
  });

  updateProgress();
}

nextBtn.addEventListener("click", () => {
  if (selectedIndex === null) return;

  const q = quizData[current];
  chosen.push(q.options[selectedIndex]);

  if (selectedIndex === q.correctIndex) {
    score++;
  }

  scoreLabel.textContent = `Score: ${score}`;
  current++;

  if (current < quizData.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function updateProgress() {
  const total = quizData.length;
  const shown = Math.min(current + 1, total);
  progressLabel.textContent = `Question ${shown} of ${total}`;

  const progress = (current / total) * 100;
  progressBar.style.width = `${progress}%`;
}

/* ===== FINISH ===== */
function finishQuiz() {
  progressBar.style.width = "100%";
  quizApp.style.display = "none";
  revealScreen.classList.remove("hidden");
  spawnHearts();
  revealMessage();
}

restartBtn.addEventListener("click", () => {
  revealScreen.classList.add("hidden");
  quizApp.style.display = "";
  quizApp.classList.add("hidden");
  introScreen.classList.remove("hidden");
  revealText.textContent = "";
});

/* ===== SURPRISE REVEAL 🤍 ===== */
function revealMessage() {
  const message =
    `This quiz is just the start poop.\n\n` +
    `You scored ${score} out of ${quizData.length}.\n\n` +
    `But this showcases that I am more than just talk and words poop.\n\n` +
    `Everything we have spoken about this afternoon, I agree wholeheartedly with — it's what you deserve darling.\n\n` +
    `What you deserve darling is the world, and I am going to give you that.\n\n` +
    `Starting by becoming the mould poop.\n\n` +
    `Not only living up to your expectations poop,\n` +
    `I am going to exceed them.\n\n` +
    `It has always and will always be you Maria, I love you so so so much darling, thank you for this 🤍`;

  revealText.textContent = "";
  typeCinematic(message, revealText);
}

/* ===== CINEMATIC TYPING ===== */
function typeCinematic(text, el) {
  let i = 0;

  const tick = () => {
    el.textContent += text[i] ?? "";
    i++;

    const last = text[i - 1];
    let delay = 28;
    if (last === "\n") delay = 220;
    if (".!?".includes(last)) delay = 260;
    if (last === "🤍") delay = 320;

    if (i < text.length) setTimeout(tick, delay);
  };

  setTimeout(tick, 200);
}

/* ===== HEARTS ===== */
function spawnHearts() {
  const hearts = document.querySelector(".hearts");
  hearts.innerHTML = "";

  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerText = "🤍";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 12 + Math.random() * 22 + "px";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 380);
}

/* ===== UTIL ===== */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

