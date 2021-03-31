$( document ).ready(function() {
    console.log( "ready!" );
    var quizTime = 90;
    var x
    var finished
    var question = 1;
    var score = 0;
    var i


    $("#start").click(function (e) { 
        e.preventDefault();
        highscoreList.innerHTML = "";
        score = 0;
        quizTime = 90;
        question = 1;
        finished = false;
        $("#score").text(score);
        document.getElementById("start").style.display = "none";
        x = setInterval(function() {
            quizTime = quizTime -1;
            if (quizTime <= 0) {
                quizTime = 0;
                end()
            }
            
            $("#timer").html(quizTime);
            // console.log(quizTime);
            }, 1000);
            document.getElementById("q1").style.display = "block";
    });


$("ul").click(function (e) { 
    e.preventDefault();
    var element = e.target;
    var answer = element.getAttribute("data-answer");
    
    if (answer === "correct") {
        $("#response").html("correct");
        score = score + 10
    } else {
        $("#response").html("wrong");
        if (quizTime <= 5) {
            quizTime = quizTime - quizTime;
        } else {
            quizTime = quizTime - 5;
        }
    }
    document.getElementById(`q${question}`).style.display = "none";
    question = question + 1;
    $("#score").text(score);
    if (question == 6) {
        end();
    } else {
        document.getElementById(`q${question}`).style.display = "block";}
    });

    function scoreBonus() {
        timeBonus = Math.ceil(quizTime / 5);
        score = timeBonus + score;
        $("#score").text(score);
    }
    var highscoreList = document.querySelector("ol");
    function highscorePage() {
        highscoreList.innerHTML = "";
        var i;
        for (i = 1; i <= localStorage.length; i++) { 
            console.log(localStorage[i]);
            var li = document.createElement("li");
            li.innerText = localStorage[i];
            highscoreList.appendChild(li);
        }

    }
    var clear = document.createElement("BUTTON");
    $("#highscore").click(function (e) { 
        e.preventDefault();
        highscorePage();
        // var clear = document.createElement("BUTTON");
        clear.innerHTML = "clear";
        highscoreList.appendChild(clear);
    });

        $(clear).click(function (e) { 
            e.preventDefault();
            highscoreList.innerHTML = "";
            localStorage.clear();
            console.log("cleared")
        });

        if (finished == true) {
            for (i = 0; i < 6; i++) {
                document.getElementById(`q${i}`).style.display = "none";
            }
            question = 1
        }

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
            console.log(highscore)
            console.log(localStorage)
            console.log(localStorage.length)
        }



});