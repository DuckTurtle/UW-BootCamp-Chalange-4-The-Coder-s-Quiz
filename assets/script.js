var viewScoresbnt = document.querySelector("#viewScoresbnt");
var startButton = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var para = document.querySelector("#para");
var secondpart = document.querySelector("#buttons");
var saveButton = document.querySelector("#saveScores");
var playagain = document.querySelector("#playAgainBnt");
var listScores = document.querySelector("#listScores");
var firstPart = document.getElementById("questions");
var lossTxt = document.querySelector("#LossTxt");
var questionText = document.querySelector("#questionTextBox");
var playerScoreLists = document.getElementsByClassName("list");
var aO1 = document.querySelector("#aO1");
var aO2 = document.querySelector("#aO2");
var aO3 = document.querySelector("#aO3");
var aO4 = document.querySelector("#aO4");
var timer;
var form = document.getElementById("ScoreForm");
var timerTime;
var scoreList = [];
var questionTextBox = document.querySelector(".startPageText");
var bluffAnswers = ["Greg", "else", "Local Storage", "function", "keydown/keyup", "if", "else/else if", ".querySelector", "True", "Array", "Yes", "for", "script", "Null", "No", "probably a cranberry", "variable", "Robot", "Next Question"];
var questionAnswers = {

    option1: {
        question: "Every else statment you need a ____ statment before.",
        answer: "if"
    },
    option2: {
        question: "This exacutes a section of code every time its called?",
        answer: "function"
    },
    option3: {
        question: "What is one thing that makes javascript better?",
        answer: "jQuery"
    },
    option4: {
        question: "Before a when statment there must be a ___ statment",
        answer: "for"
    },
    option5: {
        question: "A variable in a function can be used by another Function.",
        answer: "False"
    },
    option6: {
        question: "The element to call your javascript file in html is a _____ Element",
        answer: "script"
    },
    option7: {
        question: "A variable with multiple outputs is called an ___?",
        answer: "Array"
    },
    option8: {
        question: "This can be used to store data on the users device.",
        answer: "Local Storage"
    },
    option9: {
        question: "This can be used to help track the key presses of a user.",
        answer: "keydown/keyup"
    },
    option10: {
        question: "Dex is probably hiding the fact that he is a_______.",
        answer: "Robot"
    },
};
var removedQuestions = "";
var questionsLeft;

function init() {
    var storedScores = JSON.parse(localStorage.getItem("playerScores"));
    if (storedScores !== null) {
        scoreList = storedScores;
    }
    hideButtons();
    getOldScores();
    hideNotNeeded();
};

function startGame() {
    timerCount = 90;
    questionsLeft = 5;
    choseOption();
    startTimer();
    hideExtra();
    showButtons();
    getOldScores()
};

/* This resests the questions list, part of my system to prevent repete questions*/
function resetAray() {
    questionAnswers = {
        option1: {
            question: "Every else statment you need a ____ statment before.",
            answer: "if"
        },
        option2: {
            question: "This exacutes a section of code every time its called?",
            answer: "function"
        },
        option3: {
            question: "What is one thing that makes javascript better?",
            answer: "jQuery"
        },
        option4: {
            question: "Before a when statment there must be a ___ statment",
            answer: "for"
        },
        option5: {
            question: "A variable in a function can be used by another Function.",
            answer: "False"
        },
        option6: {
            question: "The element to call your javascript file in html is a _____ Element",
            answer: "script"
        },
        option7: {
            question: "A variable with multiple outputs is called an ___?",
            answer: "Array"
        },
        option8: {
            question: "This can be used to store data on the users device.",
            answer: "Local Storage"
        },
        option9: {
            question: "This can be used to help track the key presses of a user.",
            answer: "keydown/keyup"
        },
        option10: {
            question: "Dex is probably hiding the fact that he is a_______.",
            answer: "Robot"
        },
    };

};
function resetBluff() {
    bluffAnswers = ["jQuery", "alse", "Local Storage", "function", "keydown/keyup", "if", "else/else if", ".querySelector", "True", "Array", "Yes", "for", "script", "Null", "No", "probably a cranberry", "variable", "Robot", "Next Question"];
};

function win() {
    hideExtra();
    hideButtons();
    saveScore();
};
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = "Time Left: " + timerCount;
        if (timerCount >= 0) {
            if (questionsLeft === 0 && timerCount > 0) {
                clearInterval(timer);
                win();
            };
        };
        if (timerCount === 0 || timerCount <= 0) {
            clearInterval(timer);
            lose();
        };
    }, 1000);
};
function choseOption() {
    var choseQuestion = Object.values(questionAnswers);
    var chosenQuestion = choseQuestion[Math.floor(Math.random() * choseQuestion.length)];
    function removeUsedQuestions() {
        const indexQA = choseQuestion.indexOf(chosenQuestion);
        if (indexQA > -1) {
            choseQuestion.splice(indexQA, 1);
        }
        questionAnswers = Object.values(choseQuestion);
    }
    removeUsedQuestions();
    var currentQuestion = chosenQuestion.question;
    console.log(chosenQuestion);
    var currentAnswer = chosenQuestion.answer;
    document.getElementById("questionTextBox").textContent = `${currentQuestion}`;
    const indexts = bluffAnswers.indexOf(currentAnswer);
        if (indexts > -1){
        bluffAnswers.splice(indexts, 1);
        }
    var answeroptions = ['' + genbluff() + '', ' ' + genbluff() + ' ', '' + currentAnswer + '', ' ' + genbluff() + ''];
    Array(answeroptions);
    resetBluff();
    function stringAnswers() {
        var answerScrambler = answeroptions[Math.floor(Math.random() * answeroptions.length)];
        const index = answeroptions.indexOf(answerScrambler);
        if (index > -1) {
            answeroptions.splice(index, 1);
        }
        return (answerScrambler);
    }
    aO1.textContent = stringAnswers();
    aO2.textContent = stringAnswers();
    aO3.textContent = stringAnswers();
    aO4.textContent = stringAnswers();
    function checkButton1(event) {
        event.stopPropagation();
        var check1 = aO1.textContent;
        if (check1 === currentAnswer) {
            disableButtons()
            choseOption();
            questionsLeft--;
        }
        else if (check1 !== currentAnswer) {
            console.log("checkButton1");
            timerCount -= 5;
        };
    }
    function checkButton2(event) {
        event.stopPropagation();
        var check2 = aO2.textContent;
        if (check2 === currentAnswer) {
            disableButtons()
            choseOption();
            questionsLeft--;
        }
        else if (check2 !== currentAnswer) {
            console.log("checkButton2");
            timerCount -= 5;
        };
    }
    function checkButton3(event) {
        event.stopPropagation();
        var check3 = aO3.textContent;
        if (check3 === currentAnswer) {
            disableButtons()
            choseOption();
            questionsLeft--;
        }
        else if (check3 !== currentAnswer) {
            console.log("checkButton3");
            timerCount -= 5;
        };
    }
    function checkButton4(event) {
        event.stopPropagation();
        var check4 = aO4.textContent;
        if (check4 === currentAnswer) {
            disableButtons()
            choseOption();
            questionsLeft--;
        }
        else if (check4 !== currentAnswer) {
            console.log("checkButton4");
            timerCount -= 5;
        };
    }
    function disableButtons(){
        aO1.disabled = true;
        aO2.disabled = true;
        aO3.disabled = true;
        aO4.disabled = true;  
    }
    function inableButtons(){
        aO1.disabled = false;
        aO2.disabled = false;
        aO3.disabled = false;
        aO4.disabled = false; 
    }
    aO1.addEventListener("click", checkButton1);
    aO2.addEventListener("click", checkButton2);
    aO3.addEventListener("click", checkButton3);
    aO4.addEventListener("click", checkButton4);
    inableButtons();
    function genbluff() {
        var currentBlufflist = bluffAnswers[Math.floor(Math.random() * bluffAnswers.length)];
        const indexbL = bluffAnswers.indexOf(currentBlufflist);
        if (indexbL > -1) {
            bluffAnswers.splice(indexbL, 1);
        }
        console.log(bluffAnswers);
        return currentBlufflist;
    };
    
};

function getOldScores() {
    listScores.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var scores = scoreList[i];

        var li = document.createElement("li");
        li.setAttribute("class","list");
        li.textContent = scores;
        li.setAttribute("data-index", i);

        document.getElementById("listScores").appendChild(li);
    }
};

function viewScores() {
    firstPart.setAttribute("style","display: none");
    saveButton.setAttribute("style","display: none");
    listScores.setAttribute("style","display: flex");
    secondpart.setAttribute("style","display: flex");
    hideButtons();
    playagain.setAttribute("style","display: flex");
    hideExtra();
    hideNotNeeded();
    getOldScores();
};
function saveScore() {
    showList();
    questionText.setAttribute("style", "display: none");
    form.setAttribute("style", "display: flex");
    saveButton.setAttribute("style","display: flex");
    localStorage.setItem("playerScores", JSON.stringify(scoreList));

};
saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initalInputs = document.querySelector("#inputBox");
    var initalsText = initalInputs.value.trim();
    if (initalsText === "") {
        return;
    } 
    var score = timerCount;
    scoreList.push(initalsText +" " + score + '',' ');
    initalInputs.value = "";
    saveScore();
    viewScores();
    
});
viewScoresbnt.addEventListener("click", viewScores);
function lose() {
    viewScores();
    hideButtons();
    hideExtra();
    lossTxt.setAttribute("style","display:flex");
};
function hideList(){
    for(i = 0; i > playerScoreLists.length; i++){
        playerScoreLists[i].setAttribute("style", "display: none");
    }
}
function showList(){
    for(i = 0; i > playerScoreLists.length; i++){
        playerScoreLists[i].setAttribute("style", "display: flex");
    }
}

function hideButtons(){
    aO1.setAttribute("style","display:none");
    aO2.setAttribute("style","display:none");
    aO3.setAttribute("style","display:none");
    aO4.setAttribute("style","display:none");
};
function showButtons(){
    aO1.setAttribute("style","display:flex");
    aO2.setAttribute("style","display:flex");
    aO3.setAttribute("style","display:flex");
    aO4.setAttribute("style","display:flex");
};
function hideNotNeeded(){
    saveButton.setAttribute("style", "display: none");
    form.setAttribute("style", "display: none");
    lossTxt.setAttribute("style","display:none");
    hideButtons();
};
function hideExtra() {
    para.setAttribute("style", "display: none");
    startButton.disabled = true;
    startButton.setAttribute("style", "display: none");
    questionTextBox.setAttribute("style", "display: none");
}
function hideScores(){
    firstPart.setAttribute("style","display:flex")
    secondpart.setAttribute("style","display:none");
    listScores.setAttribute("style","display:none");

};
startButton.addEventListener("click", startGame);

init();


function playAgain() {
    resetAray();
    para.setAttribute("style", "display: none");
    startButton.disabled = false;
    hideList();
    startButton.setAttribute("style", "display: flex");
    playagain.setAttribute("style", "display: none");
    saveButton.setAttribute("style", "display: none");
    lossTxt.setAttribute("style","display:none");
    questionText.setAttribute("style", "display: flex");
    startGame();
    showButtons();
    hideScores();
};
playagain.addEventListener("click", playAgain);
