/* =========================================
   NEUROX QUIZ
   CONTROL & COORDINATION
========================================= */

const questions = [

    {
        question: "What is the basic structural and functional unit of the nervous system?",
        options: [
            "Neuron",
            "Hormone",
            "Gland",
            "Muscle"
        ],
        answer: 0
    },

    {
        question: "Which part of the brain mainly controls balance and posture?",
        options: [
            "Forebrain",
            "Cerebellum",
            "Medulla",
            "Spinal cord"
        ],
        answer: 1
    },

    {
        question: "Which part of the nervous system is mainly involved in reflex actions?",
        options: [
            "Spinal cord",
            "Forebrain",
            "Cerebellum",
            "Eye"
        ],
        answer: 0
    },

    {
        question: "A reflex action is usually:",
        options: [
            "Slow and voluntary",
            "Fast and automatic",
            "Always conscious",
            "Only found in plants"
        ],
        answer: 1
    },

    {
        question: "Growth of a plant towards light is called:",
        options: [
            "Geotropism",
            "Hydrotropism",
            "Phototropism",
            "Chemotropism"
        ],
        answer: 2
    },

    {
        question: "Which is the correct reflex arc pathway?",
        options: [
            "Receptor → Sensory neuron → Spinal cord → Motor neuron → Effector",
            "Brain → Muscle → Receptor",
            "Effector → Brain → Receptor",
            "Motor neuron → Receptor → Brain"
        ],
        answer: 0
    },

    {
        question: "Which hormone helps regulate blood glucose level?",
        options: [
            "Auxin",
            "Insulin",
            "Adrenaline",
            "Thyroxine"
        ],
        answer: 1
    },

    {
        question: "Which part of the brain is mainly responsible for thinking and memory?",
        options: [
            "Forebrain",
            "Cerebellum",
            "Medulla",
            "Spinal cord"
        ],
        answer: 0
    },

    {
        question: "Which hormone is associated with the emergency 'fight or flight' response?",
        options: [
            "Insulin",
            "Auxin",
            "Adrenaline",
            "Thyroxine"
        ],
        answer: 2
    },

    {
        question: "Which type of movement is the growth of a plant part in response to water?",
        options: [
            "Phototropism",
            "Geotropism",
            "Hydrotropism",
            "Chemotropism"
        ],
        answer: 2
    }

];


/* =========================================
   VARIABLES
========================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================
   ELEMENTS
========================================= */

const questionNumber =
    document.getElementById("question-number");

const scoreDisplay =
    document.getElementById("score");

const questionText =
    document.getElementById("question");

const answersBox =
    document.getElementById("answers");

const message =
    document.getElementById("quiz-message");

const nextButton =
    document.getElementById("next-button");

const finalResult =
    document.getElementById("final-result");

const rewardCard =
    document.getElementById("reward-card");

const rewardIcon =
    document.getElementById("reward-icon");

const rewardTitle =
    document.getElementById("reward-title");

const rewardText =
    document.getElementById("reward-text");

const rewardScore =
    document.getElementById("reward-score");


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        "QUESTION " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    scoreDisplay.textContent =
        "SCORE: " + score;

    questionText.textContent =
        question.question;

    message.textContent = "";

    nextButton.style.display = "none";

    nextButton.textContent =
        "NEXT QUESTION →";

    answersBox.innerHTML = "";


    question.options.forEach(
        function(option, index) {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.textContent =
                option;

            button.addEventListener(
                "click",
                function() {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );

            answersBox.appendChild(button);

        }
    );

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(
    selectedAnswer,
    selectedButton
) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer =
        questions[currentQuestion].answer;

    const allButtons =
        document.querySelectorAll(".answer");


    allButtons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    allButtons[correctAnswer]
        .classList.add("correct");


    if (
        selectedAnswer ===
        correctAnswer
    ) {

        score++;

        selectedButton
            .classList.add("correct");

        message.textContent =
            "✓ CORRECT! AURA +1 🔥";

    }

    else {

        selectedButton
            .classList.add("wrong");

        message.textContent =
            "✕ Not quite! The correct answer is highlighted.";

    }


    scoreDisplay.textContent =
        "SCORE: " + score;

    nextButton.style.display =
        "inline-block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "UNLOCK REWARD 🏆";

    }

}


/* =========================================
   NEXT QUESTION
========================================= */

nextButton.addEventListener(
    "click",
    function() {

        currentQuestion++;

        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        }

        else {

            finishQuiz();

        }

    }
);


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    questionNumber.textContent =
        "MISSION COMPLETE";

    scoreDisplay.textContent =
        "FINAL SCORE: " +
        score +
        " / " +
        questions.length;

    questionText.textContent =
        "SYSTEM CHECK COMPLETE ⚡";

    answersBox.innerHTML = "";

    message.textContent =
        "Your Biology Aura has been calculated.";

    nextButton.style.display =
        "none";

    finalResult.textContent =
        "🔥 " +
        score +
        " / " +
        questions.length;

    giveReward();

}


/* =========================================
   REWARD SYSTEM
========================================= */

function giveReward() {

    let icon;
    let title;
    let text;


    if (score === 10) {

        icon = "👑";

        title =
            "NEURO MASTER";

        text =
            "PERFECT SCORE! Your Control & Coordination knowledge is elite.";

    }

    else if (score >= 8) {

        icon = "⚡";

        title =
            "BRAIN COMMANDER";

        text =
            "Outstanding performance! Your Biology knowledge is extremely strong.";

    }

    else if (score >= 6) {

        icon = "🧠";

        title =
            "NEURAL PRO";

        text =
            "Great work! You have a strong understanding of the chapter.";

    }

    else if (score >= 4) {

        icon = "🔬";

        title =
            "BIO EXPLORER";

        text =
            "Good beginning! Revise the chapter once more and level up.";

    }

    else {

        icon = "🚀";

        title =
            "SYSTEM INITIATED";

        text =
            "Your mission has begun. Revise the chapter and try again.";

    }


    rewardIcon.textContent =
        icon;

    rewardTitle.textContent =
        title;

    rewardText.textContent =
        text;

    rewardScore.textContent =
        "AURA SCORE: " +
        score +
        " / " +
        questions.length;

    rewardCard.style.display =
        "block";


    setTimeout(
        function() {

            rewardCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        },
        300
    );

}


/* =========================================
   START QUIZ
========================================= */

loadQuestion();
