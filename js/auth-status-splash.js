// Hide wrapper

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
        var parsedResponse = JSON.parse(response);
        if (parsedResponse == "invalid") {
            
        }
        else if (parsedResponse == "failed") {
            document.getElementById("emailContainer").innerHTML = "Some error occurred. Please try again.";
        }
        else {
            window.location.replace(parsedResponse[0].page);
        }
    },
    error: function (error) { }
});