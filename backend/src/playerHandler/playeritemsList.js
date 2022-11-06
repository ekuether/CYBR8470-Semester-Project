const pool = require("../db");

module.exports = (app) => {
    app.get('players/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const playerItems = pool.query("SELECT * FROM playeritems WHERE player = $1", [id]);
            res.json(playerItems.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('players/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const {item} = req.body;
            const newPlayerItem = pool.query("INSERT INTO playeritems(player, item) VALUES($1, $2) RETURNING *", [id, item]);
            res.json(newPlayerItem.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

};