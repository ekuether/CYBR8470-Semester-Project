var express = require('express');
var app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//     res.
// })

require('./createNewUser')(app);
require('./login')(app);


app.listen(3000, function() {
    console.log('Example app listensing')
})