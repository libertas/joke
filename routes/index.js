var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("joke.sqlite3");
db.run("CREATE TABLE IF NOT EXISTS joke (Title, Content)");

/* GET home page. */
router.get('/', function(req, res) {
  body = 'These are my passages:';
  db.all("SELECT * from joke", function(err, data){
    data.forEach(function (datum){
    body = body + datum.Title + '\n\n' + datum.Content + '\n';
    });});
  res.render('index', { title: 'My Blog', content: body});
});

router.get('/admin', function(req, res){
  res.render('admin', { });
});

module.exports = router;
