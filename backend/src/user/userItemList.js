const pool = require("../db");

module.exports = (app) => {
    app.get('user/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const useritems = pool.query("SELECT * FROM user_item WHERE userid = $1", [id]);
            res.json(useritems.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('user/:id/items', (req, res) => {
        try {
            const id = req.params.id;
            const {item} = req.body;
            const newItem = pool.query("INSERT INTO userlevels(userid, item_id) VALUES($1, $2) RETURNING *", [id, item]);
            res.json(newItem.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};