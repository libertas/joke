var http = require("http");
var url = require("url");

http.createServer(main).listen(8080);

function index(request, response)
{
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<p>Welcome</p>");
    response.end();
}

function error(request, response)
{
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404:Page Not Found");
    response.end();
}

function main(request, response)
{
    pathname = url.parse(request.url).pathname;
    if(pathname == "/") index(request, response);
    else error(request, response);
}
