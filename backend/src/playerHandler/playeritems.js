const pool = require("../db");

module.exports = (app) => {
    app.get('/players/:pid/items/:iid', (req, res) => {
        try {
            const playerid = req.params.pid;
            const itemid = req.params.iid;
            const playerItem = pool.query("SELECT * FROM playeritems WHERE player = $1 AND item = $2", [playerid, itemid]);
            res.json(playerItem.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/players/:pid/items/:iid', (req, res) => {
        try {
            const playerid = req.params.pid;
            const itemid = req.params.iid;
            const playerItem = pool.query("DELETE FROM playeritems WHERE player = $1 AND item = $2 RETURNING *", [playerid, itemid]);
            res.json(playerItem.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}