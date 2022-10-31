var express = require('../../node_modules/express');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listensing on port 3000!')
})