const pool = require("../db");


module.exports = (app) => {
    app.post("/users", async(req, res) => {
        try {
            //Password should already be salted and hashed
            const { userid, password } = req.body;
            const user = await pool.query("INSERT INTO userinfo(userid, password) VALUES($1, $2) RETURNING *", [userid, password]);
            res.json(user.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/users", async(req, res) => {
        try {
            const allUsers = await pool.query("SELECT * FROM userinfo")
            res.json(allUsers.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};