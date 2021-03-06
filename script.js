// Document ready function to use jquery
$( document ).ready(function() {
    var quizTime = 90;
    var x
    var finished
    var question = 1;
    var score = 0;
    var i
    var clear = document.createElement("BUTTON");
    var highscoreList = document.querySelector("ol");
    // Start button to commence start of quiz and reset standard variables
    $("#start").click(function (e) { 
        e.preventDefault();
        highscoreList.innerHTML = "";
        score = 0;
        quizTime = 90;
        question = 1;
        finished = false;
        $("#score").text(score);
        // To hide the start button to make the page look cleaner during the quiz
        document.getElementById("start").style.display = "none";
        x = setInterval(function() {
            quizTime = quizTime -1;
            if (quizTime <= 0) {
                quizTime = 0;
                end()
            }
            // Update the timer value
            $("#timer").html(quizTime);
            }, 1000);
        document.getElementById("q1").style.display = "block";
    });
    // This is what runs when you choose an answer in the quiz
    $("ul").click(function (e) { 
        e.preventDefault();
        var element = e.target;
        var answer = element.getAttribute("data-answer");
        // Checks the LI's attribute property to check if its correct or wrong
        if (answer === "correct") {
            $("#response").html("Correct");
            score = score + 10
        } else {
            $("#response").html("Wrong");
            if (quizTime <= 5) {
                quizTime = quizTime - quizTime;
            } else {
                quizTime = quizTime - 5;
            }
        }
        // The question divs have been strategically named "q" followed by a number to determine the question order
        document.getElementById(`q${question}`).style.display = "none"; // Hide the current question
        question = question + 1;
        $("#score").text(score);
        if (question == 6) {
            end();
        } else {
            document.getElementById(`q${question}`).style.display = "block"; // Show the new question
        }
    });
    // when use clicks highscore anchor run this
    $("#highscore").click(function (e) { 
        e.preventDefault();
        highscorePage();
        clear.innerHTML = "clear";
        highscoreList.appendChild(clear);
    });
    // Used to reset all scores
    $(clear).click(function (e) { 
        e.preventDefault();
        highscoreList.innerHTML = "";
        localStorage.clear();
    });
    // Fun little bonus for finishing sooner
    function scoreBonus() {
        timeBonus = Math.ceil(quizTime / 5);
        score = timeBonus + score;
        $("#score").text(score);
    }
    // Display highscores
    function highscorePage() {
        highscoreList.innerHTML = "";
        var i;
        for (i = 1; i <= localStorage.length; i++) { 
            var li = document.createElement("li");
            li.innerText = localStorage[i];
            highscoreList.appendChild(li);
        }
    }
    // when the quiz finishes either by answering the questions or running out of time
    function end() {
        scoreBonus();
        $("#response").html(null);
        var highscore = prompt("Please enter your initials") + (` ${score}`)
        i = localStorage.length+1;
        localStorage.setItem(i, highscore);
        clearInterval(x);
        document.getElementById("start").style.display = "block";
        for (i = 1; i < 6; i++) {
            document.getElementById(`q${i}`).style.display = "none";
        }
    }
});