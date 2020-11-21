"use strict";

var express = require('express');

var mongoose = require('mongoose');

var app = express();

var ShortUrl = require('./models/shortUrl');

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}));
app.get('/', function _callee(req, res) {
  var shortUrls;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ShortUrl.find());

        case 2:
          shortUrls = _context.sent;
          res.render('index', {
            shortUrls: shortUrls
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/shortUrl', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ShortUrl.create({
            full: req.body.fullUrl
          }));

        case 2:
          res.redirect('/');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get('/:shortUrl', function _callee3(req, res) {
  var shortUrl;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(ShortUrl.findOne({
            "short": req.params.shortUrl
          }));

        case 2:
          shortUrl = _context3.sent;

          if (!(shortUrl == null)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.sendStatus(404));

        case 5:
          shortUrl.clicks++;
          shortUrl.save();
          res.redirect(shortUrl.full);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.listen(process.env.PORT || 8080);