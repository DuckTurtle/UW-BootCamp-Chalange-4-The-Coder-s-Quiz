var viewScoresbnt = document.querySelector("#viewScoresbnt");
var startButton = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var para = document.querySelector("#para");
var saveButton = document.querySelector("#saveScores");
var playagain = document.querySelector("#playAgainBnt");
var timer;
var timerTime;
var questionTextBox = document.querySelector(".Questionblank");
var bluffAnswers =["jQuery","else","Local Storage","function","keydown/keyup","if","else/else if",".querySelector","True","Array","Yes","for","script","Null","No","probably a cranberry","variable","Robot","Next Question"];
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
        answer:"False"
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
    questionsLeft = 5;
    choseOption();
    startTimer();
    hideExtra();
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
    },1000);
};
function choseOption(){
     var choseQuestion = Object.values(questionAnswers);
     choseQuestion = choseQuestion[Math.floor(Math.random()* choseQuestion.length)];
     var currentQuestion = choseQuestion.question;
     var currentAnswer = choseQuestion.answer;
    var questionText = document.createElement("h2");
    document.getElementById("questions").appendChild(questionText);
    questionText.textContent = `${currentQuestion}`;
    delete questionAnswers.choseQuestion;
    var answeroptions = ['"' + genbluff(1)+'"','"'+ genbluff(1)+'"', '"'+ currentAnswer +'"','"'+ genbluff(1)+'"'];
    Array(answeroptions);
    console.log(answeroptions);
    resetBluff();
     var aO1 = document.createElement("button");
     var aO2 = document.createElement("button");
     var aO3 = document.createElement("button");
     var aO4 = document.createElement("button");
    function stringAnswers(){
        var answerScrambler = answeroptions[Math.floor(Math.random()*answeroptions.length)];
        delete answeroptions.answerScrambler;
        console.log(answerScrambler);
        return(answerScrambler);
    }; /*if statment here to seprate variables*/
    var op1 = stringAnswers();
    var op1 = stringAnswers();
    var op1 = stringAnswers();
    var op1 = stringAnswers();
    aO1.textContent = op1;
    aO2.textContent = op2
    aO3.textContent = op3
    aO4.textContent = op4;
    document.getElementById("questions").appendChild(aO1);
    document.getElementById("questions").appendChild(aO2);
    document.getElementById("questions").appendChild(aO3);
    document.getElementById("questions").appendChild(aO4);
    resetAnswerString()
    function genbluff(len){
        var output = "";
        for (let i = 0; i < len; i++) {
            output += " " + bluffAnswers[Math.floor(Math.random()*bluffAnswers.length)] + "";
        }
        console.log(output);
        if (output == currentAnswer){
            output -= " " + currentAnswer + ""
            output += " " + bluffAnswers[Math.floor(Math.random()*bluffAnswers.length)]  + "";
        };
        delete bluffAnswers.output;
        return (output);
        
    };
    function resetAnswerString(){
        answeroptions = [currentAnswer,genbluff(),genbluff(),genbluff()];
    };
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

viewScoresbnt.addEventListener("click",viewScores());
function lose(){
    viewScores();
    var lostGame = document.createElement("h3");
    lostGame.textContent = "Sorry you lost. Try again";
    playagain.appendChild (lostGame);

};

function hideExtra(){
    para.setAttribute("style", "display: none");
    startButton.disabled = true;
    startButton.setAttribute("style", "display: none");
    questionTextBox.setAttribute("style", "display: none");
}
startButton.addEventListener("click", startGame);
init();


function playAgain(){
    resetAray();
    para.setAttribute("style", "display: flex");
    startButton.disabled = false;
    startButton.setAttribute("style", "display: flex");
    playagain.setAttribute("style", "display: none");
    saveButton.setAttribute("style", "display: none");
};

playagain.addEventListener("click", playAgain);