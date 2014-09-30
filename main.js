var http = require("http");
var url = require("url");
var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("joke.sqlite3");

db.run("CREATE TABLE IF NOT EXISTS joke (Title, Content)");

http.createServer(main).listen(8080);

function html(name, content)
{
    var content = fs.readFileSync("templates/" + name + ".html", "utf-8");
    return content;
}

function index(request, response)
{
    var body = "";
    body = body + 
    "<!DOCTYPE HTML>\
    <html>\
    <head><h1>Welcome to my blog</h1></head>\
    <body>";
    db.all("SELECT * from joke", function(err, data){
        data.forEach(function (datum){
            body = body + "<h3>" + datum.Title + "</h3>\n<p>" + datum.Content + "</p>\n";
            });
        body = body + "</html>";
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write(body);
        response.end();
    });
    
}

function error(request, response)
{
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write(html("error"));
    response.end();
}

function admin(request, response)
{
    query = url.parse(request.url, true).query;
    if(query.Submit = "Submit")
    {
        title = query.Title;
        content = query.Content;
        if(title != undefined)
            db.run("INSERT INTO joke VALUES (\"" + title + "\",\"" + content + "\")");
        
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html("admin"));
    response.end();
}

function main(request, response)
{
    pathname = url.parse(request.url).pathname;
    if(pathname == "/") index(request, response);
    else if(pathname == "/admin") admin(request, response);
    else error(request, response);
}
