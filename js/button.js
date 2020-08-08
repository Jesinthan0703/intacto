$(function () {
  $(".save-button").on("click", function (e) {
    e.preventDefault();
    $(".loading-bar").addClass("loading-bar-anim");
    $(".no1").attr("style", "opacity: 1");
    $(".no3").attr("style", "opacity: 0");
    $(".no1").addClass("text-anim1");
    $(".no2").addClass("text-anim2");
    $(".no3").addClass("text-anim3");

    setTimeout(() => {
      $(".loading-bar").removeClass("loading-bar-anim");
      $(".loading-bar").attr("style", "width: 100%");
      setTimeout(() => {
        $(".no1").removeClass("text-anim1");
        $(".no1").attr("style", "opacity: 0");
      }, 1000);
      setTimeout(() => {
        $(".no2").removeClass("text-anim2");
      }, 1000);
      setTimeout(() => {
        $(".no3").removeClass("text-anim3");
        $(".no3").attr("style", "opacity: 1");
      }, 1000);
    }, 3000);

    setTimeout(() => {
      if (!$(".loading-bar").hasClass("loading-bar-anim")) {
        $(".loading-bar").addClass("loading-bar-anim-rewind");
        $(".no3").addClass("text-anim3-rewind");
        $(".no1").addClass("text-anim1-rewind");

        setTimeout(() => {
          $(".loading-bar").removeClass("loading-bar-anim-rewind");
          $(".loading-bar").attr("style", "width: 0%");
          setTimeout(() => {
            $(".no3").removeClass("text-anim3-rewind");
            $(".no3").attr("style", "opacity: 0");
          }, 500);
          setTimeout(() => {
            $(".no1").removeClass("text-anim1-rewind");
            $(".no1").attr("style", "opacity: 1");
          }, 500);
        }, 1000);
      }
    }, 4000);

    // Ajax Call
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.ajax({
      type: "POST",
      url: "https://intacto.thedanielmark.com/login.php",
      datatype: "html",
      data: {
        email: email,
        password: password
      },
      success: function (response) {
        console.log(response);
        var parsedResponse = JSON.parse(response);
        if (parsedResponse[0] == "invalid") {
          document.getElementById("emailContainer").innerHTML = "Wrong password.";
        }
        else if (parsedResponse[0] == "failed") {
          document.getElementById("emailContainer").innerHTML = "Some error occurred. Please try again";
        }
        else {
          if (parsedResponse[0].page == null) {
            localStorage.email = parsedResponse[0].email;
            localStorage.auth_token = parsedResponse[0].auth_token;
            window.location.replace("story.html");
          }
          else {
            localStorage.email = parsedResponse[0].email;
            localStorage.auth_token = parsedResponse[0].auth_token;
            window.location.replace(parsedResponse[0].page);
          }
        }
      },
      error: function (error) { }
    });

    /*if ($(".loading-bar").css("width") == "100%") {
        $(".text-anim1").attr("style", "animation-delay: 1s");
        $(".text-anim2").attr("style", "animation-delay: 2s");
        $(".text-anim3").attr("style", "animation-delay: 3s");
        $(".loading-bar").addClass("loading-bar-anim-rewind");
        $(".no3").addClass("text-anim3-rewind");
        $(".no1").addClass("text-anim1-rewind");
        
        setTimeout(() => {
          $(".loading-bar").removeClass("loading-bar-anim-rewind");
          setTimeout(() => {
            $(".no3").removeClass("text-anim3-rewind");
            $(".no3").attr("style", "opacity: 0");
          }, 500);
          setTimeout(() => {
            $(".no1").removeClass("text-anim1-rewind");
          }, 500);
        }, 1000);
      }*/
  });
});
