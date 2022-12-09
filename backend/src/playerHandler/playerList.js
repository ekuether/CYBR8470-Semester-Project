const pool = require("../db");


module.exports = (app) => {
    app.post("/players", async(req, res) => {
        try {
            const { name } = req.body;
            const newPlayer = await pool.query("INSERT INTO player(name) VALUES($1) RETURNING *", [name]);
            res.json(newPlayer.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/players", async(req, res) => {
        try {
            const allPlayers = await pool.query("SELECT * FROM player")
            res.json(allPlayers.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};