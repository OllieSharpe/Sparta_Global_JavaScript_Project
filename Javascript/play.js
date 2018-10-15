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

// Function which takes the letters array and appends
  function displayWord(array) {
    for (var i = 0; i < array.length; i++) {
      var element = document.createElement("span");
      element.innerHTML = array[i];
      element.id = i;
      document.getElementById("word-display").appendChild(element);
    }
  }

  function lowercase(array) {
    var check_array = [];
    for (var i = 0; i < array.length; i++) {
      check_array.push(array[i].toLowerCase());
    };
    return check_array;
  }

  function moveComputer() {
    var racer = document.getElementById('computer-racer');
    var pos = 25;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos >= 1400) {
        clearInterval(id);
      }
      else {
        pos += 1;
        racer.style.paddingLeft = (pos + "px");
      }
    }
  }

  function test() {
    test_word = make_array(getWord());
    displayWord(test_word);
    array_check = lowercase(test_word);
    document.addEventListener('keydown', function(event) {
      if (event.key === array_check[0]) {
        console.log("success");
      }
      else {
        console.log("failure");
      }
    });
  };

  test();

  moveComputer();
});
