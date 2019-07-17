var invalid_id = ["74", "75"];
var continue = true;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var characters = JSON.parse(this.responseText);
    var character;
    if (continue) {
      character = characters[Math.floor(Math.random() * characters.length)];
      continue = false;
      for (var i=0; i<invalid.length; i++){
        if (invalid[i] == character.id){
          continue = true;
          break;
        }
      }
    }
    alert(character.id + character.name);
  }
};
xmlhttp.open("GET", "characters.json", true);
xmlhttp.send();
