
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var start = false;

$(document).on("keydown", function() {
    if (!start) {
        $("#level-title").text("Level 0");
        nextSequence();
        start = true;
    }
});


$(".btn").on("click", function() {
    if (start) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }
});

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#level-title").text("Level " + level);
    level++;

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(soundName) {
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

// here I check every click
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();

        startOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
  }