var express = require('express');

var routes = function(Book) {
  var bookRouter = express.Router();

  bookRouter.route('/')
    .post((req, res) => {
      var book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
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

  bookRouter.route('/:id')
    .get((req, res) => {
      Book.findById(req.params.id, (err, book) => {
        if (err) { res.status(500).send(err); }
        res.json(book);
      });
    })
    .put((req, res) => {
      Book.findById(req.params.id, (err, book) => {
        if (err) { res.status(500).send(err); }
        console.log(req.body);
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save();
        res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;