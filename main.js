// CSVファイルからクイズデータを読み込んで表示
let quiz = [];
let current = 0;

Papa.parse("quiz.csv", {
  download: true,
  header: true,
  complete: function(results) {
    quiz = results.data;
    loadQuestion();
  }
});

function loadQuestion() {
  const q = quiz[current];
  if (!q) return;
  document.getElementById("question").textContent = `【${q.category}】${q.question}`;
  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";
  for (let i = 1; i <= 4; i++) {
    const opt = q[`option${i}`];
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i - 1, btn);
    optionsBox.appendChild(btn);
  }
  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(selected, btn) {
  const correct = parseInt(quiz[current].answer_index);
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((b, i) => {
    b.disabled = true;
    b.className = i === correct ? "correct" : i === selected ? "wrong" : "";
  });
  document.getElementById("next-btn").style.display = "block";
}

document.getElementById("next-btn").onclick = () => {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-box").innerHTML = `<h2>終了！お疲れさま！🐕✨</h2>`;
  }
};
