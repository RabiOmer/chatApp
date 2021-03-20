class Socket {

  constructor(manageActionCb) {
    this.url = "ws://127.0.0.1:3000";
    this.manageAction = manageActionCb;
  }

  openConnection() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => this.open();
  }

  open() {
    this.socket.onclose = () => this.error();
    this.socket.onerror = (event) => this.close(event);
    this.socket.onmessage = (message) => this.message(message);
  }

  close() {}

  message(message) {
    if (message.data) {
      let data = JSON.parse(message.data);
      if (data.action) this.manageAction(data);
    }
  }

  error(event) {}

  send(message) {
    if (message && this.socket.readyState == 1) this.socket.send(JSON.stringify(message));
  }

}