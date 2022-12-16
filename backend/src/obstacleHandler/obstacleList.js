const pool = require("../db");


module.exports = (app) => {
    // POST
    // Creates a new obstacle
    app.post("/obstacles", async(req, res) => {
        try {
            const { weakness, name } = req.body;
            const newObstacle = await pool.query("INSERT INTO obstacle(name, weakness) VALUES($1, $2) RETURNING *", [name, weakness]);
            res.json(newObstacle.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    // GET
    // Gets all of the obstacles
    app.get("/obstacles", async(req, res) => {
        try {
            const allObstacles = await pool.query("SELECT * FROM obstacle")
            res.json(allObstacles.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};