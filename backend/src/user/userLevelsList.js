const pool = require("../db");

module.exports = (app) => {
    app.get('/user/:id/levels', async (req, res) => {
        try {
            const id = req.params.id;
            const userlevels = await pool.query("SELECT * FROM userlevels WHERE userid = $1", [id]);
            res.json(userlevels.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('/user/:id/levels', async (req, res) => {
        try {
            const id = req.params.id;
            const {level} = req.body;
            const newLevel = await pool.query("INSERT INTO userlevels(userid, gamelevel) VALUES($1, $2) RETURNING *", [id, level]);
            res.json(newLevel.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};