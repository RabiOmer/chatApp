const http = require('http');
const SocketConnection = require('../webSocket/webSocket_controller')

class Server {

    hostname = process.env.SERVER_HOST_NAME || null;
    port = process.env.SERVER_PORT || null;

    loadServer(){
        if(!this.hostname || !this.port) throw 'missing env settings';

        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
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
