const express = require('express'); //Practice using require instead of module
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const today = newDate(); //Will be updated later for dynamic date inside footer

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files through public 
app.use(express.static(path.join(__dirname, 'public')));

// Home page route: list chapters
app.get('/', (req, res) => {
  const chaptersDir = path.join(__dirname, 'chapters');
  fs.readdir(chaptersDir, (err, files) => {
    if (err) return res.send('Error reading chapters folder.');
    // Sorting chapter files
    files.sort((a, b) => parseInt(a) - parseInt(b));
    res.render('pages/index', { chapters: files });
  });
});

// Chapter page route
app.get('/chapter/:num', (req, res) => {
  const chapterNum = req.params.num;
  const chapterPath = path.join(__dirname, 'chapters', `${chapterNum}.txt`);

  fs.readFile(chapterPath, 'utf8', (err, data) => {
    if (err) return res.send('Chapter not found.');
    res.render('pages/chapter', { chapterNum, content: data });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));