document.addEventListener('DOMContentLoaded', function(event) {

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
      names.push(array_of_objects[i]['name'])
      scores.push(array_of_objects[i]['scores'])
    };
    localStorage.setItem("names", JSON.stringify(names));
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  function writeScoresToPage(array_of_objects) {
    for (var i = 0; i < 5; i++) {
      document.getElementById(String(i)).innerHTML = array_of_objects[i]['name'];
    };
    for (var i = 5; i < 10; i++) {
      document.getElementById(String(i)).innerHTML = array_of_objects[i-5]['scores'];
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
    return array_of_objects
  }

  function updateHighscores() {
    var current_highscores = extractFromLocalstorage();
    var new_score = (Math.round(record_time*10)/10);
    if (new_score <= current_highscores[4]['score']) {
      var player_name = prompt("Highscore! Enter your name: ");
      current_highscores[4]['name'] = player_name
      current_highscores[4]['score'] = new_score
      bubbleSort(current_highscores);
      writeToLocalstorage(current_highscores);
      writeScoresToPage(current_highscores);
    };
  }

  updateHighscores();

});
