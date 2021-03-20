class MessageForm {

    constructor(icons=[],chatId,sendMessageCb){
        this.icons = icons;
        this.sendMessageCb = sendMessageCb;
        this.chatId = chatId
    }

    createForm() {


    const box = document.createElement('div');
        box.className = 'box';
    const icons = document.createElement('div');
        icons.className = 'icons';
    this.textarea = document.createElement('textarea');
        this.textarea.setAttribute('name','comment[body]')
        this.textarea.setAttribute('rows','1')
        this.textarea.setAttribute('cols','50')
    const btnBox = document.createElement('div');
    this.send = document.createElement('button');
        this.send.setAttribute('type','button');
        this.send.setAttribute('disabled',true);
        this.send.className ='btn btn-success';
        this.send.innerHTML ='Send';
    this.clear = document.createElement('button');
        this.clear.setAttribute('type','button');
        this.clear.setAttribute('disabled',true);
        this.clear.className ='btn btn-danger';
        this.clear.innerHTML ='Clear';

        btnBox.appendChild(this.send)
        btnBox.appendChild(this.clear)
        box.appendChild(icons);
        box.appendChild(this.textarea);
        box.appendChild(btnBox);

        this.clear.addEventListener('click',()=>this.clearMessage())
        this.send.addEventListener('click',()=>this.sendMessage())
        this.textarea.addEventListener('keyup',()=>this.onChange())

        this.createIcons(icons);
        
        return box
    }
    createIcons(icons){
        for (let index = 0; index < this.icons.length; index++) {
            const icon = this.icons[index];
            const i = document.createElement('i');
                i.className = icon.class;
                i.addEventListener('click',()=>{
                    this.setIcon(icon.symbol)
                })
            icons.appendChild(i)
        } 
    }

    setIcon(icon ='(^H)') {
        this.textarea.value += icon

    }

    onChange() {
        if(this.textarea.value == '') {
            this.clear.setAttribute('disabled',true);
            this.send.setAttribute('disabled',true);
        } else {
            this.clear.removeAttribute('disabled')
            this.send.removeAttribute('disabled')
        }
    }

    clearMessage() {
        this.textarea.value = '';
        this.onChange();
    }

    sendMessage(){
        let messageValue = this.textarea.value.trim();
        this.sendMessageCb(this.chatId,messageValue)
        this.clearMessage()
    }



}