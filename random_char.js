var invalid_id = ["74", "75"];
var proceed = true;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var characters = JSON.parse(this.responseText);
    var character;
    if (proceed) {
      character = characters[Math.floor(Math.random() * characters.length)];
      proceed = false;
      for (var i=0; i<invalid_id.length; i++){
        if (invalid_id[i] == character.id){
          proceed = true;
          break;
        }
      }
    }
    alert(character.id + character.name);
  }
};
xmlhttp.open("GET", "characters.json", true);
xmlhttp.send();
