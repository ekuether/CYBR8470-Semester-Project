const pool = require("../db");


module.exports = (app) => {
    app.post("/gamelevel", async(req, res) => {
        try {
            const { id, startroom, leveldifficulty, levelname } = req.body;
            const newLevel = await pool.query("INSERT INTO GameLevel(ID, LevelName, StartRoom, LevelDifficulty) VALUES($1, $2, $3, $4) RETURNING *", [id, levelname, startroom, leveldifficulty]);
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
