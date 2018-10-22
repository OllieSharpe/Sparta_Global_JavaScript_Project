document.addEventListener('DOMContentLoaded', function(event) {

// //Code resets the high-score values within local storage back to the default values
// var n = ["Computer 1","Computer 2","Computer 3","Computer 4","Computer 5"];
// var s = [22.7, 22.8, 22.9, 23.0, 23.1];
// var old_n = JSON.parse(localStorage.getItem("names"));
// var old_s = JSON.parse(localStorage.getItem("scores"));
// old_n = n;
// old_s = s;
// localStorage.setItem("names", JSON.stringify(old_n));
// localStorage.setItem("scores", JSON.stringify(old_s));

//Creating a list of words for the type check
  var words = ["Above","Activity","Answer","Autumn","Animal","Banana","Begin","Birthday","Breathe","Breakfast","Business","Candle","Cheap","Common","Computer","Correct","Dangerous","Difficult","Depend","Draw","Duck","Echo","Education","Earth","Error","Example","Expansion","Family","Fiction","Flower","Friend","Fruit","Function","Government","Glass","Growth","Guide","Happiness","Hearing","Humour","History","Increase","Instrument","Invention","Jelly","Journey","Just a long string to ruin your day","Knowledge","Language","Learning","Letter","Liquid","Machine","Memory","Market","Mountain","Nation","Number","Noise","Offer","Opinion","Ornament","Paint","Payment","Person","Powder","Process","Property","Quality","Question","Reaction","Reason","Relation","Respect","Reward","science","Selection","Shade","Silver","Sleep","Smoke","Society","Substance","Server","Talk","Theory","Thought","Time","Trick","Twist","Turn","Verse","Voice","Walk","Water","Weather","Wind","Winter","Year","Phone","Python"];

// Function which returns a word from the above list at random
  function getWord() {
    var number = Math.floor(Math.random() * words.length);
    return words[number].toLowerCase();
  }

// Function which splits a word into an array of individual letters
  function make_array(word) {
    var word_array = [];
    for (var i = 0; i < word.length; i++) {
      word_array.push(word.charAt(i));
    }
    return word_array;
  }

// Function which takes the letters array and places them succesively in spans which are diplayed in the html
  function displayWord(array) {
    for (var i = 0; i < array.length; i++) {
      var element = document.createElement("span");
      element.innerHTML = array[i];
      element.id = i;
      document.getElementById("word-display").appendChild(element);
    }
  }

// function converts an array to lowercase lettering, returns a new array.
  function lowercase(array) {
    var check_array = [];
    for (var i = 0; i < array.length; i++) {
      check_array.push(array[i].toLowerCase());
    };
    return check_array;
  }

// Function that removes the word from the display
  function removeElements() {
    document.getElementById("word-display").innerHTML = "";
  }

// Function which compares the position of the player and computer to return the race result. (To be run on race completion)
  function result() {
    if (position_player > position_computer) {
      document.getElementById("word-display").innerHTML = "You win";
    }
    else if (position_computer > position_player) {
      document.getElementById("word-display").innerHTML = "You lose";
        console.log(position_computer);
    }
    else if (position_player == position_computer) {
      document.getElementById("word-display").innerHTML = "It's a tie";
    }
    else {
      document.getElementById("word-display").innerHTML = "Something went wrong";
    }
  }

// Function which updates the highscores array
  function ordering(position, array, replace) {
    array.push(0);
    for (var i = (array.length - 1); i > position; i--) {
      array[i] = array[i-1];
    }
    array[position] = replace;
    array.splice(5, 1);
    var ordered_array = array;
    return ordered_array;
  }

// Function which checks for a highscore and updates the localStorage. Function also updates the score board within the HTML (To be run on race completion).
  function highscore() {
    var holder_names = localStorage.getItem("names");
    var holder_scores = localStorage.getItem("scores");
    var names;
    var scores;
    var pos = 0;
    if (holder_names) {
      names = JSON.parse(holder_names)
    };
    if (holder_scores) {
      scores = JSON.parse(holder_scores)
    };
    var record_time_rounded = (Math.round(record_time*10)/10);
    if (record_time_rounded <= scores[4]) {
      var player_name = prompt("Highscore! Enter your name: ");
      for (var i = 4; i >= 0; i--) {
        if (record_time_rounded <= scores[i]) {
          pos = i;
        };
      };
      scores = ordering(pos, scores, record_time_rounded);
      names = ordering(pos, names, player_name);
      localStorage.setItem("names", JSON.stringify(names));
      localStorage.setItem("scores", JSON.stringify(scores));
      for (var i = 0; i < 5; i++) {
        document.getElementById(String(i)).innerHTML = names[i];
      };
      for (var i = 5; i < 10; i++) {
        document.getElementById(String(i)).innerHTML = scores[i-5];
      };
    }
    else {
      for (var i = 0; i < 5; i++) {
        document.getElementById(String(i)).innerHTML = names[i];
      };
      for (var i = 5; i < 10; i++) {
        document.getElementById(String(i)).innerHTML = scores[i-5];
      };
    };
  }

// Function which displays the current highscores on the webpage from local stroage.
  function scores() {
    var holder_names = localStorage.getItem("names");
    var holder_scores = localStorage.getItem("scores");
    var names;
    var scores;
    if (holder_names) {
      names = JSON.parse(holder_names)
    };
    if (holder_scores) {
      scores = JSON.parse(holder_scores)
    };
    for (var i = 0; i < 5; i++) {
      document.getElementById(String(i)).innerHTML = names[i];
    };
    for (var i = 5; i < 10; i++) {
      document.getElementById(String(i)).innerHTML = scores[i-5];
    };
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("scores", JSON.stringify(scores));
  }

// Function which increases the player speed for demonstration purposes.
  function cheat() {
    player_speed = 1;
  }

  document.getElementById("cheat").addEventListener("click", cheat);


// MAIN CODE
// Function (race) currently moves the computer and player element at a constant rate across the screen until they reach a fixed point
  var position_player = 25;
  var position_computer = 25;
  var speed = 0;
  var finish = 1400;
  var record_time = 0;
  var player_speed = 0.1;
  function race() {
    var racer_computer = document.getElementById('computer-racer');
    var racer_player = document.getElementById('player-racer');
    var id = setInterval(frame, 5);
    var timer = setInterval(record, 10);
    function record() {
      if (position_player >= finish || position_computer >= finish) {
        clearInterval(timer);
      }
      else {
        record_time += 0.01;
        var intCheck = (Math.round(record_time*10));
        if (Number.isInteger(intCheck)) {
          document.getElementById('timer').innerHTML = (Math.round(record_time*10)/10);
        };
      };
    };
    function frame() {
      if (position_player >= finish || position_computer >= finish) {
        clearInterval(id);
        removeElements();
        setTimeout(result, 200);
        setTimeout(highscore, 700);
      }
      else {
        position_computer += 0.3;
        position_player += speed;
        racer_computer.style.paddingLeft = (position_computer + "px");
        racer_player.style.paddingLeft = (position_player + "px");
      };
    };
  }


// function which cycles the process of checking the input words against the display
// Enables typing on the main webpage

  function enableType() {
    // Generating and displaying the word
    var test_word = make_array(getWord());
    displayWord(test_word);
    var array_check = lowercase(test_word);
    var tracker = 0;
    var stop = 0;
    // Creating the function to run on key inputs
    var check = function checker(event) {
      // Checking if the key press is correct
      if (position_player < finish && position_computer < finish) {
        if (event.key === array_check[tracker]) {
          var span_id = tracker.toString();
          document.getElementById(span_id).style.backgroundColor = "rgba(0,255,0,0.6)";
          tracker += 1;
          // Checks on each successful click whether the race has concluded
          if (position_player >= finish || position_computer >= finish) {
            document.removeEventListener('keydown', check);
            removeElements();
          };
        }
        else {
          document.removeEventListener('keydown', check);
          var span_id = tracker.toString();
          document.getElementById(span_id).style.backgroundColor = "rgba(255,0,0,0.7)";
          if (speed > 0) {
            speed -= player_speed;
          };
          setTimeout(function () {
            removeElements();
            if (position_player < finish && position_computer < finish) {
              enableType();
            };
          }, 800);
        };
        if (tracker == array_check.length){
          document.removeEventListener('keydown', check);
          speed += player_speed;
          setTimeout(function () {
            removeElements();
            if (position_player < finish && position_computer < finish) {
              enableType();
            };
          }, 400);
        };
      }
      else {
        document.removeEventListener('keydown', check);
      };
    }
    document.addEventListener('keydown', check);
  }


// Event listener for the start button, refreshes page on second click once the button value has been changed.
  document.getElementById("Start").addEventListener("click", function(event) {
    var button = document.getElementById("Start");
    if (button.value === "Start") {
      document.getElementById("Start").value = "Reset";
      document.getElementById("Start").disabled = true;
      document.getElementById("Start").disabled = false;
      race();
      enableType();
    }
    else {
      document.location.reload();
    };
  });

// Displays hghscores on page load.
  scores();

});
