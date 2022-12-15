const express = require('express');
const fetch = require('node-fetch')
const app = express();
const cors = require('cors');
const sha256 = require('crypto-js/sha256');
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("Welcome to Dungeons and Postman, a game designed to teach about api's\n" 
        + "The first thing to do is to issue a \"POST\" command making a character\n"
        + "To do that make sure the HTTP request is set to POST, and a body is made\n"
        + "The body has to be json, so in the body portion, click on \"raw\" and make sure the \"text\" section is changed to \"json\"\n"
        + "Then in the body portion put: {\"name\":\"your name\"}\n"
        + "Then click Send!"
    );
});

// Creates a new user
app.post('/createuser', async (req, res) => {
    const {username, password} = req.body;
    const response = await fetch('http://backend:3000/users', {
        method: 'post',
        body: JSON.stringify({'userid': username, 'password': sha256(password + "SALT"), 'admin': false}),
        headers: {'Content-Type': 'application/json'}
    })
    const status = await response.status;
    if (status == 200) {
        res.send("You successfully made an account! Please login using /login api now. You can keep the same body, but use the PUT command.");
    }
    else {
        res.send("Someone already has that username! Try a different one");
    }
});

// Login as a user
app.put('/login', async (req, res) => {
    const {username, password, currentCookie} = req.body;
    const response = await fetch(`http://backend:3000/user/${username}`)
    const body = await response.JSON;
    if (currentCookie == body['current_cookie']) {
        res.send("Already signed in!");
    }
    if (sha256(password + "SALT") == body['password']) {
        const cCookie = username;
        await fetch(`http://backend:3000/user/${username}`, {
            mehod: 'put',
            body: JSON.stringify({'currentCookie': cCookie}),
            headers: {'Content-Type': 'application/json'}
        })
        res.cookie('dungeon', username, {expire: 36000 + Date.now()}).send("Signed in");
    }
    else {
        res.status(401).send("Sorry your password was not quite right. Try again.");
    }
});

// Get a list of available dungeons
app.get('/dungeons', async (req, res) => {
    const response = await fetch('http://backend:3000/gamelevel');
    const body = await response.json();
    console.log(body);
    const ret = []
    for (const i in body) {
        ret.push(body[i]['levelname']);
    }
    res.json(ret);
});

// Make a character in a dungeon
app.post('/character', async (req, res) => {

});

// Delete a character
app.delete('/character', async (req, res) => {

});

// Get a list of characters
app.get('/character', async (req, res) => {

});

// Get which room a character is in
app.get('/room', async (req, res) => {

});

// Move a character to a different room
app.put('/move', async (req, res) => {

});

// Have a character pickup an item
app.put('/pickup', async (req, res) => {

});

// Explanation
app.get('/', (req, res) => {

});

app.listen(3001, () => {
    console.log("App is running on port 3001!");
})