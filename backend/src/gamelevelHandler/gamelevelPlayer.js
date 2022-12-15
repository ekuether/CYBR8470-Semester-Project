// GamelevelPlayer is used to get what players are in what level
const pool = require("../db");

module.exports = (app) => {
    // GET
    // Gets a certain player bases on the pid in the url in a certain gamelevel based on the gid in the url
    app.get('/gamelevel/:gid/players/:pid', (req, res) => {
        try {
            const gamelevelid = req.params.gid;
            const playerid = req.params.pid;
            const gamelevelPlayers = pool.query("SELECT * FROM level_player WHERE level_id = $1 AND player_id = $2", [gamelevelid, playerid]);
            res.json(gamelevelPlayers.rows[0])
        } catch (err) {
            console.log(err.message);
        }
    });

    // DELETE
    // Removes a player from a gamelevel based on the gid for the gamelevel and pid for the player in the url
    app.delete('/gamelevel/:gid/players/:pid', (req, res) => {
        try {
            const gamelevelid = req.params.gid;
            const playerid = req.params.pid;
            const levelPlayers = pool.query("DELETE FROM level_player WHERE level_id = $1 AND player_id = $2 RETURNING *", [gamelevelid, playerid]);
            res.json(levelPlayers.rows);
        } catch (err) {
            console.log(err.message);
        }
    });
}