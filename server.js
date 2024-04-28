const http = require('http');
const fs = require('fs').promises;

const listener = function(req, res) {
  if (req.url === '/') {
    fs.readFile(__dirname + "/index.html")
      .then(data => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      })
      .catch(err => {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      })
  } else if (req.url === '/app.js') {
    fs.readFile(__dirname + "/app.js")
      .then(data => {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(data);
      })
      .catch(err => {
        res.writeHead(500);
        res.end('Error loading app.js');
        return;
      })
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

const port = 3000;
const server = http.createServer(listener);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

