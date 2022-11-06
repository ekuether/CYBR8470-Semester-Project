const pool = require("../db");


module.exports = (app) => {
    app.post("/rooms", async(req, res) => {
        try {
            const { id, roomabove, roombelow, roomleft, roomright, name } = req.body;
            const newRoom = await pool.query("INSERT INTO room(ID, roomabove, roombelow, roomleft, roomright, name) VALUES($1, $2, $3, $4) RETURNING *", [id, roomabove, roombelow, roomleft, roomright, name]);
            res.json(newRoom.rows[0])
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/rooms", async(req, res) => {
        try {
            const allRooms = await pool.query("SELECT * FROM room")
            res.json(allRooms.rows)
        } catch (err) {
            console.log(err.message)
        }
    })
};