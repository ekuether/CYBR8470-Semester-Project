const pool = require("../db");

module.exports = (app) => {
    app.get('/user/:uid/levels/:lid', (req, res) => {
        try {
            const userid = req.params.uid;
            const levelid = req.params.lid;
            const userLevels = pool.query("SELECT * FROM userlevels WHERE userid = $1 AND gamelevel = $2", [userid, levelid]);
            res.json(userLevels.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/user/:uid/levels/:lid', (req, res) => {
        try {
            const userid = req.params.uid;
            const levelid = req.params.lid;
            const userLevels = pool.query("DELETE FROM userlevels WHERE userid = $1 AND gamelevel = $2 RETURNING *", [userid, levelid]);
            res.json(userLevels.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}