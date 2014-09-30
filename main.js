var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(main).listen(8080);

function html(name)
{
    var content = fs.readFileSync("templates/".concat(name).concat(".html"), "utf-8");
    return content;
}

function index(request, response)
{
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<p>Welcome</p>");
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
