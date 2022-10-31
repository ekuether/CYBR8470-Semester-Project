var express = require('../../node_modules/express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("test1");
})

app.post("/gamelevel", async(req, res) => {
    try {
        const { ID, StartRoom, LevelDifficulty, LevelName } = req.body;
        const newLevel = await pool.query("INSERT INTO GameLevel(ID, LevelName, StartRoom, LevelDifficulty) VALUES($1, $2, $3, $4) RETURNING *", [ID, LevelName, StartRoom, LevelDifficulty]);
        res.json(newLevel.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/gamelevel", async(req, res) => {
    try {
        const allLevels = await pool.query("SELECT * FROM GameLevel")
        res.json(allLevels.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(3000, function() {
    console.log('Example app listensing')
})