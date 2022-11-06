const pool = require("../db");

module.exports = (app) => {
    app.get('/rooms/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const room = await pool.query("SELECT * FROM room WHERE ID = $1", [id])
            res.json(level.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/rooms/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {roomabove, roombelow, roomleft, roomright, name} = req.body;
            const room = await pool.query("UPDATE room SET roomabove = $1, roombelow = $2, roomleft = $3, roomright = $4, name = $5 WHERE ID = $6 RETURNING *", [roomabove, roombelow, roomleft, roomright, name, id]);
            res.json(room.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/rooms/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const room = await pool.query("DELETE FROM room WHERE ID = $1 RETURNING *", [id]);
            res.json(room.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}