var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var characters = JSON.parse(this.responseText);
    alert(characters[0]);
    //document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "characters.json", true);
xmlhttp.send();
