const questions = [
    {
      q: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool and Markup Logic"],
      answer: "Hyper Text Markup Language"
    },
    
    {
      q: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "define", "set"],
      answer: "var"
    },
    {
      q: "Which method converts JSON to a JavaScript object?",
      options: ["JSON.stringify()", "JSON.parse()", "JSON.objectify()"],
      answer: "JSON.parse()"
    },
    {
      q: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      q: "How do you apply a class in CSS?",
      options: [".classname", "#classname", "classname"],
      answer: ".classname"
    },
    {
      q: "How do you write a comment in JavaScript?",
      options: ["// This is a comment", "# This is a comment", "<!-- This is a comment -->"],
      answer: "// This is a comment"
    },
    
    {
      q: "Which CSS property is used to change text color?",
      options: ["font-color", "text-color", "color"],
      answer: "color"
    },
    {
      q: "Which JavaScript method adds an element to the end of an array?",
      options: ["push()", "append()", "add()"],
      answer: "push()"
    }
    
  ];
  
  let timer;
  let timeLeft = 60;
  
  function renderQuiz() {
    const quizForm = document.getElementById("quizForm");
    quizForm.innerHTML = '';
  
    questions.forEach((q, index) => {
      const div = document.createElement("div");
      div.classList.add("question");
      div.innerHTML = `<p>${index + 1}. ${q.q}</p>` +
        q.options.map(opt => `
          <label>
            <input type="radio" name="q${index}" value="${opt}">
            ${opt}
          </label>`).join('');
      quizForm.appendChild(div);
    });
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitQuiz();
      }
    }, 1000);
  }
  
  function startQuiz() {
    renderQuiz();
    startTimer();
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "inline-block";
  }
  
  function submitQuiz() {
    clearInterval(timer);
    let score = 0;
    let output = "";
  
    questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) {
        const isCorrect = selected.value === q.answer;
        if (isCorrect) score++;
        output += `
          <p>${i + 1}. ${q.q}<br>
          Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${selected.value}</span><br>
          ${!isCorrect ? `Correct Answer: <span class="correct">${q.answer}</span><br>` : ''}</p>
        `;
      } else {
        output += `
          <p>${i + 1}. ${q.q}<br>
          <span class="incorrect">You did not answer this question.</span><br>
          Correct Answer: <span class="correct">${q.answer}</span></p>
        `;
      }
    });
  
    const resultHTML = `You scored ${score} out of ${questions.length}.<br><br>${output}`;
    document.getElementById("result").innerHTML = resultHTML;
    document.getElementById("submitBtn").style.display = "none";
    localStorage.setItem("lastScore", `Score: ${score}/${questions.length}`);
    document.getElementById("last-score").innerText = "Last Score: " + localStorage.getItem("lastScore");
  }
  
  