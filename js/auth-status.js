// Hide wrapper
document.getElementById("wrapper").style.display = "none";

// Ajax Call to check logged in
$.ajax({
    type: "POST",
    url: "https://intacto.thedanielmark.com/auth-status.php",
    datatype: "html",
    data: {
        email: localStorage.email,
        auth_token: localStorage.auth_token
    },
    success: function (response) {
        console.log(response);
        if (response == "") {
            console.warn("empty");
            document.getElementById("wrapper").style.display = "block";
        }
        else {
            var parsedResponse = JSON.parse(response);
            if (parsedResponse == "invalid") {
                localStorage.clear();
                window.location.replace("index.html");
            }
            else if (parsedResponse == "failed") {
                document.writeln("Some error occurred. Please try again.");
            }
            else {
                document.getElementById("wrapper").style.display = "block";
            }
        }
    },
    error: function (error) { }
});