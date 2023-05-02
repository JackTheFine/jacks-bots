var app = require('http').createServer(createServer);
var fs = require('fs'); 
var url = require('url');
require("./mybot/index.js")
function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) {
        if(error) throw error;
        res.writeHead(200);
        res.write(data);
        res.end();
    }

    switch(path) {
        case '/Github.html':
            doc = fs.readFile(__dirname + '/public/Github.html', fsCallback);
        break;
        case '/Links.html':
            doc = fs.readFile(__dirname + '/public/Links.html', fsCallback);
        break;
        case '/Projects.html':
            doc = fs.readFile(__dirname + '/public/Projects.html', fsCallback);
        break;
        case '/index.html':
            doc = fs.readFile(__dirname + '/public/index.html', fsCallback);
        break;
        case '/Contact.html':
            doc = fs.readFile(__dirname + '/public/Contact.html', fsCallback);
        break;
        case '/About.html':
            doc = fs.readFile(__dirname + '/public/About.html', fsCallback);
        break;
        default:
            doc = fs.readFile(__dirname + '/public/index.html', fsCallback);
        break;
    }
}
try {
  app.listen(8080);
  console.log("Ready! (logged into JackTheFine.dev)")
} catch (error) {
  console.log("ERROR WITH SITE OPEN")
}