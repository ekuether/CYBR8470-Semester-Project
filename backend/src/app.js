var express = require('../../node_modules/express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

require('./gamelevelHandler/gamelevelList')(app);
require('./gamelevelHandler/gamelevel')(app);

// app.get('/', (req, res) => {
//     console.log("test1");
// })

// app.get("/obstacles", async(req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// })

app.listen(3000, function() {
    console.log('Example app listensing')
})