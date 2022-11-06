var express = require('express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

require('./gamelevelHandler/gamelevelList')(app);
require('./gamelevelHandler/gamelevel')(app);
require('./gamelevelHandler/gamelevelRooms')(app);
require('./gamelevelHandler/gamelevelRoomsList')(app);

require('./itemHandler/itemList')(app);
require('./itemHandler/item')(app);

require('./obstacleHandler/obstacleList')(app);
require('./obstacleHandler/obstacle')(app);

require('./playerHandler/playerList')(app);
require('./playerHandler/player')(app);
require('./playerHandler/playeritems')(app);
require('./playerHandler/playeritemsList')(app);

require('./roomHandler/roomList')(app);
require('./roomHandler/room')(app);
require('./roomHandler/roomItems')(app);
require('./roomHandler/roomItemsList')(app);
require('./roomHandler/roomObstacles')(app);
require('./roomHandler/roomObstaclesList')(app);


app.listen(3000, function() {
    console.log('Example app listensing')
})