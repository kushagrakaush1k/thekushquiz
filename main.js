
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the surname of Kushagra?",
    answers: [
      { text: "Arora", correct: false },
      { text: "Kashyap", correct: false },
      { text: "Kaushik", correct: true },
      { text: "Kanojia", correct: false },
    ],
  },
  {
    question: "Which is Kush's fav sport?",
    answers: [
      { text: "Badminton", correct: false },
      { text: "Football", correct: true },
      { text: "Cricket", correct: false },
      { text: "Basketball", correct: false },
    ],
  },
  {
    question: "What is Kush's Job Role?",
    answers: [
      { text: "Tester", correct: false },
      { text: "Debugger", correct: false },
      { text: "Plumber", correct: false },
      { text: "Developer", correct: true },
    ],
  },
  {
    question: "Which of these is a thing kush would say?",
    answers: [
      { text: "Let's NOT code", correct: false },
      { text: "Let's NOT play football", correct: false },
      { text: "Let's play football and code", correct: true },
      { text: "Let's study", correct: false },
    ],
  },
  {
    question: "What is my graduation year?",
    answers: [
      { text: "2023", correct: false },
      { text: "2024", correct: false },
      { text: "2025", correct: false },
      { text: "2026", correct: true },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

   
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "You are a real G!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know me!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Try again though!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}