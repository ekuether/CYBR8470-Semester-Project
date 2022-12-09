const pool = require("../db");

module.exports = (app) => {
    app.get('/user/:uid/items/:iid', (req, res) => {
        try {
            const userid = req.params.uid;
            const itemid = req.params.iid;
            const userItem = pool.query("SELECT * FROM user_item WHERE userid = $1 AND item_id = $2", [userid, itemid]);
            res.json(userItem.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    app.delete('/user/:uid/levels/:iid', (req, res) => {
        try {
            const userid = req.params.uid;
            const itemid = req.params.iid;
            const userItem = pool.query("DELETE FROM user_item WHERE userid = $1 AND item_id = $2 RETURNING *", [userid, itemid]);
            res.json(userItem.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}