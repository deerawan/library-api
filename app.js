var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/libraryAPI');
var Book = require('./models/bookModel');


var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    var query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) { res.status(500).send(err); }
      res.json(books);
    });
  });
bookRouter.route('/books/:id')
  .get((req, res) => {
    Book.findById(req.params.id, (err, books) => {
      if (err) { res.status(500).send(err); }
      res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log('Gulp is running on port ' + port);
});