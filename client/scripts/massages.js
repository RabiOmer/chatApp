class Message {

    constructor(myMsg,icons) {
        this.myMsg = myMsg;
        this.icons = icons;
    }

    setMsg(data){
        let side = this.myMsg ? 'left' : 'right';
        let msgBox = document.createElement('div');
            msgBox.className = 'msg-box-'+side;
            msgBox.setAttribute('id',data.id)
        let msg = document.createElement('div');
            msg.className = 'msg '
            msg.className += this.myMsg ? '' : 'myMsg';
        let icons = document.createElement('div');
            icons.className = 'icons';
        let QIcon = document.createElement('i');
            QIcon.className = 'fas fa-quote-left';
        let HIcons = document.createElement('i');
            HIcons.className = 'far fa-heart';
        let name = document.createElement('p');
            name.className = 'name';
            name.innerHTML = data.username;
        let content = document.createElement('p');
        let msgContent = this.getMessageIcons(data.content);
        content.innerHTML =  msgContent;
        let time = document.createElement('p');
            time.className = 'time';
            time.innerHTML = data.time;

            icons.appendChild(QIcon);
            icons.appendChild(HIcons);
            msg.appendChild(icons);
            msg.appendChild(name);
            msg.appendChild(content);
            msg.appendChild(time);
            msgBox.appendChild(msg);
            
            return msgBox
    }

    getMessageIcons(content){
        for (let index = 0; index < this.icons.length; index++) {
            const icon = this.icons[index];
            content = content.replaceAll(icon.symbol,`<i class="${icon.class}"></i>`);  
        }
        return content
    }
} 