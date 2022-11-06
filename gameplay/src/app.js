const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());



app.listen(3001, () => {
    console.log("App is running on port 3001!");
})