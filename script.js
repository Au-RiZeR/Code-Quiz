$( document ).ready(function() {
    console.log( "ready!" );
    var quizTime = 90;
    var x
    var finished
    var question = 1;
    var score = 0;

    $("#start").click(function (e) { 
        e.preventDefault();
        score = 0;
        quizTime = 90;
        finished = false;
        $("#score").text(score);
        document.getElementById("start").style.display = "none";
        x = setInterval(function() {
            quizTime = quizTime -1;
            if (quizTime < 0) {
                quizTime = 0;
            }
            $("#timer").html(quizTime);
            console.log(quizTime);
            checkFinish();
            }, 1000);
            document.getElementById("q1").style.display = "block";
    });

    function checkFinish() {
        if (quizTime <= 0 || finished == true) {
            clearInterval(x);
            document.getElementById("start").style.display = "block";
        }
    }

$("ul").click(function (e) { 
    e.preventDefault();
    var element = e.target;
    var answer = element.getAttribute("data-answer");
    
    // document.getElementById(`q${question}`).style.display = "none";

      if (answer === "correct") {
        $("#response").html("correct");
        score = score + 10
      } else {
        // Change the attributes back to their non-animated values
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
          finished = true;
          question = 1;
          scoreBonus();
      } else {
      document.getElementById(`q${question}`).style.display = "block";}
    });

    function scoreBonus() {
        timeBonus = quizTime / 5;
        score = timeBonus + score;
        $("#score").text(score);
    }
      







});