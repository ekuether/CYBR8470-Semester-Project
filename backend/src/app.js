var express = require('../../node_modules/express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

require('./gamelevelHandler/gamelevelList')(app);
require('./gamelevelHandler/gamelevel')(app);

require('./itemHandler/itemList')(app);
require('./itemHandler/item')(app);

require('./obstacleHandler/obstacleList')(app);
require('./obstacleHandler/obstacle')(app);

require('./playerHandler/playerList')(app);
require('./playerHandler/player')(app);

require('./roomHandler/roomList')(app);
require('./roomHandler/room')(app);



app.listen(3000, function() {
    console.log('Example app listensing')
})