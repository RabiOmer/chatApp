// room class
class Room {

    constructor(roomID) {
        this.roomID = roomID;
        this.users = [];
        this.messages = [];
        console.log(this.messages)
    }

    // send message to all coacted clients
    broadcast(message, action) {
        if (!message || !action) return;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.ws && user.ws.readyState === 1) {
                message.action = action
                user.ws.send(JSON.stringify(message));
            }
        }
    }

    // add user to room
    joinRoom(ws) {
        this.users.push({
            id: ws.userInfo.id,
            name: ws.userInfo.name,
            ws
        })
        this.broadcast({
            user: {
                id: ws.userInfo.id,
                name: ws.userInfo.name,
            },
            messages: this.messages,
            roomID: this.roomID
        }, 'newUserJoin')
    }

    //add message to room
    addMessage(ws, message) {

        this.messages.unshift({
            sendId: ws.userInfo.id,
            userName: ws.userInfo.name,
            context: message.context,
            time: +new Date()
        })

        this.broadcast(this.messages[0], 'newChatMessage');

        // update in db every 20 messages
        if (this.messages.length % 20 == 0) this.setMessagesInDB()
    }
    async setMessagesInDB(){
        if(!this.messages.length) return
        await ChatModule.update(this.roomID, {
            massages: this.messages
        })
        return
    }

    //remove user from room
    removeUserById(id) {
        if(id) {
            let userIndex = this.users.findIndex(e => e.id == id)
            this.users.splice(userIndex,1);
            return this.users.length;
        }
    }
}

module.exports = Room;