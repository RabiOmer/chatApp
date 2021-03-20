class ChatModule {

    constructor(id, sendMessageCb, icons) {
        this.chatId = id;
        this.sendMessageCb = sendMessageCb;
        this.icons = icons;
        this.createChat()
    }
    createChat() {
        const container = document.createElement('div');
        container.className = 'container';
        container.setAttribute('id', this.chatId);
        const chat = document.createElement('div');
        chat.className = 'chat';
        const title = document.createElement('div');
        title.className = 'title';
        const h1 = document.createElement('h1');
        h1.innerHTML = this.chatId;
        this.HTMLMessages = document.createElement('div');
        this.HTMLMessages.className = 'messages'
        const messagesForm = document.createElement('div');
        messagesForm.className = 'message-form'

        title.appendChild(h1);
        chat.appendChild(title);
        chat.appendChild(this.HTMLMessages)
        chat.appendChild(messagesForm)
        container.appendChild(chat);
        document.getElementsByTagName('body')[0].appendChild(container);

        let form = new MessageForm(this.icons, this.chatId, this.sendMessageCb);
        let formHtml = form.createForm();
        messagesForm.appendChild(formHtml)
        document.getElementById('chatsContainer').appendChild(container);
    }

    setHtmlMessage(htmlMSG) {
        this.HTMLMessages.append(htmlMSG);
    }

    showHideChat(id) {}
}