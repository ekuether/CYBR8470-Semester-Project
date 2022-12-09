const pool = require("../db");

module.exports = (app) => {
    app.get('/gamelevel/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const level = await pool.query("SELECT * FROM gamelevel WHERE ID = $1", [id])
            res.json(level.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.put('/gamelevel/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {startroom, leveldifficulty, levelname, maxitems} = req.body;
            const level = await pool.query("UPDATE gamelevel SET startroom = $1, leveldifficulty = $2, levelname = $3, maxitems = $4 WHERE ID = $5 RETURNING *", [startroom, leveldifficulty, levelname, maxitems, id]);
            res.json(level.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/gamelevel/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const level = await pool.query("DELETE FROM gamelevel WHERE ID = $1 RETURNING *", [id]);
            res.json(level.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}