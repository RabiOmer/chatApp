const express = require('express')
const bodyParser = require('body-parser');
const chatsController = require('../chats/chats_controller')
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');      

    if ('OPTIONS' == req.method) {
      res.status(200).end();
    }
    else {
      next();
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/chats', chatsController)

app.use('**',(req,res)=>{
    console.log('request Unknown');
    res.status(404).end('404 bed request');
})

app.listen(4000)
