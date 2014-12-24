var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("joke.sqlite3");
db.run("CREATE TABLE IF NOT EXISTS joke (Title, Content)");

/* GET home page. */
router.get('/', function(req, res) {
  body = '<p>These are my passages:</p>';
  db.all('SELECT * FROM joke', function(err, data) {
    data.forEach(function (datum) {
      body = body + '<a href="/p/' + datum.Title + '"><h3>' + datum.Title + '</h3></a>\n<p>' + datum.Content.replace('\n', '<br />') + '</p>\n';
    });
    res.render('index', { title: 'My Blog', content: body});
  });
});

router.param('title', function(req, res, next, title) {
    req.title = title;
    next();  
});

router.get('/p/:title', function(req, res) {
  body = '<p>These are my passages:</p>';
  expression = 'Title = \'' + req.title + '\''
  db.get('SELECT Content FROM joke WHERE ' + expression, function(err, row) {
    if (row == undefined) {
	  res.status(500);
      res.render('error', {message: 'Not Found',error: {status: 500, stack: 'No Such A Passage'}});
    }
    else {
      body = row.Content;
      res.render('passage', { title: req.title, content: body.replace('\n', '<br />')});
    }
  });
});

router.get('/admin', function(req, res) {
  query = req.query;
  if (query.Submit == 'Submit'){
	title = query.Title;
	content = query.Content;
	db.run("INSERT INTO joke VALUES (\"" + title + "\",\"" + content + "\")");
  }
  res.sendfile('./views/admin.html');
});

module.exports = router;
