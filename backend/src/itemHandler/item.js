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
            const {name} = req.body;
            const item = await pool.query("UPDATE item SET name = $1 WHERE ID = $2 RETURNING *", [name, id]);
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