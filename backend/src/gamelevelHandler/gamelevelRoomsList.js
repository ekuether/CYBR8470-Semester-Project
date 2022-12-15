// GameLevelRoomsList is used to create rooms in a game level or get all the rooms of a level
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets all the rooms of a gamelevel based on the id passed in from the URL
    app.get('gamelevel/:id/rooms', (req, res) => {
        try {
            const id = req.params.id;
            const levelRooms = pool.query("SELECT * FROM levelrooms WHERE level = $1", [id]);
            res.json(levelrooms.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    // POST
    // Makes a new room in a gamelevel based on the id passed in from the URL
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