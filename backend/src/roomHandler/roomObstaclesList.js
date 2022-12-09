const pool = require("../db");

module.exports = (app) => {
    app.get('rooms/:id/obstacles', (req, res) => {
        try {
            const id = req.params.id;
            const roomObstacles = pool.query("SELECT * FROM roomobstacles WHERE room = $1", [id]);
            res.json(roomObstacles.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('rooms/:id/obstacles', (req, res) => {
        try {
            const id = req.params.id;
            const {obstacle} = req.body;
            const newRoomObstacle = pool.query("INSERT INTO roomobstacles(room, obstacle) VALUES($1, $2) RETURNING *", [id, obstacle]);
            res.json(newRoomObstacle.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};