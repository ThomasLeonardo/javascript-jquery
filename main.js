var container = document.getElementById("container");

generateSketch(16);

var button = document.getElementById("createGrid");
var size = document.getElementById("size");

button.addEventListener("click", function(){
  var value = prompt("How many squares per side?");
  if(value != null){
    if(!isNaN(value)){
      value = +value;
      container.innerHTML = "";
      generateSketch(value);
    }
  }
});

function generateSketch(value){
  var sqSize = 960/value+"px";
  var lineDiv = document.createElement("DIV");
  var div = document.createElement("DIV");
  div.className = "sketch";
  div.style.width = sqSize;
  div.style.height = sqSize;
  for (var i = 0; i < value; i++) {
      var current = div.cloneNode(true);
      lineDiv.appendChild(current);
  }
  for(var i = 0; i < value ; i++){
    container.appendChild(lineDiv.cloneNode(true));
    container.appendChild(document.createElement("br"));
  }
  $('.sketch').mouseenter(function(event){
    var sketch = event.target;
    var golden_ratio_conjugate = 0.618033988749895;
    var h = Math.random();
    h += golden_ratio_conjugate;
    h %= 1;
    var colors = hsv_to_rgb(h, 0.5, 0.95);
    sketch.style.backgroundColor = "rgb("+
    colors['r']+', '+
    colors['g']+', '+
    colors['b']+")";
  });
  $('.sketch').mouseleave(function(event){
    var sketch = event.target;
    setTimeout(function(){
      sketch.style.backgroundColor = "white";
    }, 2000);
  });
}

function hsv_to_rgb(h, s, v){
  var h_i = Math.floor((h*6));
  var f = h*6 - h_i;
  var p = v * (1 - s);
  var q = v * (1 - f*s);
  var t = v * (1 - (1 - f) * s)

  var r, g , b;
  if (h_i==0){
    r = v;
    g = t;
    b = p;
  }
  else if (h_i==1){
    r = q;
    g = v;
    b = p;
  }

  else if (h_i==2){
    r = p;
    g = v;
    b = t;
  }
  else if (h_i==3){
    r = p;
    g = q;
    b = v;
  }
  else if (h_i==4){
    r = t;
    g = p;
    b = v;
  }
  else if (h_i==5){
    r = v;
    g = p;
    b = q;
  }
  var colors = {"r":Math.floor(r*256),
                "g":Math.floor(g*256),
                "b":Math.floor(b*256)};
  return colors;
}

