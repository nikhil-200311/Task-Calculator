var http = require('http'); 
var fs = require('fs'); // to get data from HTML file 

http.createServer(function (req, res) { 
    res.writeHead(200, { 'Content-Type': 'text/html' }); 

    var url = req.url; 
    if (url === "/") { 
        fs.readFile("head.html", function (err, pgres) { 
            if (err) 
                res.write("HEAD.HTML NOT FOUND"); 
            else { 
                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                res.write(pgres); 
                res.end(); 
            } 
        }); 
    } 
    else if (url === "/tailPage") { 
        fs.readFile("tail.html", function (err, pgres) { 
            if (err) 
                res.write("TAIL.HTML NOT FOUND"); 
            else { 
                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                res.write(pgres); 
                res.end(); 
            } 
        }); 
    } 
}).listen(process.env.PORT || 3000, function () { 
    console.log("SERVER STARTED PORT: 3000"); 
});
