'use strict';

let buttonColors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []
let level = 0


function nextSequence() {
    userClickedPattern = []

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    console.log(gamePattern);
    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play()
    level += 1
    $('.header').text('Level ' + level)
}

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern);
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
});

function playSound(name) {

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play()
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 200);
};

$('body').one('keypress', function (event) {
    $('.header').text('Level 0')
    nextSequence();
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 800);
        }
    } else {
        var audio = new Audio('sounds/wrong.mp3')
        audio.play()
        $('body').addClass('game-over')
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 300);
        $('.header').text('Game Over, Press Any Key to Restart')
        $(".btn").addClass('disabled-button');
        $('body').keypress(function () {
            location.reload()
        })

    }
}


