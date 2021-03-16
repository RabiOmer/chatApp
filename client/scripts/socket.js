class Socket {

    constructor(){
      this.url = "ws://127.0.0.1:3000"
    }

    openConnection(roomID) {
      this.socket = new WebSocket(this.url);
      console.log('open Connection')
      this.socket.onopen = () => this.open();
    }

    open() {
      console.log("WebSocket is open now.");
      this.socket.onclose = () => this.error();
      this.socket.onerror = (event) => this.close(event);
      this.socket.onmessage = (message) => this.message(message);
      this.send({action:'newUser',name:'omerrabi'})
    }

    close() {
      console.log("WebSocket is close now.");
    }

    message(message) {
      if (message.data) {
        let data = JSON.parse(message.data);
        if (data.action) this.manageAction(data);
    }
    }

    error(event) {
      console.log("WebSocket is error now. ",event);
    }

    send(message) {
      if (message && this.socket.readyState == 1) this.socket.send(JSON.stringify(message));
    }

    manageAction(data){
      console.log(data)
      if(data.action == 'newUser') this.send({action:'join'});
      if(data.action == 'newUserJoin') {
        new ChatModule(data.roomID)
      }
    }
}
