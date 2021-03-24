"use strick"
const http = require('http');
const SocketConnection = require('../webSocket/webSocket_controller');
const fs = require('fs');

class Server {

  constructor(){
    this.hostname = process.env.SERVER_HOST_NAME || null;
    this.port = process.env.SERVER_PORT || null;
  }

  loadServer() {
    if (!this.hostname || !this.port) throw 'missing env settings';

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      let url = req.url;
      if (url == '/chat') {
        fs.readFile('./client/index.html', function (error, content) {
          if (error) {
            res.writeHead(500);
            res.end('Error');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.end(content, 'utf-8');
          }
        });
      } else if (url.includes('scripts') || url.includes('css')) {
        fs.readFile(`./client${url}`, function (error, content) {
          let mimeTypes = url.includes('css') ? 'text/css' : 'text/javascript';
          if (error) {
            res.writeHead(500);
            res.end('Error');
          } else {
            res.writeHead(200, {
              'Content-Type': mimeTypes
            });
            res.end(content, 'utf-8');
          }
        });
      }
    });


    let httpServer = server.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}:${this.port}/`);
    });
    const Socket = new SocketConnection();
    Socket.openNewWebSocketServer(server);
  }
}


module.exports = {
  Server,
}