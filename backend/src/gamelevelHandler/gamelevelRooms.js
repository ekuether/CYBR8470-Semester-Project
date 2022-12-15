// GameLevelRooms is to view specific rooms in a game level
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Get a room based on the rid in the URL in a gamelevel based on the gid in the URL
    app.get('/gamelevel/:gid/rooms/:rid', (req, res) => {
        try {
            const gamelevelid = req.params.gid;
            const roomid = req.params.rid;
            const gamelevelRooms = pool.query("SELECT * FROM levelrooms WHERE level = $1 AND room = $2", [gamelevelid, roomid]);
            res.json(gamelevelRooms.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    // DELETE
    // Delete a room based on the rid in the URL in a gamelevel based on the gid in the URL
    app.delete('/gamelevel/:gid/rooms/:rid', (req, res) => {
        try {
            const gamelevelid = req.params.gid;
            const roomid = req.params.rid;
            const levelRooms = pool.query("DELETE FROM levelrooms WHERE level = $1 AND rooms = $2 RETURNING *", [gamelevelid, roomid]);
            res.json(levelRooms.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}