document.addEventListener('DOMContentLoaded', function(event) {

// Creating a list of words for the type check
  var words = ["Alfa","Banana","Bravo","Charlie","Delta","Echo","Function","Just a long string to ruin your day","Server","Phone","Python","Happiness","Animal"];

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
  }

// MAIN CODE
// Function currently moves the computer element at a constant rate across the screen to a fixed point
  var position_player = 25;
  var position_computer = 25;
  var speed = 0;
  var finish = 1400;
  var time = 0;
  function race() {
    var racer_computer = document.getElementById('computer-racer');
    var racer_player = document.getElementById('player-racer');
    var id = setInterval(frame, 5);
    var timer = setInterval(record, 100);
    function record() {
      if (position_player >= finish || position_computer >= finish) {
        clearInterval(record);
      }
      else {
        time += 0.1;
        document.getElementById('timer').innerHTML = (Math.round(time*10)/10);
      };
    };
    function frame() {
      if (position_player >= finish || position_computer >= finish) {
        clearInterval(id);
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
          result();
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
            result();
          };
        }, 400);
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
            result();
          };
        }, 400);
      };
    };
    document.addEventListener('keydown', check);
  }


// Event listener for the start button
  document.getElementById("Start").addEventListener("click", function(event) {
    document.getElementById("Start").disabled = true;
    race();
    enableType();
  });


});
