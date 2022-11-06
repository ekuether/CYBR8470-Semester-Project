const pool = require("../db");

module.exports = (app) => {
    app.get('/room/:rid/obstacles/:oid', (req, res) => {
        try {
            const roomid = req.params.rid;
            const obstacleid = req.params.oid;
            const roomObstacle = pool.query("SELECT * FROM roomobstacles WHERE room = $1 AND obstacle = $2", [roomid, obstacleid]);
            res.json(roomObstacle.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/room/:rid/obstacles/:oid', (req, res) => {
        try {
            const roomid = req.params.rid;
            const obstacleid = req.params.oid;
            const roomObstacle = pool.query("DELETE FROM roomobstacles WHERE room = $1 AND obstacles = $2 RETURNING *", [roomid, obstacleid]);
            res.json(roomObstacle.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}