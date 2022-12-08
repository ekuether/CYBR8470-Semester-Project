const pool = require("./db");

module.exports = (app) => {
    app.post("/createUser", async (req, res) => {
        const {username, password} = req.body;
        const searchUser = await pool.query("SELECT * FROM userinfo WHERE userid=$1", [username]);
        if (searchUser.rowCount != 0) {
            await pool.query("INSERT INTO audit_log(audit_date_time, userid, ip_address, audit_message) VALUES(now(), $1, $2, $3)", [username, req.ip, 'Successful creation of user'])
            res.status(401).send("User Exists");
        }
        else {
            await pool.query("INSERT INTO audit_log(audit_date_time, username, ip_address, audit_message) VALUES(now(), $1, $2, $3)", [username, req.ip, 'Attempted Creation of Account. Username Taken'])
            const newUser = await pool.query("INSERT INTO userinfo(userid, password) VALUES($1, $2)", [username, password]);
            res.status(200).send("User Created");
        }
    });
}