const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    // Set the Content-Type header for all responses
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const url = req.url;
    if (url === "/") {
        fs.readFile("head.html", function (err, pgres) {
            if (err) {
                // Send a 404 response if head.html is not found
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("HEAD.HTML NOT FOUND");
            } else {
                // Send the content of head.html if found
                res.write(pgres);
                res.end();
            }
        });
    } else if (url === "/tailPage") {
        fs.readFile("tail.html", function (err, pgres) {
            if (err) {
                // Send a 404 response if tail.html is not found
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("TAIL.HTML NOT FOUND");
            } else {
                // Send the content of tail.html if found
                res.write(pgres);
                res.end();
            }
        });
    } else {
        // Send a 404 response for all other URLs
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("404 Not Found");
    }
}).listen(process.env.PORT || 3000, function () {
    console.log("SERVER STARTED PORT: 3000");
});
