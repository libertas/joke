var http = require("http");
var url = require("url");
var fs = require("fs");
var db = {}

http.createServer(main).listen(8080);

function html(name, content)
{
    var content = fs.readFileSync("templates/".concat(name).concat(".html"), "utf-8");
    return content;
}

function index(request, response)
{
    var body = "";
    body = body.concat(
    "<!DOCTYPE HTML>\
    <html>\
    <head><h1>Welcome to my blog</h1></head>\
    <body>");
    for(i in db)
    {
        if(i != undefined)
            body = body.concat("<h3>").concat(i).concat("</h3>\n<p>").concat(db[i]).concat("</p>\n");
    }
    body = body.concat("</html>");
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write(body);
    response.end();
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
        content = query.Content
        db[title] = content
        
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
