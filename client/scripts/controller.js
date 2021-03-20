(() => {
    let userID = null;
    const Chats = {};
    const icons = [{
            class: 'fas fa-smile',
            symbol: '^se^'
        },
        {
            class: 'far fa-heart',
            symbol: '^ht^'
        },
        {
            class: 'far fa-smile-wink',
            symbol: '^sk^'
        },
        {
            class: 'fas fa-poo',
            symbol: '^p^'
        },
        {
            class: 'far fa-kiss-beam',
            symbol: '^kb^'
        },
        {
            class: 'fas fa-grin-beam-sweat',
            symbol: '^kbs^'
        },
        {
            class: 'far fa-grin-hearts',
            symbol: '^gh^'
        },
        {
            class: 'far fa-laugh-squint',
            symbol: '^ls^'
        }
    ]

    const manageAction = (data) => {
        switch (data.action) {
            case 'newUser':
                userID = data.user.id;
                document.getElementById('login').remove();
                ShowChats()
                Login = null;
                break;
            case 'newUserJoin':
                if (!Chats[data.roomID]) {
                    Chats[data.roomID] = new ChatModule(data.roomID, sendMessage, icons)
                    for (let index = 0; index < data.messages.length; index++) {
                        const msg = data.messages[index];
                        manageNewMessage(msg);
                    }
                }

                break;
            case 'newChatMessage':
                manageNewMessage(data);
                break;

            default:
                break;
        }
    }

    const manageNewMessage = (data) => {
        let myMessage = data.sendId === userID ? true : false;
        let msg = new Message(myMessage, icons);
        data.time = new Date(data.time).toLocaleTimeString()
        let html = msg.setMsg(data);
        Chats[data.roomID].setHtmlMessage(html)
        window.location.replace(`http://127.0.0.1:3000/chat#` + data.id)
    }

    const sendMessage = (chatId, message) => {
        socket.send({
            action: 'message',
            roomID: chatId,
            message
        })
    }

    const setLogin = (username, chatID) => {
        socket.send({
            action: 'newUser',
            name: username,
            chatID: chatID
        });
    }

    const ShowChats = () => {
        let chatClass = document.getElementById('chatsContainer').className;
        chatClass = chatClass.replace('hide', '')
        document.getElementById('chatsContainer').className = chatClass;
    }

    let Login = new LoginModule(setLogin);


    const socket = new Socket(manageAction);
    socket.openConnection()

})()