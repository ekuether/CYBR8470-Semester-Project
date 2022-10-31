var express = require('../../node_modules/express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("test1");
})

app.post("/dungeon", async(req, res) => {
    try {
        console.log("test")
        const { LevelName } = req.body;
        const newLevel = await pool.query("INSERT INTO GameLevel (LevelName) VALUES($1)",
        [LevelName]
        );
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, function() {
    console.log('Example app listensing')
})