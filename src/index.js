const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const sassMiddleware = require('node-sass-middleware');

const AppLowDatabase = require('./server/database/app-lowdatabase');
const db = new AppLowDatabase();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'server', 'views'));

// APIs
const pickRandomWord = words => {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
};

const pickUniqueWord = (words, last) => {
  let word;
  do {
    word = pickRandomWord(words);
  } while (word.word.toUpperCase() === last.toUpperCase());
  return word;
};

app.get(['/', '/home'], (req, res) => res.render('home'));

app.get('/vocab', (req, res) => {
  const words = db.getWords();
  res.render('vocabulary', { words });
});

app.get('/edit', (req, res) => {
  const id = req.query.id;
  const word = db.getWordById(id);
  console.log(`Editing ${JSON.stringify(word)}`);
  const categories = ['cat 1', 'cat 2'];
  res.render('edit', { word, categories });
});

app.post('/edit', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log('fields', fields);
    // console.log("files", files);
    res.send('done');
  });
});

app.get('/nextword', (req, res) => {
  const words = db.getWords();
  const prevWord = req.query['prev'];
  console.log(prevWord);
  let word;
  if (prevWord === undefined) word = pickRandomWord(words);
  else word = pickUniqueWord(words, prevWord);
  res.json(word);
});

// Setup server

app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public', 'style'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/style' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    // Needs to know what is in front of the filename to strip it out?
  })
);

app.use(express.static(__dirname + '/../public'));
app.use(
  '/bootstrap/',
  express.static(__dirname + '/../node_modules/bootstrap/dist/js')
);
app.use('/jquery/', express.static(__dirname + '/../node_modules/jquery/dist'));

app.listen(port, () =>
  console.log(`Server running on port ${port}`, `directory: ${__dirname}`)
);

// https://chanind.github.io/hanzi-writer/docs.html
// Restart nodemon by typing 'rs'
// express routing
// add ignore files in package.json
// nodemon looks into package.json for a default entry point

// integrate hanziwriter into page
// bootstrap? css flexbox
// cms for managing words
