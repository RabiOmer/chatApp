class LoginModule {

    userNameInput = document.getElementById('userNameInput');
    loginBtn = document.getElementById('loginBtn');
    chatInput = document.getElementById('chatInput');


    constructor(loginCb) {
        this.loginCb = loginCb;
        this.loginBtn.addEventListener('click', () => this.login())
    }

    login() {
        let username = this.userNameInput.value.trim();
        let chatId = this.chatInput.value.trim();
        if (username) this.loginCb(username, chatId);
    }
}