const pool = require("./db")


module.exports = (app) => {
    app.get('/login', async (req, res) => {
        console.log("Hello");
        try {
            // Get the username and password
            // Password should already be hashed 
            const { username, password } = req.body;
            const userSearch = await pool.query("SELECT * FROM userinfo WHERE userid=$1 AND password=$2", [username, password]);
            if (userSearch.rowCount != 0) {
                // Successful in calling 
                res.status(200).send("Logged in");
            }
            else {
                // No match found
                res.status(401).send("No Match Found");
            }
        } catch (err) {
            console.log(err.message);
        }
    });
}