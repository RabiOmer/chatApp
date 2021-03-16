
const Room = require('../../chat_modules/room/room_module')

const roomList = {};

/**
 * find if the room is open when user request the room
 * @param {String} roomID - MongoDb document id
 */
const findRoom = (roomID) => {
    if (!roomID) return;
    return roomList[roomID] ? roomList[roomID] : false
}

/**
 * check for open rooms and return the lest one
 */
const asOpenRoom = () => {
    let arrayRooms = Object.keys(roomList);
    if (arrayRooms.length) {
        roomList[arrayRooms[0]]._id = arrayRooms[0];
        return roomList[arrayRooms[0]];
    }
    return
}

/**
 * set new live room
 * @param {String} roomID - MongoDb document id
 */
const setNewRoom = () => {
    let roomID = '_Ch_'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
    roomList[roomID] = new Room(roomID);
    return roomID;
}

/**
 * set new live room
 * @param {String} roomID - MongoDb document id
 */
const getRoomData = (roomID) => {
    return roomList[roomID]
}

//add message to room
const setMessage = (ws, message) => {
    roomList[ws.userInfo.roomID].addMessage(ws, message)
}

//add user to room
const setUserInRoom = (ws) => {
    if (ws.userInfo.roomID && roomList[ws.userInfo.roomID])
        roomList[ws.userInfo.roomID].joinRoom(ws)
}
//remove user from room
const removeUserFromRoom = async (ws) => {
    if (ws && ws.userInfo && ws.userInfo.roomID) {
        if (roomList[ws.userInfo.roomID]) {
            let isUsers = roomList[ws.userInfo.roomID].removeUserById(ws.userInfo.userId);
            if (isUsers) return
            await roomList[ws.userInfo.roomID].setMessagesInDB();
            delete roomList[ws.userInfo.roomID];
        }
    }
}




module.exports = {
    findRoom,
    setNewRoom,
    getRoomData,
    setMessage,
    setUserInRoom,
    asOpenRoom,
    removeUserFromRoom
}