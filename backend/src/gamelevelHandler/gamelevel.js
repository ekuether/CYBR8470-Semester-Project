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
            const {startRoom, levelDifficulty, levelName} = req.body;
            const level = await pool.query("UPDATE gamelevel SET startroom = $1, leveldifficulty = $2, levelname = $3 WHERE ID = $4 RETURNING *", [startRoom, levelDifficulty, levelName, id]);
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