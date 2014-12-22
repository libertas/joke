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
      body = body + "<h3>" + datum.Title + "</h3>\n<p>" + datum.Content + "</p>\n";
    });
    res.render('index', { title: 'My Blog', content: body});
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
