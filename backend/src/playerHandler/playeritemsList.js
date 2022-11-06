const pool = require("../db");

module.export = (app) => {
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
            const {player, item} = req.body;
            const newPlayerItem = pool.query("INSERT INTO playeritems(player, id) VALUES($1, $2) RETURNING *", [player, item]);
            res.json(newPlayerItem.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

};