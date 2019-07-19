var invalid_id = ["72", "73", "74", "75", "33", "34", "35"];
var invisible_id = ["72", "73", "74", "75"]
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
  var all_unchecked = true;
  var advanced_settings = document.getElementById("advanced_settings")
  if (advanced_settings.children.length > 0){
    for (var i=0;i<advanced_settings.children.length; i++){
      if (advanced_settings.children[i].children[1].checked){
        all_unchecked = false;
      }
    }
  }
  else {
    all_unchecked = false;
  }
  if (!all_unchecked){
    proceed = true;
    xmlhttp.open("GET", "characters.json", true);
    xmlhttp.send();
  }
  else {
    alert("At Least 1 (One) Box Must Be Checked")
  }
}

var timer = window.setInterval(function(){
  checkInputs()
}, 10);


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

  if (advanced_settings.children.length > 0){
    for (var i=0;i<advanced_settings.children.length; i++){
      if (!advanced_settings.children[i].children[1].checked){
        invalid_id.push(advanced_settings.children[i].children[1].id);
      }
    }
  }
}

var showAdvancedSettings = false;
function toggleAdvancedSettings(){
  var advanced_settings = document.getElementById("advanced_settings")
  var advanced_settings_div = document.getElementById("advanced_settings_div")

  if (showAdvancedSettings){
    while (advanced_settings.firstChild) {
      advanced_settings.removeChild(advanced_settings.firstChild);
    }
    advanced_settings_div.setAttribute("style", "display: none")
  }

  if (!showAdvancedSettings){
    for (var i=0; i<characters.length; i++){
      var found = false;
      for (var j=0; j<invisible_id.length; j++){
        if (invisible_id[j] == characters[i].id){
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
        checkbox.setAttribute("checked", "true")
        option.appendChild(label)
        option.appendChild(checkbox)
        advanced_settings.appendChild(option)
      }
    }
    advanced_settings_div.setAttribute("style", "display: block")
  }

  toggleDisabled()

  showAdvancedSettings = !showAdvancedSettings
}

function toggleDisabled(){
  var advanced_settings = document.getElementById("advanced_settings")
  if (advanced_settings.children.length > 0){
    if (!echo_fighters.checked){
      var echoes = ["4e", "13e", "21e", "25e", "28e", "60e", "66e"]
      for (var i=0; i<echoes.length; i++){
        var checkbox = document.getElementById(echoes[i]);
        checkbox.checked = false;
        checkbox.disabled = true;
      }
    }
    else {
      var echoes = ["4e", "13e", "21e", "25e", "28e", "60e", "66e"]
      for (var i=0; i<echoes.length; i++){
        var checkbox = document.getElementById(echoes[i]);
        checkbox.disabled = false;
      }
    }
    if (pokemon_trainer.checked){
      document.getElementById("33-35").checked = false;
      document.getElementById("33-35").disabled = true;
      var pokemon = ["33", "34", "35"]
      for (var i=0; i<pokemon.length; i++){
        var checkbox = document.getElementById(pokemon[i]);
        checkbox.disabled = false;
      }
    }
    else {
      var pokemon = ["33", "34", "35"]
      for (var i=0; i<pokemon.length; i++){
        var checkbox = document.getElementById(pokemon[i]);
        checkbox.checked = false;
        checkbox.disabled = true;
      }
      document.getElementById("33-35").disabled = false;
    }
  }
}

function checkAll(){
  for (var i=0;i<advanced_settings.children.length; i++){
    advanced_settings.children[i].children[1].checked = true;
  }
  toggleDisabled()
}

function uncheckAll(){
  for (var i=0;i<advanced_settings.children.length; i++){
    advanced_settings.children[i].children[1].checked = false;
  }
  toggleDisabled()
}

function n64(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        var is64 = false;
        for (var k=0; k<characters[j].series.length; k++){
          if (characters[j].series[k] == "64"){
            is64 = true;
          }
        }
        if (is64){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = false;

  toggleDisabled();
}

function melee(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        var isMelee = false;
        for (var k=0; k<characters[j].series.length; k++){
          if (characters[j].series[k] == "Melee"){
            isMelee = true;
          }
        }
        if (isMelee){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = false;

  toggleDisabled();
}

function brawl(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        var isBrawl = false;
        for (var k=0; k<characters[j].series.length; k++){
          if (characters[j].series[k] == "Brawl"){
            isBrawl = true;
          }
        }
        if (isBrawl){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = false;

  toggleDisabled();
}

function smash4(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        var isSmash4 = false;
        for (var k=0; k<characters[j].series.length; k++){
          if (characters[j].series[k] == "Smash 4"){
            isSmash4 = true;
          }
        }
        if (isSmash4){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = true;

  toggleDisabled();
}

function meleeNew(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        if (characters[j].series[0] == "Melee"){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = false;

  toggleDisabled();
}

function brawlNew(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        if (characters[j].series[0] == "Brawl"){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = false;

  toggleDisabled();
}

function smash4New(){
  for (var i=0;i<advanced_settings.children.length; i++){
    for (var j=0; j<characters.length; j++){
      if (characters[j].id == advanced_settings.children[i].children[1].id){
        if (characters[j].series[0] == "Smash 4"){
          advanced_settings.children[i].children[1].checked = true;
        }
        else {
          advanced_settings.children[i].children[1].checked = false;
        }
      }
    }
  }

  document.getElementById("echo_fighters").checked = true;
  document.getElementById("pokemon_trainer").checked = true;

  toggleDisabled();
}
