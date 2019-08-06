var questions = [{
        question: "Name the largest freshwater lake in the world?",
        choices: ["Michigan", "Taho", "Victoria", "Superior"],
        correct: "Superior",
    },

    {
        question: "What is the capital city of Spain?",
        choices: ["Madrid", "Barcelona", "Valencia"],
        correct: "Madrid"
    },
    {
        question: "What colour is a Himalayan poppy?",
        choices: ["red", "blue", "yellow"],
        correct: "red",
    }




]
var counter = 30;
var currentQ = 0;
var score = 0;
var incorrect = 0;
var timer;

function next() {
    var lastQ = (questions.length - 1) === currentQ;
    if (lastQ) {
        resutl();

    } else {

        currentQ++;
        loadQ();
    }



}


function clear() {
    clearInterval(timer);
    incorrect++;
    timeOut();
    setTimeout(next, 3 * 1000);



}

function countDow() {
    counter--;
    $("#time").html("Time Remaining: " + counter);
    if (counter === 0) {

        clear();



    }
}



function loadQ() {
    var question = questions[currentQ].question;
    var choices = questions[currentQ].choices;
    counter = 30;
    timer = setInterval(countDow, 1000);

    $("#time").text("Time Remaining: " + counter);
    $('#game').html(`<h4>${question}</h4> 
    ${loadC(choices)}`)



};


function loadC(choices) {
    var result = ' ';
    for (let i = 0; i < choices.length; i++) {
        result += `<p class ="choice" data-answer="${choices[i]}"> ${choices[i]}</p>`;

    }
    return result;
}

$(document).on("click", ".choice", function() {
    clearInterval(timer);
    var selectAns = $(this).attr("data-answer");
    var correctAns = questions[currentQ].correct;
    if (correctAns === selectAns) {
        score++;
        timeOut("win");
        setTimeout(next, 3 * 1000);

    } else {
        incorrect++;
        timeOut();
        setTimeout(next, 3 * 1000);

    }

});

function resutl() {
    var result = `
    <p> You have ${score} right answer(s) </p>
    <p> You have ${incorrect} wrong answer(s) </p>
    <button class= "btn btn-success" id= "reset">Play again</button>
    `;

    $("#game").html(result);


}
$(document).on("click", "#reset", function() {
    counter = 30;
    currentQ = 0;
    score = 0;
    incorrect = 0;
    timer = null;

    loadQ();
})


function timeOut(output) {
    var correctAns = questions[currentQ].correct;
    if (output === "win") {
        $('#game').html(`<p> That is correct</p>`);


    } else {
        $('#game').html(`<p> Try Again, the correct answer is ${correctAns}</p>`)
    }


}
$("#start").click(function() {
    $("#start").remove();
    $("#time").html(counter);
    loadQ();
});