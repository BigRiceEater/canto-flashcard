"use strict";

function nextWord() {
  var word = document.getElementById("TryThisWord");
  var pronounce = document.getElementById("WordPronounce");
  var image = document.getElementById("WordImage"); //- fetch('/nextword')
  //-   .then( r => r.json())
  //-   .then( d => {word.innerHTML = d.word; pronounce.innerHTML = d.pronounce})

  fetch("/nextword?prev=" + word.innerHTML).then(function (response) {
    return response.json().then(function (d) {
      word.innerHTML = d.word.toUpperCase();
      pronounce.innerHTML = d.pronounce;
      image.src = d.image ? d.image : "";
    });
  });
}