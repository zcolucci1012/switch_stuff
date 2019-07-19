var invalid_id = ["72", "73", "74", "75", "33", "34", "35"];
var proceed = true;
var characters;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    characters = JSON.parse(this.responseText);
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
    for (var i=0; i<pokemon.length; i++){
      invalid_id.push(pokemon[i]);
    }
  }

  var advanced_settings = document.getElementById("advanced_settings")

  if (advanced_settings.hasChildNodes()){
    for (var i=0;i<advanced_settings.children.length; i++){
      console.log(advanced_settings.children.length)
      if (!advanced_settings.children[i].children[1].checked){
        invalid_id.push(advanced_settings.children[i].children[1].id);
      }
    }
  }
}

var showAdvancedSettings = false;
function toggleAdvancedSettings(){
  var advanced_settings = document.getElementById("advanced_settings")

  if (showAdvancedSettings){
    while (advanced_settings.firstChild) {
      advanced_settings.removeChild(advanced_settings.firstChild);
    }
    advanced_settings.setAttribute("style", "display: none")
  }

  if (!showAdvancedSettings){
    for (var i=0; i<characters.length; i++){
      var found = false;
      for (var j=0; j<invalid_id.length; j++){
        if (invalid_id[j] == characters[i].id){
          found = true;
        }
      }
      if (!found){
        var option = document.createElement("div")
        var label = document.createElement("label")
        var checkbox = document.createElement("input")
        option.setAttribute("class", "option")
        label.innerHTML = characters[i].name
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", characters[i].id)
        option.appendChild(label)
        option.appendChild(checkbox)
        advanced_settings.appendChild(option)
      }
    }
    advanced_settings.setAttribute("style", "display: block")
  }

  showAdvancedSettings = !showAdvancedSettings
}
