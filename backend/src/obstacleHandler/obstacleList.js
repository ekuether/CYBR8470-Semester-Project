const pool = require("../db");


module.exports = (app) => {
    app.post("/obstacles", async(req, res) => {
        try {
            const { id, room, weakness, name } = req.body;
            const newObstacle = await pool.query("INSERT INTO obstacle(ID, name, room, weakness) VALUES($1, $2, $3, $4) RETURNING *", [id, name, room, weakness]);
            res.json(newObstacle.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/obstacles", async(req, res) => {
        try {
            const allObstacles = await pool.query("SELECT * FROM obstacle")
            res.json(allObstacles.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};