const questions = [

    {
        question: "What is the structural and functional unit of the nervous system?",
        answers: ["Hormone", "Neuron", "Brain", "Spinal cord"],
        correct: 1
    },

    {
        question: "Which part of the brain controls thinking and memory?",
        answers: ["Cerebellum", "Medulla", "Cerebrum", "Spinal cord"],
        correct: 2
    },

    {
        question: "Which part of the brain maintains balance and posture?",
        answers: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
        correct: 1
    },

    {
        question: "Which part of the brain controls involuntary actions?",
        answers: ["Cerebrum", "Cerebellum", "Medulla", "Neuron"],
        correct: 2
    },

    {
        question: "What detects a stimulus?",
        answers: ["Receptor", "Effector", "Hormone", "Axon"],
        correct: 0
    },

    {
        question: "Which part of a neuron receives information?",
        answers: ["Axon", "Dendrite", "Synapse", "Cell wall"],
        correct: 1
    },

    {
        question: "What carries impulses away from the cell body?",
        answers: ["Dendrite", "Axon", "Nucleus", "Receptor"],
        correct: 1
    },

    {
        question: "A quick automatic response to a stimulus is called:",
        answers: [
            "Hormonal action",
            "Reflex action",
            "Voluntary action",
            "Growth movement"
        ],
        correct: 1
    },

    {
        question: "Which structure mainly coordinates a reflex action?",
        answers: [
            "Spinal cord",
            "Cerebrum",
            "Cerebellum",
            "Pituitary gland"
        ],
        correct: 0
    },

    {
        question: "Hormones are generally transported through:",
        answers: [
            "Neurons",
            "Blood",
            "Bones",
            "Dendrites"
        ],
        correct: 1
    },

    {
        question: "Which hormone helps regulate blood glucose?",
        answers: [
            "Auxin",
            "Insulin",
            "Adrenaline",
            "Abscisic acid"
        ],
        correct: 1
    },

    {
        question: "Which plant hormone promotes cell division?",
        answers: [
            "Cytokinin",
            "Insulin",
            "Adrenaline",
            "Abscisic acid"
        ],
        correct: 0
    },

    {
        question: "Growth of a plant towards light is called:",
        answers: [
            "Geotropism",
            "Phototropism",
            "Hydrotropism",
            "Chemotropism"
        ],
        correct: 1
    },

    {
        question: "Growth response to gravity is called:",
        answers: [
            "Phototropism",
            "Chemotropism",
            "Geotropism",
            "Thigmotropism"
        ],
        correct: 2
    },

    {
        question: "Which system uses chemical messengers called hormones?",
        answers: [
            "Endocrine system",
            "Skeletal system",
            "Respiratory system",
            "Digestive system"
        ],
        correct: 0
    }

];


let currentQuestion = 0;
let score = 0;
let xp = 0;
let answered = false;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextButton");

const questionNumber =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const messageElement =
    document.getElementById("quizMessage");

const xpFill =
    document.getElementById("xpFill");

const xpText =
    document.getElementById("xpText");

const rewardBox =
    document.getElementById("rewardBox");

const rewardTitle =
    document.getElementById("rewardTitle");

const rewardDescription =
    document.getElementById("rewardDescription");

const finalScore =
    document.getElementById("finalScore");

const finalXP =
    document.getElementById("finalXP");


function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    answersElement.innerHTML = "";

    messageElement.textContent = "";

    nextButton.style.display = "none";


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.onclick = () =>
            selectAnswer(index, button);

        answersElement.appendChild(button);

    });

}


function selectAnswer(index, button) {

    if (answered) return;

    answered = true;

    const correct =
        questions[currentQuestion].correct;


    const allButtons =
        document.querySelectorAll(".answer");


    if (index === correct) {

        button.classList.add("correct");

        score++;

        xp += 10;

        messageElement.textContent =
            "✓ CORRECT! +10 XP";

        messageElement.style.color =
            "#00ff9d";

    } else {

        button.classList.add("wrong");

        allButtons[correct]
            .classList.add("correct");

        xp += 2;

        messageElement.textContent =
            "✕ NOT QUITE — correct answer highlighted.";

        messageElement.style.color =
            "#ff6378";
    }


    scoreElement.textContent = score;

    updateXP();

    nextButton.style.display = "inline-block";


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "FINISH QUIZ →";

    }

}


function updateXP() {

    const percentage =
        Math.min((xp / 150) * 100, 100);

    xpFill.style.width =
        percentage + "%";

    xpText.textContent =
        `XP ${xp} / 150`;

}


nextButton.onclick = function() {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

        return;
    }

    loadQuestion();

};


function finishQuiz() {

    questionElement.textContent =
        "QUIZ COMPLETE!";

    answersElement.innerHTML = "";

    messageElement.textContent = "";

    nextButton.style.display = "none";

    questionNumber.textContent =
        "MISSION COMPLETE";


    finalScore.textContent =
        score;

    finalXP.textContent =
        xp;


    if (score === 15) {

        rewardTitle.textContent =
            "🏆 NEURAL LEGEND";

        rewardDescription.textContent =
            "Perfect score! Your control & coordination knowledge is elite.";

    }

    else if (score >= 12) {

        rewardTitle.textContent =
            "🥇 NEURAL MASTER";

        rewardDescription.textContent =
            "Outstanding! You have mastered most of the chapter.";

    }

    else if (score >= 9) {

        rewardTitle.textContent =
            "🥈 NEURAL EXPLORER";

        rewardDescription.textContent =
            "Great work! Your neural knowledge is growing.";

    }

    else if (score >= 6) {

        rewardTitle.textContent =
            "🥉 NEURAL ROOKIE";

        rewardDescription.textContent =
            "Good attempt! Revise once more and level up.";

    }

    else {

        rewardTitle.textContent =
            "🧠 NEURAL RECRUIT";

        rewardDescription.textContent =
            "Keep learning. Every correct answer makes your brain stronger.";

    }


    rewardBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


loadQuestion();
