const pool = require('../db');

module.exports = (app) => {
    app.get('/user/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await pool.query("SELECT * FROM userinfo WHERE userid = $1", [id])
            res.json(user.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/user/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {currentCookie} = req.body;
            const user = await pool.query("UPDATE userinfo SET current_cookie = $1 WHERE userid = $2 RETURNING *", [currentCookie, id]);
            res.json(user.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/user/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await pool.query("DELETE FROM userinfo WHERE ID = $1 RETURNING *", [id]);
            res.json(user.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}