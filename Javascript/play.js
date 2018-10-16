document.addEventListener('DOMContentLoaded', function(event) {

// Creating a list of words for the type check
  var words = ["Alfa","Bravo","Charlie","Delta","Echo"];

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

// MAIN CODE
// Function currently moves the computer element at a constant rate across the screen to a fixed point
  var position_player = 25;
  var position_computer = 25;
  function race() {
    var racer_computer = document.getElementById('computer-racer');
    var racer_player = document.getElementById('player-racer');
    speed = 0;
    var id = setInterval(frame, 5);
    function frame() {
      if (position_player >= 1400 || position_computer >= 1400) {
        clearInterval(id);
      }
      else {
        position_computer += 1;
        position_player += speed;
        racer_computer.style.paddingLeft = (position_computer + "px");
        racer_player.style.paddingLeft = (position_player + "px");
      };
    };
  }

  race();
// Test function to check the key logging process

  function enableType() {
    var test_word = make_array(getWord());
    displayWord(test_word);
    var array_check = lowercase(test_word);
    var tracker = 0;
    var stop = 0;
    var check = function checker(event) {
      if (event.key === array_check[tracker]) {
        console.log("success");
        tracker += 1;
      }
      else {
        console.log("failure");
        document.removeEventListener('keydown', check);
        document.getElementById(tracker)
      };
      if (tracker == array_check.length){
        console.log("word complete");
        document.removeEventListener('keydown', check);
      }
      else {
      };
    };
    document.addEventListener('keydown', check);
  }

  if (position_computer && position_player < 1400) {
    enableType();
  }


});

// if (tracker < array_check.length || stop == 0) {
//   checker();
// }
// else if (stop == 1) {
// console.log("stop = 1");
// }
// else if (tracker == array_check.length) {
// console.log("success complete");
// }
// else {
//   console.log("wrong");
// };
