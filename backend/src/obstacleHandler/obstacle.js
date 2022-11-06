const pool = require("../db");

module.exports = (app) => {
    app.get('/obstacles/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const obstacle = await pool.query("SELECT * FROM obstacle WHERE ID = $1", [id])
            res.json(obstacle.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/obstacles/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {room, weakness, name} = req.body;
            const obstacle = await pool.query("UPDATE obstacle SET room = $1, weakness = $2, name = $3 WHERE ID = $4 RETURNING *", [room, weakness, name, id]);
            res.json(obstacle.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/obstacles/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const obstacle = await pool.query("DELETE FROM obstacle WHERE ID = $1 RETURNING *", [id]);
            res.json(obstacle.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}