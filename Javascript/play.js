document.addEventListener('DOMContentLoaded', function(event) {

//Creating a list of words for the type check
  var words = ["Above","Activity","Answer","Autumn","Animal","Banana","Begin","Birthday","Breathe","Breakfast","Business","Candle","Cheap","Common","Computer","Correct","Dangerous","Difficult","Depend","Draw","Duck","Echo","Education","Earth","Error","Example","Expansion","Family","Fiction","Flower","Friend","Fruit","Function","Government","Glass","Growth","Guide","Happiness","Hearing","Humour","History","Increase","Instrument","Invention","Jelly","Journey","Just a long string to ruin your day","Knowledge","Language","Learning","Letter","Liquid","Machine","Memory","Market","Mountain","Nation","Number","Noise","Offer","Opinion","Ornament","Paint","Payment","Person","Powder","Process","Property","Quality","Question","Reaction","Reason","Relation","Respect","Reward","science","Selection","Shade","Silver","Sleep","Smoke","Society","Substance","Server","Talk","Theory","Thought","Time","Trick","Twist","Turn","Verse","Voice","Walk","Water","Weather","Wind","Winter","Year","Phone","Python"];

// Function resets the high-score values within local storage back to the default values
  function rewriteHighscores() {
    var n = ["Computer 1","Computer 2","Computer 3","Computer 4","Computer 5"];
    var s = [22.7, 22.8, 22.9, 23.0, 23.1];
    var old_n = JSON.parse(localStorage.getItem("names"));
    var old_s = JSON.parse(localStorage.getItem("scores"));
    old_n = n;
    old_s = s;
    localStorage.setItem("names", JSON.stringify(old_n));
    localStorage.setItem("scores", JSON.stringify(old_s));
  }

// Function which returns a word from the above list at random
  function getWord() {
    var number = Math.floor(Math.random() * words.length);
    return words[number].toLowerCase();
  }

// Function which splits a word into an array of individual letters
  function makeArray(word) {
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
  function convertToLowercase(array) {
    var check_array = [];
    for (var i = 0; i < array.length; i++) {
      check_array.push(array[i].toLowerCase());
    };
    return check_array;
  }

// Function that removes the word from the display
  function removeWord() {
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

  function extractFromLocalstorage() {
    var names = JSON.parse(localStorage.getItem("names"));
    var scores = JSON.parse(localStorage.getItem("scores"));
    var array_of_names_and_scores = [];
    for (var i = 0; i < names.length; i++) {
      array_of_names_and_scores.push({"name": names[i], "score": scores[i]})
    };
    return array_of_names_and_scores;
  }

  function writeToLocalstorage(array_of_objects) {
    var names = [];
    var scores = [];
    for (var i = 0; i < array_of_objects.length; i++) {
      names.push(array_of_objects[i]['name']);
      scores.push(array_of_objects[i]['score']);
    };
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  function writeScoresToPage(array_of_objects) {
    for (var i = 0; i < 5; i++) {
      document.getElementById(String(i)).innerHTML = array_of_objects[i]['name'];
    };
    for (var i = 5; i < 10; i++) {
      document.getElementById(String(i)).innerHTML = array_of_objects[i-5]['score'];
    };
  }

  function bubbleSort(array_of_objects) {
    var swapped;
    do {
      swapped = false;
      for (var i=0; i < array_of_objects.length-1; i++) {
        if (array_of_objects[i]['score'] > array_of_objects[i+1]['score']) {
          var temp = array_of_objects[i];
          array_of_objects[i] = array_of_objects[i+1];
          array_of_objects[i+1] = temp;
          swapped = true;
        }
      };
    } while (swapped);
    return array_of_objects;
  }

  function updateHighscores() {
    var current_highscores = extractFromLocalstorage();
    var new_score = (Math.round(record_time*10)/10);
    if (new_score < current_highscores[4]['score']) {
      var player_name = prompt("Highscore! Enter your name: ");
      current_highscores[4]['name'] = player_name;
      current_highscores[4]['score'] = new_score;
      var new_scores = bubbleSort(current_highscores);
      writeToLocalstorage(new_scores);
      writeScoresToPage(new_scores);
    };
  }

// Cheat function which increases the player speed for demonstration purposes.
  function cheat() {
    player_speed = 1;
    document.getElementById("cheat").innerHTML += " (Cheat mode)";
    document.getElementById("cheat").removeEventListener("click", cheat);
  }

  // Event listener runs the cheat function when the "Click start to play text is clicked"
  document.getElementById("cheat").addEventListener("click", cheat);


// MAIN CODE
// Function (race) currently moves the computer and player element at a constant rate across the screen until they reach a fixed point
  // Defining global variables
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
    // Function controls the timer
    function record() {
      if (position_player >= finish || position_computer >= finish) {
        // Stop timer on race completion
        clearInterval(timer);
      }
      else {
        //Timer increments in 0.01 second intervals for accuracy
        record_time += 0.01;
        var intCheck = (Math.round(record_time*10));
        // Only want to dislpay in increments of 0.1 seconds
        if (Number.isInteger(intCheck)) {
          document.getElementById('timer').innerHTML = (Math.round(record_time*10)/10);
        };
      };
    };
    function frame() {
      // If the race has concluded stop the cars. Delay for 0.2 seconds and diplay the result. Delay for a further 0.5 seocnds then alert if a highscore is acheived.
      if (position_player >= finish || position_computer >= finish) {
        clearInterval(id);
        removeWord();
        setTimeout(result, 200);
        setTimeout(updateHighscores, 700);
      }
      // If the race is ongoing update the cars x-position by the specifed amounts.
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
    var test_word = makeArray(getWord());
    displayWord(test_word);
    var array_check = convertToLowercase(test_word);
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
            removeWord();
          };
        }
        else {
          // Reduce speed if the input does not match the diplayed word
          document.removeEventListener('keydown', check);
          var span_id = tracker.toString();
          document.getElementById(span_id).style.backgroundColor = "rgba(255,0,0,0.7)";
          if (speed > 0) {
            speed -= player_speed;
          };
          // Delay next word by 0.8 seconds
          setTimeout(function () {
            removeWord();
            if (position_player < finish && position_computer < finish) {
              // Recall function to display next word
              enableType();
            };
          }, 800);
        };
        if (tracker == array_check.length){
          // If the input is correct and the word is complete, increase speed
          document.removeEventListener('keydown', check);
          speed += player_speed;
          setTimeout(function () {
            removeWord();
            // Delay next word by 0.4 seconds. Less than for incorrect words to reduce user mistakes.
            if (position_player < finish && position_computer < finish) {
              // Recall funcion to display next word
              enableType();
            };
          }, 400);
        };
      }
      else {
        document.removeEventListener('keydown', check);
      };
    }
    // Enable the event listener for the keyboard
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
  // rewriteHighscores();
  writeScoresToPage(extractFromLocalstorage());
  console.log(extractFromLocalstorage());

});
