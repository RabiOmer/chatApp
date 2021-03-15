const WebSocket = require('ws');
const RoomController = require('../room/room_controller');
class SocketConnection {

  constructor() {
    this.WSS = null;
  }
  // setup web socket server
  openNewWebSocketServer(server) {
    this.WSS = new WebSocket.Server({
      server: server
    });
    this.activeConnectionListeners();
  }

  // set event when user open connection
  activeConnectionListeners() {
    this.WSS.on('connection', async (ws, req) => {
      this.activeMessageListeners(ws);
      this.activeCloseListeners(ws);
    });
  }
  // close event handler
  activeCloseListeners(userWs) {
    userWs.on('close', () => {
      console.log("disConnected : ");
      RoomController.removeUserFromRoom(userWs);
      return;
    });
  }
  // message event handler
  activeMessageListeners(userWs) {
    userWs.on('message', (message) => {
        let data = JSON.parse(message);
        this.manageActions(userWs, data);
    });
  }
  // manage user action
  manageActions(ws, data) {
    console.log('manageActions : ', data)
    if (data.action) {
      switch (data.action) {
        case 'setUser':
          ws.userInfo = {
            ...data.user
          }
          if(ws && ws.readyState && ws.readyState.OPEN == 1) console.log('WS IS OPEN')
          ws.send(JSON.stringify({action:'SetUserIsComplete'}))
          break;
        case 'join':
          RoomController.setUserInRoom(ws)
          break;
        case 'message':
          RoomController.setMessage(ws, data)
          break;

        default:
          break;
      }
    }
  }
}
module.exports = SocketConnection;