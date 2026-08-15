/* =====================================================
   NEUROX — CONTROL & COORDINATION QUIZ
===================================================== */

const questions = [
    {
        question: "What is the structural and functional unit of the nervous system?",
        answers: [
            "Neuron",
            "Hormone",
            "Brain",
            "Spinal cord"
        ],
        correct: 0
    },

    {
        question: "Which part of a neuron receives signals?",
        answers: [
            "Axon",
            "Dendrites",
            "Cell body",
            "Nerve ending"
        ],
        correct: 1
    },

    {
        question: "Which organ acts as the main coordinating centre of the nervous system?",
        answers: [
            "Heart",
            "Liver",
            "Brain",
            "Kidney"
        ],
        correct: 2
    },

    {
        question: "A reflex action is generally:",
        answers: [
            "Slow and voluntary",
            "Rapid and automatic",
            "Always controlled consciously",
            "A hormonal response"
        ],
        correct: 1
    },

    {
        question: "What is the pathway followed during a reflex action called?",
        answers: [
            "Hormonal pathway",
            "Reflex arc",
            "Blood pathway",
            "Digestive pathway"
        ],
        correct: 1
    },

    {
        question: "Which hormone helps regulate blood glucose level?",
        answers: [
            "Insulin",
            "Adrenaline",
            "Auxin",
            "Thyroxine"
        ],
        correct: 0
    },

    {
        question: "Which plant hormone promotes cell growth and is involved in phototropism?",
        answers: [
            "Insulin",
            "Auxin",
            "Adrenaline",
            "Thyroxine"
        ],
        correct: 1
    },

    {
        question: "Growth of a plant towards light is called:",
        answers: [
            "Geotropism",
            "Hydrotropism",
            "Phototropism",
            "Chemotropism"
        ],
        correct: 2
    },

    {
        question: "Which part of the brain helps maintain balance and posture?",
        answers: [
            "Cerebellum",
            "Cerebrum",
            "Spinal cord",
            "Medulla"
        ],
        correct: 0
    },

    {
        question: "Hormones are mainly transported through:",
        answers: [
            "Nerves",
            "Blood",
            "Bones",
            "Air"
        ],
        correct: 1
    }
];


/* =====================================================
   VARIABLES
===================================================== */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =====================================================
   ELEMENTS
===================================================== */

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("quiz-message");
const nextButton = document.getElementById("next-button");

const finalResult = document.getElementById("final-result");
const rewardCard = document.getElementById("reward-card");
const rewardTitle = document.getElementById("reward-title");
const rewardText = document.getElementById("reward-text");
const rewardScore = document.getElementById("reward-score");


/* =====================================================
   START QUIZ
===================================================== */

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    scoreElement.textContent = "SCORE: 0";

    finalResult.textContent = "";

    rewardCard.style.display = "none";

    nextButton.style.display = "inline-block";

    showQuestion();
}


/* =====================================================
   SHOW QUESTION
===================================================== */

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    answersElement.innerHTML = "";

    messageElement.textContent = "";

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "FINISH QUIZ →"
            : "NEXT QUESTION →";


    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);

    });
}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const correctIndex =
        questions[currentQuestion].correct;

    const allButtons =
        answersElement.querySelectorAll("button");


    allButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

    });


    if (selectedIndex === correctIndex) {

        score++;

        selectedButton.classList.add("correct");

        messageElement.textContent =
            "⚡ CORRECT! Neural signal received.";

    } else {

        selectedButton.classList.add("wrong");

        messageElement.textContent =
            "❌ Not quite. The correct answer is highlighted.";

    }


    scoreElement.textContent =
        `SCORE: ${score}`;

}


/* =====================================================
   NEXT QUESTION
===================================================== */

nextButton.addEventListener("click", () => {

    if (!answered) {

        messageElement.textContent =
            "Choose an answer first ⚡";

        return;
    }


    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }

});


/* =====================================================
   FINISH QUIZ
===================================================== */

function finishQuiz() {

    questionElement.textContent =
        "MISSION COMPLETE 🧠";

    questionNumber.textContent =
        "QUIZ COMPLETE";

    answersElement.innerHTML = "";

    messageElement.textContent = "";

    nextButton.style.display = "none";


    const percentage =
        (score / questions.length) * 100;


    finalResult.textContent =
        `Your score: ${score}/${questions.length} — ${percentage}%`;


    showReward(percentage);

}


/* =====================================================
   REWARD SYSTEM
===================================================== */

function showReward(percentage) {

    rewardCard.style.display = "block";


    if (percentage === 100) {

        rewardTitle.textContent =
            "🧠 NEURO LEGEND";

        rewardText.textContent =
            "Perfect score! Your control & coordination knowledge is elite.";

    }

    else if (percentage >= 80) {

        rewardTitle.textContent =
            "⚡ NEURAL MASTER";

        rewardText.textContent =
            "Excellent work! Your biology signals are firing perfectly.";

    }

    else if (percentage >= 60) {

        rewardTitle.textContent =
            "🔥 BRAIN BOOSTER";

        rewardText.textContent =
            "Great job! A little more revision and you'll reach the top.";

    }

    else if (percentage >= 40) {

        rewardTitle.textContent =
            "🌱 BIO EXPLORER";

        rewardText.textContent =
            "Good start! Revise the chapter once more and try again.";

    }

    else {

        rewardTitle.textContent =
            "🚀 NEURAL TRAINEE";

        rewardText.textContent =
            "Keep learning! Your next attempt can be much stronger.";

    }


    rewardScore.textContent =
        `FINAL SCORE: ${score} / ${questions.length}`;

}


/* =====================================================
   START
===================================================== */

startQuiz();
