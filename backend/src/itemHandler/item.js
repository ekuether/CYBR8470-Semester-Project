const pool = require("../db");

module.exports = (app) => {
    app.get('/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const item = await pool.query("SELECT * FROM item WHERE ID = $1", [id])
            res.json(item.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {room, possessed, name} = req.body;
            const item = await pool.query("UPDATE item SET room = $1, possessed = $2, name = $3 WHERE ID = $4 RETURNING *", [room, possessed, name, id]);
            res.json(item.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const item = await pool.query("DELETE FROM item WHERE ID = $1 RETURNING *", [id]);
            res.json(item.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}