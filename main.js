var container = document.getElementById("container");

generateSketch(16);

var button = document.getElementById("createGrid");
var size = document.getElementById("size");
var squares = 16;
var fadeTime = 2000;
var timeouts={};
$("#changeFade").click(function(){
  var f = prompt("Current time to fade: "+fadeTime+" miliseconds\n\nNew fade time in miliseconds: ");
  if(f != null){
    if(!isNaN(f)){
      if(f < 0){
        f = 0;
      }
      fadeTime = f;
    }
  }
});

button.addEventListener("click", function(){
  var value = prompt("Current: "+squares+"\nHow many squares per side?");

  if(value != null){
    if(!isNaN(value)){
      squares = value;
      value = Math.floor(+value);
      container.innerHTML = "";
      generateSketch(value);
    }
  }
});

function generateSketch(value){
  var sqSize = 960.0/value + "px";
  var lineDiv = document.createElement("DIV");
  var div = document.createElement("DIV");
  lineDiv.className = "line";
  lineDiv.style.maxHeight = sqSize;
  div.className = "sketch";
  div.style.width = sqSize;
  div.style.height = sqSize;
  for (var i = 0; i < value; i++) {
      var current = div.cloneNode(true);
      lineDiv.appendChild(current);
  }
  for(var i = 0; i < value ; i++){
    var line = lineDiv.cloneNode(true);
    for (var j = 0; j < value; j++) {
        line.children[j].id = ((i * value) + j);
      }
    container.appendChild(line);
  }
  $('.sketch').mouseenter(function(event){
    var sketch = event.target;
    timeoutObserver(sketch);
    change_color(sketch);
  });
  $('.sketch').mouseleave(function(event){
    var sketch = event.target;
    timeouts[sketch.id] = setTimeout(function(){
      sketch.style.backgroundColor = "white";
    }, fadeTime);

  });
  $(".sketch").click(function(event){
    var sketch = event.target;
    change_color(sketch);
  });
}

function change_color(target){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();
  h += golden_ratio_conjugate;
  h %= 1;
  var colors = hsv_to_rgb(h, 0.5, 0.95);
  target.style.backgroundColor = "rgb("+
    colors['r']+', '+
    colors['g']+', '+
    colors['b']+")";
}

function timeoutObserver(target){
  if(!(typeof timeouts[target.id] === "undefined"))
  {
    clearTimeout(timeouts[target.id]);
  }
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
