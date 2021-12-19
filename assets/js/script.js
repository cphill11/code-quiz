// Global variables that can be accessed w/in any other function or variable
var quizQuestions = [{
    question: "Commonly used data types DO NOT include ___________. ",
    choiceA: "Numbers",
    choiceB: "Booleans",
    choiceC: "Alerts",
    choiceD: "Strings",
    correctAnswer: "a"},
  {
    question: "The condition of an if / else statement is enclosed with _________.",
    choiceA: "Quotes",
    choiceB: "Curley Brackets",
    choiceC: "Parenthesis",
    choiceD: "Square Brackets",
    correctAnswer: "b"},
   {
    question: "Arrays in JavaScript can be used to store __________.",
    choiceA: "Numbers and Strings",
    choiceB: "Other Arrays",
    choiceC: "Booleans",
    choiceD: "All of the Above",
    correctAnswer: "d"},
    {
  
    question: "String values must be enclosed within __________ when being assigned to variables.",
    choiceA: "Commas",
    choiceB: "Curley Brackets",
    choiceC: "Quotes",
    choiceD: "Parenthesis",
    correctAnswer: "c"},  
    {
 
    question: "A quite useful tool used during development and debugging for printing content to the debugger is: ",
    choiceA: "JavaScript",
    choiceB: "terminal/bash",
    choiceC: "for loops",
    choiceD: "console.log",
    correctAnswer: "d"},
];

var nextQuestionIndex = 0;
var quizProgress = 0;
var quizScore = 0;
var highScoreHistory = [];
var timer;

function init() {
    document.getElementById('a').addEventListener('click', selectAnswerEventHandler);
    document.getElementById('b').addEventListener('click', selectAnswerEventHandler);
    document.getElementById('c').addEventListener('click', selectAnswerEventHandler);
    document.getElementById('d').addEventListener('click', selectAnswerEventHandler);
    document.getElementById('startQuizButton').addEventListener('click', startQuizEventHandler);
    document.getElementById('startpage').addEventListener('click', nextQuestionEventHandler);
    document.getElementById('submitScore').addEventListener('click', viewHighScoresEventHandler);
}

// To DO!
function quizTimerUtility(){
   timer = setInterval(function () {
        var d = new Date();
        var seconds = d.getMinutes() * 60 + d.getSeconds(); //convet 00:00 to seconds for easier caculation
        var fiveMin = 60 * 5; //five minutes is 300 seconds!
        var timeleft = fiveMin - seconds % fiveMin; // let's say 01:30, then current seconds is 90, 90%300 = 90, then 300-90 = 210. That's the time left!
        var result = parseInt(timeleft / 60) + ':' + timeleft % 60; //formart seconds into 00:00 
        document.getElementById('demo').innerHTML = result;
    
    }, 500) //calling it every 0.5 second to do a count down

}
function myStopFunction(){
    clearInterval(timer);
}

function endQuizUtility(){
    if (quizProgress == quizQuestions.length) {
        document.getElementById('result-container').classList.remove('hide');
        document.getElementById('question-container').classList.add('hide');
        quizProgress = 0;
        savedScores();
        showHighScores();
    } 
}

function showHighScores(){
    var title = '<h1>Quiz Done!</h1>'
    var element = document.getElementById('result-container');
    element.innerHTML = title + highScoreHistory.join('<br>');
}

var savedScores = function (){
    var playerScore = document.getElementById("initials").value + ":" + quizScore;
    highScoreHistory.push(playerScore);
    localStorage.setItem("quizScore", JSON.stringify(highScoreHistory));
}
  
var loadScores = function () {
    var savedScores = localStorage.getItem("quizScore");
    if (!savedScores) {
        return false;
    }
    highScoreHistory = JSON.parse(savedScores);
}
 
//Displaying current question and options for answers for this quiz  
function randomQuizQuestionsUtility(){
    document.getElementById("quiz-question").textContent = quizQuestions[nextQuestionIndex].question;
    document.getElementById("choiceA").textContent = quizQuestions[nextQuestionIndex].choiceA;
    document.getElementById("choiceB").textContent = quizQuestions[nextQuestionIndex].choiceB;
    document.getElementById("choiceC").textContent = quizQuestions[nextQuestionIndex].choiceC;
    document.getElementById("choiceD").textContent = quizQuestions[nextQuestionIndex].choiceD;
}

function startQuizEventHandler(event){
    nextQuestionIndex = Math.floor(Math.random() * quizQuestions.length);
    randomQuizQuestionsUtility();
    document.getElementById("form-btn-group").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");
    loadScores();
    quizTimerUtility();
}

function selectAnswerEventHandler(event){
    if (event.target.id == quizQuestions[nextQuestionIndex].correctAnswer) {
        quizScore = quizScore+2;
    } 
    nextQuestionEventHandler(event);
}

function nextQuestionEventHandler(event){
    // 5 questions; this will internally check the length of the array
    var questionsLength = quizQuestions.length;

    // if nextQuestion is < 5, increment; otherwise, restart at 0
    if (nextQuestionIndex < questionsLength-1) {
        nextQuestionIndex++;  
    } else {
       nextQuestionIndex = 0;
    }

    // displays appropriate designated answer options to appropriate designated question
    randomQuizQuestionsUtility();

    quizProgress++;
    endQuizUtility();
}

function viewHighScoresEventHandler(){
    document.getElementById('result-container').classList.remove('hide');
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('form-btn-group').classList.add('hide');
    loadScores();
    showHighScores();
}

// end with execute init functionality
init();