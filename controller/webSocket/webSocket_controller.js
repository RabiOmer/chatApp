const WebSocket = require('ws');
const RoomController = require('../room/room_controller');
const UserController = require('../users/users_controller');
class SocketConnection {

  constructor() {
    this.WSS = null;
  }
  // setup web socket server
  openNewWebSocketServer(server) {
    this.WSS = new WebSocket.Server({
      server
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

  setNewUser(ws,data) {
    let user = UserController.setUser(data.name)
    user ? ws.send(JSON.stringify({
      action: 'newUser',
      user
    })) : ws.close();
    ws.userInfo = user
    ws.userInfo.rooms = [];
    this.joinChat(ws,data.chatID)
  }

  joinChat(ws,roomID = null) {
    let asRoom = false;
    if(roomID) asRoom = RoomController.findRoom(roomID);
     if(!asRoom) {
      roomID = RoomController.setNewRoom()
    }
    ws.userInfo.rooms.push(roomID);
    RoomController.setUserInRoom(ws, roomID,asRoom)
  }

  // manage user action
  manageActions(ws, data) {
    if (data.action) {
      switch (data.action) {
        case 'newUser':
          this.setNewUser(ws,data);
          break;
        case 'join':
          this.joinChat(ws);
          break;
        case 'message':
          if (ws.userInfo.rooms.includes(data.roomID)) RoomController.setMessage(ws, data)
          break;

        default:
          break;
      }
    }
  }
}
module.exports = SocketConnection;