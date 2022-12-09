const pool = require("../db");


module.exports = (app) => {
    app.post("/items", async(req, res) => {
        try {
            const { name } = req.body;
            const newItem = await pool.query("INSERT INTO item(name) VALUES($2) RETURNING *", [name]);
            res.json(newItem.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/items", async(req, res) => {
        try {
            const allItems = await pool.query("SELECT * FROM item")
            res.json(allItems.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};