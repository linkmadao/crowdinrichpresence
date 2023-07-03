const express = require('express')
const bodyParser = require('body-parser')
const RPC = require('discord-rpc');
const client = new RPC.Client({ transport: "ipc" });

var clientID = "1055261546005135442";
const presence = require('./presence.js')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

client.on('ready', () => {
    app.post('/', function (req, res) {
        try {
            presence(client, req.body);    
        } catch (error) {
            console.log(error);
        }
        
        res.header("Access-Control-Allow-Origin", "*").sendStatus(200);
    });

    app.listen(3000, () => console.log(`Started on port 3000!`));
});

client.login({ clientId: clientID }).catch(console.error);