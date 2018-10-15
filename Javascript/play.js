document.addEventListener('DOMContentLoaded', function(event) {

  var words = ["Alfa","Bravo","Charlie","Delta","Echo"];

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

  moveComputer();
});
