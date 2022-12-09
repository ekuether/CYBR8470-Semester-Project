const pool = require("../db");

module.exports = (app) => {
    app.get('user/:id/obstacles', (req, res) => {
        try {
            const id = req.params.id;
            const userobstacles = pool.query("SELECT * FROM user_obstacle WHERE userid = $1", [id]);
            res.json(userobstacles.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('user/:id/obstacles', (req, res) => {
        try {
            const id = req.params.id;
            const {obstacle} = req.body;
            const newObstacle = pool.query("INSERT INTO user_obstacle(userid, obstacle_id) VALUES($1, $2) RETURNING *", [id, obstacle]);
            res.json(newObstacle.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};