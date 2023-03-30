var viewScoresbnt = document.querySelector("#viewScoresbnt");
var startButton = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var timer;
var timerTime;
var questionTextBox = document.querySelector("Questionblank");
var currentQuestion= {
    cquestion: "",
    canswer:""
};
var bluffAnswers =["jQuery","alse","Local Storage","function","keydown/keyup","if","else/else if",".querySelector","True","Array","Yes","for","script","Null","No","probably a cranberry","variable","Robot","Next Question"];
var questionAnswers = {

    option1: {
        question:"Every else statment you need a ____ statment before.",
        answer: "if"
    },
    option2: {
        question:"This exacutes a section of code every time its called?",
        answer: "function"
    },
    option3: {
        question:"What is one thing that makes javascript better?",
        answer: "jQuery"
    },
    option4: {
        question:"Before a when statment there must be a ___ statment",
        answer: "for"
    },
    option5: {
        question:"A variable in a function can be used by another Function.",
        answer: "False"
    },
    option6: {
        question:"The element to call your javascript file in html is a _____ Element",
        answer: "script"
    },
    option7: {
        question:"A variable with multiple outputs is called an ___?",
        answer: "Array"
    },
    option8: {
        question:"This can be used to store data on the users device.",
        answer: "Local Storage"
    },
    option9: {
        question:"This can be used to help track the key presses of a user.",
        answer: "keydown/keyup"
    },
    option10: {
        question:"Dex is probably hiding the fact that he is a_______.",
        answer: "Robot"
    },
};
var removedQuestions = "";
var questionsLeft;

function init(){
    getOldScores();
};

function startGame(){
    timerCount = 50;
    startButton.disabled = true;
    startButton.hidden = true;
    questionsLeft = 5;
    choseOption();
    startTimer();
    resetAray();
};
/* This resests the questions list, part of my system to prevent repete questions*/
function resetAray(){
     questionAnswers = {
     option1: {
        question:"Every else statment you need a ____ statment before.",
        answer: "if"
    },
    option2: {
        question:"This exacutes a section of code every time its called?",
        answer: "function"
    },
    option3: {
        question:"What is one thing that makes javascript better?",
        answer: "jQuery"
    },
    option4: {
        question:"Before a when statment there must be a ___ statment",
        answer: "for"
    },
    option5: {
        question:"A variable in a function can be used by another Function.",
        answer: "False"
    },
    option6: {
        question:"The element to call your javascript file in html is a _____ Element",
        answer: "script"
    },
    option7: {
        question:"A variable with multiple outputs is called an ___?",
        answer: "Array"
    },
    option8: {
        question:"This can be used to store data on the users device.",
        answer: "Local Storage"
    },
    option9: {
        question:"This can be used to help track the key presses of a user.",
        answer: "keydown/keyup"
    },
    option10: {
        question:"Dex is probably hiding the fact that he is a_______.",
        answer: "Robot"
    },
    };

};

function win(){
    saveScore();
};
function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = "Time Left: " + timerCount;
        if(timerCount >= 0){
            if(questionsLeft === 0 && timerCount > 0){
                clearInterval(timer);
                win();
            };
        };
        if (timerCount === 0) {
            clearInterval(timer);
            lose();
        };
    },50000);
};
function choseOption(){
   var choseQuestion = questionAnswers[Math.floor(Math.random()*questionAnswers.length)];
    currentQuestion.cquestion = choseQuestion.question;
    currentQuestion.canswer = choseQuestion.answer;
    questionTextBox.textContent = currentQuestion.cquestion;
    removedQuestions = questionAnswers.splice(choseQuestion);
    var answeroptions= [currentQuestion.canswer,genbluff(),genbluff(),genbluff()];
    resetBluff();
     var aO1 = document.createElement("button");
     var aO2 = document.createElement("button");
     var aO3 = document.createElement("button");
     var aO4 = document.createElement("button");
    function stringAnswers(){
        var answerScrambler;
        var usedBluff;
        answerScrambler = answeroptions[Math.floor(Math.random()*answeroptions.length)];
        usedBluff = answeroptions.splice(answerScrambler);
        return(answerScrambler);
    };
    aO1.textContent = stringAnswers();
    aO2.textContent = stringAnswers();
    aO3.textContent = stringAnswers();
    aO4.textContent = stringAnswers();
    questionTextBox.appendChild(aO1);
    questionTextBox.appendChild(aO2);
    questionTextBox.appendChild(aO3);
    questionTextBox.appendChild(aO4);
};
function genbluff(){
    var output = "";
    output = bluffAnswers[Math.floor(Math.random()*bluffAnswers.length)];
    var usedbluff;
    usedbluff = bluffAnswers.splice(output);
    if (bluffAnswers === canswer){
        output = bluffAnswers[Math.floor(Math.random()*bluffAnswers.length)];
        usedbluff = bluffAnswers.splice(output);
    };
    return(output);

};
function resetBluff(){
     bluffAnswers =["jQuery","alse","Local Storage","function","keydown/keyup","if","else/else if",".querySelector","True","Array","Yes","for","script","Null","No","probably a cranberry","variable","Robot","Next Question"];
}
function saveScore(){

}
function viewScores(){

}
function getOldScores(){

}
var playagain = document.querySelector("#playAgainBnt");

viewScoresbnt.addEventListener("click",viewScores());
function lose(){
    viewScores();
    var lostGame = document.createElement("h3");
    lostGame.textContent = "Sorry you lost. Try again";
    playagain.appendChild (lostGame);

};
startButton.addEventListener("click", startGame);
init();


function playAgain(){
    document.getElementById("questions").reset();
    startButton.disabled = false;
    startButton.hidden = false;
};

playagain.addEventListener("click", playAgain());