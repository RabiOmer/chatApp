class Message {

    constructor(myMsg) {
        this.myMsg = myMsg;
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
            name.innerHTML = data.name;
        let content = document.createElement('p');
            content.innerHTML = data.content;
        let time = document.createElement('p');
            time.className = 'time';
            time.innerHTML = data.time;

            icons.appendChild(QIcon);
            icons.appendChild(HIcons);
            msg.appendChild(icons);
            msg.appendChild(name);
            msg.appendChild(content)
            msg.appendChild(time)
            msgBox.appendChild(msg);
            
            return msgBox
    }
} 