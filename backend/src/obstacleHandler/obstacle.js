const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets the obstacles based on their id passed in through the URL
    app.get('/obstacles/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const obstacle = await pool.query("SELECT * FROM obstacle WHERE ID = $1", [id])
            res.json(obstacle.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    // PUT
    // Modifies the obstacle based on their id passed in through the URL
    app.put('/obstacles/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {weakness, name} = req.body;
            const obstacle = await pool.query("UPDATE obstacle SET weakness = $1, name = $2 WHERE ID = $3 RETURNING *", [weakness, name, id]);
            res.json(obstacle.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    // DELETE
    // Deletes and obstacle
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