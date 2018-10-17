document.addEventListener('DOMContentLoaded', function(event) {

// var n = ["Computer 1","Computer 2","Computer 3","Computer 4","Computer 5"];
// var s = [22.7, 22.8, 22.9, 23.0, 23.1];
// var old_n = JSON.parse(localStorage.getItem("names"));
// var old_s = JSON.parse(localStorage.getItem("scores"));
// old_n = n;
// old_s = s;
// localStorage.setItem("names", JSON.stringify(old_n));
// localStorage.setItem("scores", JSON.stringify(old_s));

// Creating a list of words for the type check
  var words = ["Alfa","Above","Activity","Answer","Another one","Autumn","Animal","Banana","Begin","Birthday","Bravo","Breathe","Breakfast","Business","Candle","Cheap","Charlie","Common","Computer","Correct","Dangerous","Delta","Difficult","Depend","Draw","Duck","Echo","Function","Happiness","Just a long string to ruin your day","Server","Phone","Python",];

// Function which returns a word from the above list at random
  function getWord() {
    var number = Math.floor(Math.random() * words.length);
    return words[number];
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
      document.getElementById("outcome").innerHTML = "You win";
    }
    else if (position_computer > position_player) {
      document.getElementById("outcome").innerHTML = "You lose";
    }
    else if (position_player == position_computer) {
      document.getElementById("outcome").innerHTML = "It's a tie";
    }
    else {
      document.getElementById("outcome").innerHTML = "Something went wrong";
    }
    document.getElementById("Start").value = "Restart";
    document.getElementById("Start").disabled = false;
  }

// Sidenote: in progress
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

// Function which checks for a highscore and updates the localStorage (currently bugged)
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

// End side note

// MAIN CODE
// Function (race) currently moves the computer and player element at a constant rate across the screen until they reach a fixed point
  var position_player = 25;
  var position_computer = 25;
  var speed = 0;
  var finish = 1400;
  var record_time = 0;
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
        result();
        setTimeout(highscore, 500);
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
      if (event.key === array_check[tracker]) {
        var span_id = tracker.toString();
        document.getElementById(span_id).style.backgroundColor = "green";
        tracker += 1;
        // Checks on each successful click whether the race has concluded
        if (position_player >= finish || position_computer >= finish) {
          document.removeEventListener('keydown', check);
          removeElements();
          //result();
        }
      }
      else {
        document.removeEventListener('keydown', check);
        var span_id = tracker.toString();
        document.getElementById(span_id).style.backgroundColor = "red";
        if (speed > 0) {
          speed -= 0.1;
        };
        setTimeout(function () {
          removeElements();
          if (position_player < finish && position_computer < finish) {
            enableType();
          }
          else {
            //result();
          };
        }, 800);
      };
      if (tracker == array_check.length){
        document.removeEventListener('keydown', check);
        speed += 0.1;
        setTimeout(function () {
          removeElements();
          if (position_player < finish && position_computer < finish) {
            enableType();
          }
          else {
            //result();
          };
        }, 400);
      };
    };
    document.addEventListener('keydown', check);
  }


// Event listener for the start button
  document.getElementById("Start").addEventListener("click", function(event) {
    position_player = 25;
    position_computer = 25;
    speed = 0;
    record_time = 0;
    document.getElementById("outcome").innerHTML = "";
    document.getElementById("Start").disabled = true;
    race();
    enableType();
  });

});
