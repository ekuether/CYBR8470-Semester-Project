// Gamelevel is the class used for levels of a certain ID
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets a gamelevel based on the id passed in through the url
    app.get('/gamelevel/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const level = await pool.query("SELECT * FROM gamelevel WHERE ID = $1", [id])
            res.json(level.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    // PUT
    // Modifies a gamelevel based on the id passed in the url
    // Body requires: startroom: integer, leveldifficulty: integer, levelname: varchar(255), maxitems: integer
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

    // DELETE
    // Deletes a gamelevel based on the id passed in the url
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