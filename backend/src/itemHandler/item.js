// Item is used to get, modify or delete items
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets the item by the id indicated in the URL
    app.get('/items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const item = await pool.query("SELECT * FROM item WHERE ID = $1", [id])
            res.json(item.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    // PUT
    // Modifies items based on the id indicated in the URL
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

    // DELETE
    // Deletes the item indicated by the id in the URL
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