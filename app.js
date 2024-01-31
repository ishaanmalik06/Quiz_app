const questions = [
  {
    question: "Which is the largest animal in the world ?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Antartica", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world ?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ],
  },
  {
    question: "Which is the most populated country in the world ?",
    answers: [
      { text: "China", correct: false },
      { text: "Russia", correct: false },
      { text: "India", correct: true },
      { text: "USA", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa ?",
    answers: [
      { text: "Leonardo da vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Vincent van gogh", correct: false },
      { text: "Michelangelo", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-button");

let currQuesInd = 0;
let score = 0;

const startQuiz = () => {
  currQuesInd = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currQues = questions[currQuesInd];
  let quesNo = currQuesInd + 1;
  questionElement.innerHTML = quesNo + "." + currQues.question;

  currQues.answers.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = element.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (element.correct) {
      button.dataset.correct = element.correct;
    }
    button.addEventListener("click", (e) => {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    });
  });
};

const showScore = () => {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currQuesInd++;
  if (currQuesInd < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currQuesInd < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

const resetState = () => {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
};

startQuiz();
