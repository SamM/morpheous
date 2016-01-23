/*
**  Morpheous.js
**  Created by: Sam Mulqueen
**  Created on: 23 January 2016
*/

if(typeof Morpheous == "undefined")
{
  var Morpheous = {};
}
if(typeof Morpheous.location == "undefined")
{
  Morpheous.location = window.location.href;
}
if(typeof Morpheous.delay == "undefined")
{
  Morpheous.delay = 1000; // One Second
}
if(typeof Morpheous.pause == "undefined")
{
  Morpheous.pause = false;
}
if(typeof Morpheous.stop == "undefined")
{
  Morpheous.stop = false;
}
if(typeof Morpheous.log == "undefined")
{
  Morpheous.log = false;
}
if(typeof Morpheous.method == "undefined")
{
  Morpheous.method = "POST";
}
if(typeof Morpheous.onUpdate == "undefined")
{
  Morpheous.onUpdate = function(doc){};
}

Morpheous.morph = function(){
  var loaded = document.implementation.createHTMLDocument("morpheous");
  loaded.documentElement.innerHTML = Morpheous.loaded;

  document.title = loaded.title;
  document.body.innerHTML = loaded.body.innerHTML;

  Morpheous.current = Morpheous.loaded;

  if(typeof Morpheous.onUpdate == "function"){
    Morpheous.onUpdate(loaded);
  }

  if(Morpheous.log){
    console.log("Morpheous document's state has changed");
  }

  setTimeout(Morpheous.request, Morpheous.delay);
};

Morpheous.onResponse = function(ajax){
  if (ajax.readyState == 4) {
    Morpheous.loaded = ajax.responseText;
    if(Morpheous.current == ""){
      Morpheous.current = Morpheous.loaded;
    }
    if(Morpheous.current != Morpheous.loaded){
      Morpheous.morph();
    }else{
      setTimeout(Morpheous.request, Morpheous.delay);
    }
  }
};

Morpheous.request = function(){
  if(Morpheous.stop) return;
  if(Morpheous.pause){
    setTimeout(Morpheous.request, Morpheous.delay);
    return;
  }
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    Morpheous.onResponse(ajax);
  };
  ajax.open(Morpheous.method, Morpheous.location, true);
  ajax.send();
};

Morpheous.start = function(e){
  Morpheous.current = "";
  Morpheous.loaded = "";
  Morpheous.request();
};

if(window.attachEvent) {
  window.attachEvent('onload', Morpheous.start);
} else {
  if(window.onload) {
    var previous_onload = window.onload;
    window.onload = function(e) {
      previous_onload(e);
      Morpheous.start(e);
    };
  } else {
    window.onload = Morpheous.start;
  }
}
