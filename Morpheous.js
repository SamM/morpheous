/*
**  Morpheous.js
**  Created by: Sam Mulqueen
**  Created on: 23 January 2016
*/

var Morpheous = typeof Morpheous == "undefined" ? {} : Morpheous;

// Default data fields:

if(typeof Morpheous.location == "undefined")
{
  Morpheous.location = window.location.pathname;
}
if(typeof Morpheous.smoothness == "undefined")
{
  Morpheous.smoothness = 60;
}
if(typeof Morpheous.delay == "undefined")
{
  Morpheous.delay = 0;
}
if(typeof Morpheous.min_delay == "undefined")
{
  Morpheous.min_delay = 10; // 0.01 Seconds
}
if(typeof Morpheous.max_delay == "undefined")
{
  Morpheous.max_delay = 1000; // 1 Second
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
if(typeof Morpheous.data == "undefined")
{
  var search = window.location.search.substr(1);
  var params = search.split("&");
  var data = {};
  params.forEach(function(str){
    var parts = str.split("=");
    data[parts[0]] = parts[1];
  });
  Morpheous.data = data;
}

// Methods:

Morpheous.rev = function(data){
  var old_rev_time = Morpheous.rev_time;
  Morpheous.rev_time = (new Date()).getTime();

  if((new Date()).getTime() - old_rev_time > Morpheous.min_delay){
    Morpheous.request(data);
  }
}

Morpheous.idle = function(){
  if(Morpheous.timeout == null){
    Morpheous.delay = (new Date()).getTime() - Morpheous.rev_time;
    Morpheous.delay = Morpheous.delay / Morpheous.smoothness;
    Morpheous.delay = Math.min(Morpheous.max_delay, Morpheous.delay);
    Morpheous.delay = Math.max(Morpheous.min_delay, Morpheous.delay);
    Morpheous.timeout = setTimeout(Morpheous.request, Morpheous.delay);
  }
};

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

  Morpheous.idle();
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
      Morpheous.idle();
    }
  }
};

Morpheous.serialize = function(data){
  var str = [];
  for(var p in data){
    if (data.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
  }
  return str.join("&");
};

Morpheous.request = function(data){
  clearTimeout(Morpheous.timeout);
  Morpheous.timeout = null;

  if(Morpheous.stop) return;
  if(Morpheous.pause){
    Morpheous.idle();
    return;
  }
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    Morpheous.onResponse(ajax);
  };
  var params = Morpheous.serialize(typeof data == "object" ? data : Morpheous.data);
  var url = Morpheous.location;
  if(params.length){
    if(url.indexOf("?")>-1){
      url = url+"&"+params;
    }else{
      url = url+"?"+params;
    }
  }
  ajax.open(Morpheous.method, url, true);
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  ajax.send();
};

Morpheous.unpause = function(data){
  Morpheous.pause = false;
  Morpheous.rev();
  Morpheous.request(data);
}

Morpheous.clear = function(){
  Morpheous.current = "";
  Morpheous.loaded = "";
  Morpheous.timeout = null;
  Morpheous.rev_time = (new Date()).getTime();
}

Morpheous.start = function(e){
  Morpheous.clear();
  Morpheous.rev();
  Morpheous.request();
};

Morpheous.restart = function(data){
  Morpheous.stop = false;
  Morpheous.clear();
  Morpheous.rev();
  Morpheous.request(data);
}

// Attach onLoad event:

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
