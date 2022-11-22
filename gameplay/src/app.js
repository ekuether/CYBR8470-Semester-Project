const express = require('express');
const fetch = require('node-fetch')
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/start', (req,res) => {
    res.send("Welcome to Dungeons and Postman, a game designed to teach about api's\n" 
        + "The first thing to do is to issue a \"POST\" command making a character\n"
        + "To do that make sure the HTTP request is set to POST, and a body is made\n"
        + "The body has to be json, so in the body portion, click on \"raw\" and make sure the \"text\" section is changed to \"json\"\n"
        + "Then in the body portion put: {\"name\":\"your name\"}\n"
        + "Then click Send!"
    );
});

app.post("/start", (req, res) => {
    
})

app.listen(3001, () => {
    console.log("App is running on port 3001!");
})