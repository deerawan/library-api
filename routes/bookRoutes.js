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

  bookRouter.use('/:id', (req, res, next) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });
  bookRouter.route('/:id')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save(function(err) {
        if (err) { res.status(500).send(err); }
        res.json(req.book);
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var field in req.body) {
        req.book[field] = req.body[field];
      }
      req.book.save(function(err) {
        if (err) { res.status(500).send(err); }
        res.json(req.book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) { res.status(500).send(err); }
        res.status(204).send('book is deleted');
      });
    });

  return bookRouter;
}

module.exports = routes;