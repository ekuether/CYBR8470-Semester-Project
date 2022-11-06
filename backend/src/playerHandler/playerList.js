const pool = require("../db");


module.exports = (app) => {
    app.post("/players", async(req, res) => {
        try {
            const { id, room, userid, maxitems, numitems, name } = req.body;
            const newPlayer = await pool.query("INSERT INTO player(ID, room, userid, maxitems, numitems, name) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [id, room, userid, maxitems, numitems, name]);
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