var should = require('should');
var sinon = require('sinon');

describe('Book Controller Test', () => {
  describe('Post', () => {
    it('should not allow empty title', function() {
      var Book = function(book) { this.save = function(){} };
      var req = {
        body: {
          author: 'Jon'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});