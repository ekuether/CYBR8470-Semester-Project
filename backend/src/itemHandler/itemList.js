const pool = require("../db");


module.exports = (app) => {
    app.post("/items", async(req, res) => {
        try {
            const { id, possessed, room, name } = req.body;
            const newItem = await pool.query("INSERT INTO Items(ID, possesed, room, name) VALUES($1, $2, $3, $4) RETURNING *", [id, possessed, room, name]);
            res.json(newItem.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/gamelevel", async(req, res) => {
        try {
            const allItems = await pool.query("SELECT * FROM item")
            res.json(allItems.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};