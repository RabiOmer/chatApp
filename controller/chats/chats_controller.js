const express = require('express');
const RoomController = require('../room/room_controller')

const router = express.Router();


// check if as a live chat if not cerate a new chat
const createNewChat = async (req,res)=> {
    try {
        
        let userID = req.query.userID;
        let roomID = req.query.roomID;
        let asRoom, reqRoomIsLive;
        if(!userID) throw 'missing user id';
        let updateChat;

        if(roomID){
            let reqRoomIsLive = RoomController.findRoom(roomID)
            res.json({
                success: true,
                data: reqRoomIsLive
            })
        } else  {
            asRoom = RoomController.asOpenRoom();
        }

        if(asRoom) {
            res.json({
                success:true,
                data: asRoom
            })
        }

        newChat.users = [userID]


        RoomController.setNewRoom(newChat._id);

        res.json({
            success: true,
            data: newChat
        })
    }
    catch (e) {
        console.error(`[createNewChat] - `,e)
        res.json({
            success: false
        })
    }
}

// get chat by id from db
const getChatById = async (req,res)=> {
    try {
        let chatId = req.query.chat_id;
        let chat,isRoomLive,roomData;

        if(!chatId) throw 'missing chat id';

        isRoomLive = RoomController.findRoom(chatId);

        if(isRoomLive){
            roomData = RoomController.getRoomData(chatId);
            res.json({
                success:true,
                data: roomData
            })
        }

        chat = await ChatModel.id(chatId);
        if(!chat) throw `chat wasn't found`;
        console.log(`get chat by id - `,chat)
        RoomController.setNewRoom(chatId, chat.massages)
        res.json({
            success: true,
            ...chat
        })
    }
    catch (e) {
        console.error(`[getChatById] - `,e)
        res.json({
            success:false
        })
    }
}


router.get('/new',createNewChat);
router.get('/:id',getChatById);


module.exports = router;
