class ChatModule {

    constructor(id,messages) {
        this.chatId = id;
        this.messages = messages;
        this.createChat()
    }
    createChat(){
        console.log('new chat')
        const container = document.createElement('div');
            container.className = 'container';
            container.setAttribute('id',this.chatId);
        const chat = document.createElement('div');
            chat.className = 'chat';
        const title = document.createElement('div');
            title.className = 'title';
        const h1 = document.createElement('h1');
            h1.innerHTML = this.chatId;
        const messages = document.createElement('div');
            messages.className = 'messages'
        const messagesForm = document.createElement('div');
            messagesForm.className = 'message-form'

            title.appendChild(h1);
            chat.appendChild(title);
            chat.appendChild(messages)
            chat.appendChild(messagesForm)
            container.appendChild(chat);
            document.getElementsByTagName('body')[0].appendChild(container);  
            
                for (let index = 0; index < 10; index++) {
                    let msg = new Message(index % 2);
                    let name = index % 2 ? 'omerRabi' : 'BarVersano'
                    let con = index % 2 ? 'Hey Bar Versano' : 'Hey Omer Rabi!'
                    let v = msg.setMsg({name:name,id:index,time:'12:24',content:con})
                    messages.appendChild(v)
                    
                }
    }
}