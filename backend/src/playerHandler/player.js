const pool = require("../db");

module.exports = (app) => {
    app.get('/players/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const player = await pool.query("SELECT * FROM player WHERE ID = $1", [id])
            res.json(player.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/players/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {room, userid, maxitems, numitems, name} = req.body;
            const player = await pool.query("UPDATE player SET room = $1, userid = $2, maxitems = $3, numitems = $4, name = $5 WHERE ID = $6 RETURNING *", [room, userid, maxitems, numitems, name, id]);
            res.json(player.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/players/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const player = await pool.query("DELETE FROM player WHERE ID = $1 RETURNING *", [id]);
            res.json(player.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}