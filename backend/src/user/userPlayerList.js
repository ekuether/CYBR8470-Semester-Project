const pool = require("../db");

module.exports = (app) => {
    app.get('user/:id/player', (req, res) => {
        try {
            const id = req.params.id;
            const userplayer = pool.query("SELECT * FROM user_player WHERE userid = $1", [id]);
            res.json(userplayer.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    app.post('user/:id/player', (req, res) => {
        try {
            const id = req.params.id;
            const {player} = req.body;
            const newPlayer = pool.query("INSERT INTO user_player(userid, player_id) VALUES($1, $2) RETURNING *", [id, player]);
            res.json(newPlayer.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};