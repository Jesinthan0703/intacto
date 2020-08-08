function check() {
  if(document.getElementById('check1').checked == 1) {
    var c1 = true;
  }
  else {
    var c1 = false;
  }
  if(document.getElementById('check2').checked == 1) {
    var c2 = true;
  }
  else {
    var c2 = false;
  }
  if(document.getElementById('check3').checked == 1) {
    var c3 = true;
  }
  else {
    var c3 = false;
  }
  if(document.getElementById('check4').checked == 1) {
    var c4 = true;
  }
  else {
    var c4 = false;
  }
  if(document.getElementById('check5').checked == 1) {
    var c5 = true;
  }
  else {
    var c5 = false;
  }
  if(document.getElementById('check6').checked == 1) {
    var c6 = true;
  }
  else {
    var c6 = false;
  }
  if(document.getElementById('check7').checked == 1) {
    var c7 = true;
  }
  else {
    var c7 = false;
  }
  if(document.getElementById('check8').checked == 1) {
    var c8 = true;
  }
  else {
    var c8 = false;
  }

  console.log(c1);
  console.log(c2);
  console.log(c3);
  console.log(c4);
  console.log(c5);
  console.log(c6);
  console.log(c7);
  console.log(c8);

  // Ajax Call
  $.ajax({
    type: "POST",
    url: "https://intacto.thedanielmark.com/space1.php",
    datatype: "html",
    data: {
      email: localStorage.email,
      auth_token: localStorage.auth_token,
      answer1: c1,
      answer2: c2,
      answer3: c3,
      answer4: c4,
      answer5: c5,
      answer6: c6,
      answer7: c7,
      answer8: c8,
    },
    success: function (response) {
      console.log(response);
      var parsedResponse = JSON.parse(response);
      if(parsedResponse == "correct") {
        window.location.replace("time1.html");
      }
      else if(parsedResponse == "failed") {
        document.writeln("Oops, something went wrong. Please reload the page the page and try again.");
      }
      else if(parsedResponse == "invalid") {
        localStorage.clear();
        window.location.replace("index.html");
      }
      else {
        window.alert("Please check your answers!");
      }
    },
    error: function (error) { }
  });
}