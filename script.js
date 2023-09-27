var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false
var level = 0
var userTurn = false;

$(document).on('keydown', function () {
  if (!started) {

    // Iniciar o jogo quando uma tecla for pressionada pela primeira vez
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".block").click(function () {
  if (userTurn) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //Reproduzir som ao clicar com mouse
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //var lastIndex = userClickedPattern.length - 1;
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // Mostrar a sequência de cores
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  userTurn = true;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[[currentLevel]]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, clique qualquer tecla para retornar");
    }, 1000);
      startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // Adicionar e remover classe para efeito visual
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userTurn = false;
  $("#level-title").text("Pressione qualquer tecla para iniciar");
}