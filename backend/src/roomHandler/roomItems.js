const pool = require("../db");

module.exports = (app) => {
    app.get('/room/:rid/items/:iid', (req, res) => {
        try {
            const roomid = req.params.pid;
            const itemid = req.params.iid;
            const roomItem = pool.query("SELECT * FROM roomitems WHERE room = $1 AND item = $2", [roomid, itemid]);
            res.json(roomItem.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/room/:rid/items/:iid', (req, res) => {
        try {
            const roomid = req.params.pid;
            const itemid = req.params.iid;
            const roomItem = pool.query("DELETE FROM roomitems WHERE room = $1 AND item = $2 RETURNING *", [roomid, itemid]);
            res.json(roomItem.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}