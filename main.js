const quiz = [
      {
        category: "基礎",
        question: "人工知能（AI）の分類において、『汎用人工知能（AGI）』とは？",
        options: ["特定のタスクに特化したAI", "人間のように複数のタスクを柔軟にこなせるAI", "人間の手を完全に離れて自己学習するAI", "感情を持つことができるAI"],
        answer: 1
      },
      {
        category: "機械学習",
        question: "機械学習において、過学習（Overfitting）とはどのような現象か？",
        options: ["学習データが足りない", "新しいデータにだけ強くなる", "学習データにだけ強く、汎化性能が低い", "データが混同する"],
        answer: 2
      },
      {
        category: "深層学習",
        question: "ReLU関数の特徴は？",
        options: ["-1〜1の出力", "負の値は0、正はそのまま", "常に1", "指数関数的に変化"],
        answer: 1
      }
    ];

    let current = 0;

    function loadQuestion() {
      const q = quiz[current];
      document.getElementById("question").textContent = `【${q.category}】${q.question}`;
      const optionsBox = document.getElementById("options");
      optionsBox.innerHTML = "";
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i, btn);
        optionsBox.appendChild(btn);
      });
      document.getElementById("next-btn").style.display = "none";
    }

    function checkAnswer(selected, btn) {
      const correct = quiz[current].answer;
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

loadQuestion();