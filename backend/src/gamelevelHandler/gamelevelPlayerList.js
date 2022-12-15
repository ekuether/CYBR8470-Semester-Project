// GamelevelPlayerList is used to get and make players in a certain level
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets all the player in a certain gamelevel indicated by the id in the URL
    app.get('gamelevel/:id/players', (req, res) => {
        try {
            const id = req.params.id;
            const levelPlayer = pool.query("SELECT * FROM level_player WHERE level_id = $1", [id]);
            res.json(levelPlayer.rows);
        } catch (err) {
            console.log(err.message);
        }
    });

    // POST
    // Creates a new player in the gamelevel indicated by the id in the URL
    app.post('gamelevel/:id/players', (req, res) => {
        try {
            const id = req.params.id;
            const {player} = req.body;
            const newLevelPlayer = pool.query("INSERT INTO level_player(level_id, player_id) VALUES($1, $2) RETURNING *", [id, player]);
            res.json(newLevelPlayer.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    });
};