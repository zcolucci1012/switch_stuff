var invalid_id = ["72", "73", "74", "75", "33", "34", "35"];
var proceed = true;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var characters = JSON.parse(this.responseText);
    var character;
    while (proceed) {
      character = characters[Math.floor(Math.random() * characters.length)];
      proceed = false;
      for (var i=0; i<invalid_id.length; i++){
        console.log(invalid_id[i]);
        if (invalid_id[i] == character.id){
          proceed = true;
          break;
        }
      }
    }
    var id = document.getElementById("id");
    id.innerHTML = character.id;
    var name = document.getElementById("name");
    name.innerHTML = character.name;
    var picture = document.getElementById("picture")
    picture.setAttribute("src", character.img)
  }
};

function generate(){
  proceed = true;
  xmlhttp.open("GET", "characters.json", true);
  xmlhttp.send();
}

var timer = window.setInterval(function(){
  checkInputs()
}, 1);


function checkInputs(){
  var echo_fighters = document.getElementById("echo_fighters")
  var pokemon_trainer = document.getElementById("pokemon_trainer")

  invalid_id = ["72", "73", "74", "75"]

  if (!echo_fighters.checked){
    var echoes = ["4e", "13e", "21e", "25e", "28e", "60e", "66e"]
    for (var i=0; i<echoes.length; i++){
      invalid_id.push(echoes[i]);
    }
  }
  if (pokemon_trainer.checked){
    invalid_id.push("33-35")
  }
  else {
    var pokemon = ["33", "34", "35"]
    for (var i=0; i<pokemon_trainer.length; i++){
      invalid_id.push(pokemon[i]);
    }
  }
}
