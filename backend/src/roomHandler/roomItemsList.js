const pool = require("../db");

module.exports = (app) => {
    app.get('rooms/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const roomItems = pool.query("SELECT * FROM roomitems WHERE room = $1", [id]);
            res.json(roomItems.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('rooms/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const {item} = req.body;
            const newRoomItem = pool.query("INSERT INTO roomitems(room, item) VALUES($1, $2) RETURNING *", [id, item]);
            res.json(newRoomItem.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};