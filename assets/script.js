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
var lists = document.querySelectorAll("li");
var timer;
var form = document.getElementById("ScoreForm");
var timerTime;
var scoreList = [];
var questionTextBox = document.querySelector(".startPageText");
var bluffAnswers = ["jQuery", "else", "Local Storage", "function", "keydown/keyup", "if", "else/else if", ".querySelector", "True", "Array", "Yes", "for", "script", "Null", "No", "probably a cranberry", "variable", "Robot", "Next Question"];
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
    timerCount = 50;
    getOldScores();
    hideSavestools();
    lossTxt.setAttribute("style", "display: none");
};

function startGame() {
    timerCount = 50;
    questionsLeft = 5;
    choseOption();
    startTimer();
    hideExtra();
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
        if (timerCount === 0) {
            clearInterval(timer);
            lose();
        };
    }, 1000);
};
var questionText = document.createElement("h2");
questionText.setAttribute("id", "questionTextBox");
document.getElementById("questions").appendChild(questionText);
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
    var answeroptions = ['' + genbluff(1) + '', '' + genbluff(1) + '', '' + currentAnswer + '', '' + genbluff(1)];
    Array(answeroptions);
    resetBluff();
    var aO1 = document.createElement("button");
    var aO2 = document.createElement("button");
    var aO3 = document.createElement("button");
    var aO4 = document.createElement("button");
    aO1.setAttribute("id", "aO1");
    aO2.setAttribute("id", "aO2");
    aO3.setAttribute("id", "aO3");
    aO4.setAttribute("id", "aO4");
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
    function deleteOldButton() {
        aO1.remove();
        aO2.remove();
        aO3.remove();
        aO4.remove();
    }
    function checkButton1() {
        var check1 = aO1.textContent;
        if (check1 === currentAnswer) {
            deleteOldButton();
            choseOption();
            questionsLeft--;
        }
        else if (check1 !== currentAnswer) {
            timerCount -= 5;
        };
    }
    function checkButton2() {
        var check2 = aO2.textContent;
        if (check2 === currentAnswer) {
            deleteOldButton();
            choseOption();
            questionsLeft--;
        }
        else if (check2 !== currentAnswer) {
            timerCount -= 5;
        };
    }
    function checkButton3() {
        var check3 = aO3.textContent;
        if (check3 === currentAnswer) {
            deleteOldButton();
            choseOption();
            questionsLeft--;
        }
        else if (check3 !== currentAnswer) {
            timerCount -= 5;
        };
    }
    function checkButton4() {
        var check4 = aO4.textContent;
        if (check4 === currentAnswer) {
            deleteOldButton();
            choseOption();
            questionsLeft--;
        }
        else if (check4 !== currentAnswer) {
            timerCount -= 5;
        };
    }

    document.getElementById("questions").appendChild(aO1);
    document.getElementById("questions").appendChild(aO2);
    document.getElementById("questions").appendChild(aO3);
    document.getElementById("questions").appendChild(aO4);
    aO1.addEventListener("click", checkButton1);
    aO2.addEventListener("click", checkButton2);
    aO3.addEventListener("click", checkButton3);
    aO4.addEventListener("click", checkButton4);

    function genbluff(len) {
        var output = "";
        var currentBlufflist = bluffAnswers;
        Array(currentBlufflist)
        for (let i = 0; i < len; i++) {
            output += " " + currentBlufflist[Math.floor(Math.random() * currentBlufflist.length)] + "";
        }
        const indexbL = bluffAnswers.indexOf(output);
        if (indexbL > -1) {
            currentBlufflist.splice(indexbL, 1);
            console.log(currentBlufflist);
        }
        bluffAnswers = currentBlufflist;
        return (output);
    };
    
};

function getOldScores() {
    listScores.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var scores = scoreList[i];

        var li = document.createElement("li");
        li.textContent = scores;
        li.setAttribute("data-index", i);

        document.getElementById("listScores").appendChild(li);
    }
console.log(lists);
};

function viewScores() {
    saveButton.setAttribute("style","display:none");
    secondpart.setAttribute("style","display:flex");
    lists.setAttribute("style","display:flex");
    playagain.setAttribute("style","display:flex");
    hideExtra();
    hideSavestools();
    getOldScores();
};
function saveScore() {
    secondpart.setAttribute("style","display:none");
    lists.setAttribute("style","display:none");
    firstPart.setAttribute("style","display:none");
    secondpart.setAttribute("style","display:flex");
    form.setAttribute("style", "display: flex");
    playagain.setAttribute("style", "display: flex");
    saveButton.setAttribute("style","display:flex");
    localStorage.setItem("playerScores", JSON.stringify(scoreList));

};
function hideSavestools(){
    saveButton.setAttribute("style", "display: none");
   form.setAttribute("style", "display: none");
}
saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initalInputs = document.querySelector("#inputBox");
    console.log(initalInputs);
    var initalsText = initalInputs.value.trim();
    if (initalsText === "") {
        return;
    } 
    var score = timer;
    scoreList.push(initalsText +" " + score);
    initalInputs.value = "";
    saveScore();
    viewScores();
    
});
viewScoresbnt.addEventListener("click", viewScores);
function lose() {
    viewScores();
    lossTxt.setAttribute("style","display:flex");

};

function hideExtra() {
    para.setAttribute("style", "display: none");
    startButton.disabled = true;
    startButton.setAttribute("style", "display: none");
    questionTextBox.setAttribute("style", "display: none");
}
function hideScores(){
    secondpart.setAttribute("style","display:none");
    lists.setAttribute("style","display:none");

};
startButton.addEventListener("click", startGame);

init();


function playAgain() {
    resetAray();
    para.setAttribute("style", "display: flex");
    startButton.disabled = false;
    startButton.setAttribute("style", "display: flex");
    playagain.setAttribute("style", "display: none");
    saveButton.setAttribute("style", "display: none");
    lossTxt.setAttribute("style","display:none");
    hideScores();
};

playagain.addEventListener("click", playAgain);