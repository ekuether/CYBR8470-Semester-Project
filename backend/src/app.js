var express = require('express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//     res.
// })

require('./gamelevelHandler/gamelevel')(app);
require('./gamelevelHandler/gamelevelList')(app);
require('./gamelevelHandler/gamelevelPlayer')(app);
require('./gamelevelHandler/gamelevelPlayerList')(app);
require('./gamelevelHandler/gamelevelRooms')(app);
require('./gamelevelHandler/gamelevelRoomsList')(app);

require('./itemHandler/item')(app);
require('./itemHandler/itemList')(app);

require('./obstacleHandler/obstacle')(app);
require('./obstacleHandler/obstacleList')(app);

require('./playerHandler/player')(app);
require('./playerHandler/playeritems')(app);
require('./playerHandler/playeritemsList')(app);
require('./playerHandler/playerList')(app);

require('./roomHandler/room')(app);
require('./roomHandler/roomItems')(app);
require('./roomHandler/roomItemsList')(app);
require('./roomHandler/roomList')(app);
require('./roomHandler/roomObstacles')(app);
require('./roomHandler/roomObstaclesList')(app);

require('./user/user')(app);
require('./user/userList')(app);
require('./user/userItem')(app);
require('./user/userItemList')(app);
require('./user/userLevels')(app);
require('./user/userLevelsList')(app);
require('./user/userObstacle')(app);
require('./user/userObstacleList')(app);
require('./user/userPlayer')(app);
require('./user/userPlayerList')(app);

require('./createNewUser')(app);
require('./login')(app);


app.listen(3000, function() {
    console.log('Example app listensing')
})