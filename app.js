console.clear();

const ServerSettings = require('./chat_modules/settings/env_module');
const AppController = require('./controller/app/app_controller');
const { Server } = require('./controller/server/server_controller');



const server = new Server();
server.loadServer();
