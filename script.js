$( document ).ready(function() {
    console.log( "ready!" );
    var quizTime = 90;
    var x
    var finished

    $("#start").click(function (e) { 
        e.preventDefault();
        quizTime = 90;
        document.getElementById("start").disabled = true;
        x = setInterval(function() {
            quizTime = quizTime -1;
            if (quizTime < 0) {
                quizTime = 0;
            }
            $("#timer").html(quizTime);
            console.log(quizTime);
            checkFinish();
            }, 1000);
    });

    function checkFinish() {
        if (quizTime <= 0 || finished == true) {
            clearInterval(x);
            document.getElementById("start").disabled = false;
        }
    }

$("ul").click(function (e) { 
    e.preventDefault();
    var element = e.target;
      
      var answer = element.getAttribute("data-answer");
  
      if (answer === "correct") {
        $("#response").html("correct");
      } else {
        // Change the attributes back to their non-animated values
        $("#response").html("wrong");
        if (quizTime <= 5) {
            quizTime = quizTime - quizTime;
        } else {
            quizTime = quizTime - 5;
        }
      }
    });

      







});