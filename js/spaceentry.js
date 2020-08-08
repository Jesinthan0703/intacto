$("#submit").on("click", function (e) {
    e.preventDefault();
    var answer = document.getElementById("answer").value;
    var page = "space1.html";
    // AJAX here
    $.ajax({
        type: "POST",
        url: "apis/check-answer.php",
        datatype: "html",
        data: {
            email: localStorage.email,
            auth_token: localStorage.auth_token,
            answer: answer,
            page: page
        },
        success: function (response) {
            console.log(response);
            var parsedResponse = JSON.parse(response);
            if(parsedResponse == "wrong") {
                // Show error
            }
            else if(parsedResponse == "failed") {
                // Show error
            }
            else if (parsedResponse == "invalid") {
                localStorage.clear();
                window.location.replace("index.php");
            }
            else {
                window.location.replace("space1.html");
            }
        },
        error: function (error) { }
    });
    
});