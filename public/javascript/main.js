var container = $(".sub-container")[0];

generateSketch(16);
var interval;

var squares = document.getElementById("createGrid");
var size = document.getElementById("size");
var numSquares = 16;
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

squares.addEventListener("click", function(){
  var value = prompt("Current: " + numSquares);

  if(value != null){
    if(!isNaN(value)){
      numSquares = value;
      value = Math.floor(+value);
      container.innerHTML = "";
      generateSketch(value);
    }
  }
});

function generateSketch(value){
  var lineDiv = document.createElement("DIV");
  var div = document.createElement("DIV");
  lineDiv.className = "line";
  div.className = "small-squares";
  for (var i = 0; i < value; i++) {
      var current = div.cloneNode(true);
      lineDiv.appendChild(current);
  }
  for(var i = 0; i < value ; i++){
    var line = lineDiv.cloneNode(true);
    for(var j = 0; j < value; j++){
      line.children[j].id = ((i * value) + j);
    }
    container.appendChild(line);
  }
  $('.small-squares').mouseenter(function(event){
    var square = event.target;
    checkTimeout(square);
    changeColor(square);
  });
  $('.small-squares').mouseleave(function(event){
    var square = event.target;
    makeTimeout(square)
  });
  $(".small-squares").mousedown(function(event){
    var square = event.target;
    var squareId = square.id;
    interval = setInterval(function(){
      for(var i = 0; i < ~~(numSquares / 10) + 1; i++){
        var otherSquareId =  ~~(parseInt(squareId) + Math.random() * (numSquares ** 3 / 3) - numSquares ** 3 / 4);
        if(otherSquareId > 0 && otherSquareId < numSquares ** 2){
          var otherSquare = document.getElementById(otherSquareId)
          changeColor(otherSquare)
          checkTimeout(otherSquare)
          makeTimeout(otherSquare)
        }
        else{
          i--;
        }
      }
    }, 50);

  });
  $(".small-squares").mouseup(function(){
    clearInterval(interval);
  })
}

function makeTimeout(square){
  timeouts[square.id] = setTimeout(function(){
      square.style.backgroundColor = "white";
    }, fadeTime);
}

function changeColor(target){
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

function checkTimeout(target){
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
