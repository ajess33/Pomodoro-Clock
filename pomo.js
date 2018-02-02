// Dont change time if the wrong clock is on
// What happens when break timer gets to 0?
// Find a sound effect

$(document).ready(function() {

  var setBreak = 5;
  var setSession = 25;
  var breakLength = setBreak * 60;
  var sessionLength = setSession * 60;
  var clock;
  var audio = new Audio('http://scambuster.info/audio/time_up.wav');

  clock = $(".clock").FlipClock(sessionLength, {
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {

      interval: function() {
        var time = clock.getTime().time;
        if (time === 0) {
          audio.play();
          // Start break timer
          startBreak();
        }
      }
    }
  })

  function startBreak() {
    clock.setTime(breakLength);
    $("#currentTimer").html("Break");
    var time = clock.getTime().time;
    if (time === 0) {
      audio.play();
      // Start session
      clock.start();
    }
  }

  // Add or subtract from break timer
  $("#plusBreak").click(function() {
    setBreak += 1;
    breakLength += 60;
    $("#breakLen").html(setBreak);
  })
  $("#minusBreak").click(function() {
    if (setBreak > 1) {
      setBreak -= 1;
      breakLength -= 60;
    }
    $("#breakLen").html(setBreak);
  })

  // Add or subtract from session timer
  $("#plusSession").click(function() {
    setSession += 1;
    sessionLength += 60;
    $("#sessionLen").html(setSession);
    clock.setTime(sessionLength);
  })
  $("#minusSession").click(function() {
    if (setSession > 1) {
      setSession -= 1;
      sessionLength -= 60;
    }
    $("#sessionLen").html(setSession);
    clock.setTime(sessionLength);
  })

  // Start the timer
  $("#start").click(function() {
    clock.start();
    $("#currentTimer").html("Session");
  })

  // Pause the timer
  $("#stop").click(function() {
    clock.stop();
  })

  // Reset the timer
  $("#reset").click(function() {
    clock.stop();
    clock.setTime(sessionLength);
  })

})