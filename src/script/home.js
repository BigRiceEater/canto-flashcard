function nextWord() {
  const word = document.getElementById('TryThisWord');
  const pronounce = document.getElementById('WordPronounce');
  const image = document.getElementById('WordImage');

  //- fetch('/nextword')
  //-   .then( r => r.json())
  //-   .then( d => {word.innerHTML = d.word; pronounce.innerHTML = d.pronounce})

  fetch('/nextword?prev=' + word.innerHTML).then(response =>
    response.json().then(d => {
      word.innerHTML = d.word.toUpperCase();
      pronounce.innerHTML = d.pronounce;
      // @ts-ignore : HTMLImageElement
      image.src = d.image ? d.image : '';
    })
  );
}
