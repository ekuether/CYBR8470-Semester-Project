const pool = require("../db");

module.exports = (app) => {
    app.get('/user/:uid/players/:pid', (req, res) => {
        try {
            const userid = req.params.uid;
            const playerid = req.params.pid;
            const userPlayer = pool.query("SELECT * FROM user_player WHERE userid = $1 AND player_id = $2", [userid, playerid]);
            res.json(userPlayer.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/user/:uid/players/:pid', (req, res) => {
        try {
            const userid = req.params.uid;
            const playerid = req.params.pid;
            const userPlayer = pool.query("DELETE FROM user_player WHERE userid = $1 AND player_id = $2 RETURNING *", [userid, playerid]);
            res.json(userPlayer.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}