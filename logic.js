
var app = app || {};
app.dom = {};
let currentQuestion = 0;
let questions = {};
let correctAnswer = "";

app.init = function()
{
    app.setupDOM();
    app.addListeners();
    app.getQuestions();
}

app.setupDOM = function()
{
    app.dom.question         = document.getElementById('question');
    app.dom.correctOverlay   = document.getElementById('correctOverlay');
    app.dom.incorrectOverlay = document.getElementById('incorrectOverlay');
    app.dom.trueBtn          = document.getElementById('trueBtn');
    app.dom.falseBtn         = document.getElementById('falseBtn');
}

app.addListeners = function()
{
    app.dom.trueBtn.addEventListener('click', function(){ app.checkAnswer("True")});
    app.dom.falseBtn.addEventListener('click', function(){ app.checkAnswer("False")});
}

app.gameLoop = function()
{
    let newQuestion            = questions.results[currentQuestion];
    app.dom.question.innerHTML = questions.results[currentQuestion].question;
    correctAnswer              = questions.results[currentQuestion].correct_answer;
    console.log(questions.results[currentQuestion]);
    console.log(correctAnswer);
}

app.checkAnswer = function(selectedAnswer)
{
    if(selectedAnswer == correctAnswer)
    {
        app.dom.correctOverlay.style.display = "block";
        setTimeout(function(){app.dom.correctOverlay.style.display = "none"}, 200);
    }
    else
    {
        app.dom.incorrectOverlay.style.display = "block";
        setTimeout(function(){app.dom.incorrectOverlay.style.display = "none"}, 200);
    }
    currentQuestion++;
    app.gameLoop();
}

app.getQuestions = function()
{
  let xmlhttp = new XMLHttpRequest();
  let url     = "https://opentdb.com/api.php?amount=40&difficulty=hard&type=boolean";

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          questions = JSON.parse(xmlhttp.responseText);
          app.gameLoop();
      }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}




setTimeout(function(){app.init();}, 10);




