const pool = require("../db");


module.exports = (app) => {
    app.post("/gamelevel", async(req, res) => {
        try {
            const { id, startroom, leveldifficulty, levelname, maxitems } = req.body;
            const newLevel = await pool.query("INSERT INTO GameLevel(LevelName, StartRoom, LevelDifficulty, maxitems) VALUES($1, $2, $3, $4) RETURNING *", [levelname, startroom, leveldifficulty, maxitems]);
            res.json(newLevel.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/gamelevel", async(req, res) => {
        try {
            const allLevels = await pool.query("SELECT * FROM GameLevel")
            res.json(allLevels.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};
