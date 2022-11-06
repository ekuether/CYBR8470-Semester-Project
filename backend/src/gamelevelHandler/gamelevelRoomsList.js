const pool = require("../db");

module.exports = (app) => {
    app.get('gamelevel/:id/rooms', (req, res) => {
        try {
            const id = req.params.id;
            const levelRooms = pool.query("SELECT * FROM levelrooms WHERE level = $1", [id]);
            res.json(levelrooms.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('gamelevel/:id/rooms', (req, res) => {
        try {
            const id = req.params.id;
            const {room} = req.body;
            const newLevelRoom = pool.query("INSERT INTO levelrooms(level, room) VALUES($1, $2) RETURNING *", [id, room]);
            res.json(newLevelRoom.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};