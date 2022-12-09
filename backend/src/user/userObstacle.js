const pool = require("../db");

module.exports = (app) => {
    app.get('/user/:uid/obstacles/:oid', (req, res) => {
        try {
            const userid = req.params.uid;
            const obstacleid = req.params.oid;
            const userObstacle = pool.query("SELECT * FROM user_obstacle WHERE userid = $1 AND obstacle_id = $2", [userid, obstacleid]);
            res.json(userObstacle.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/user/:uid/obstacles/:oid', (req, res) => {
        try {
            const userid = req.params.uid;
            const obstacleid = req.params.oid;
            const userObstacle = pool.query("DELETE FROM user_obstacle WHERE userid = $1 AND obstacle_id = $2 RETURNING *", [userid, obstacleid]);
            res.json(userObstacle.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}