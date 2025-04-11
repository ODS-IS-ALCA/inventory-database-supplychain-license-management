const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(8000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function (req, res) {
    res.status(200).send("Hello World");
})

app.post("/tradeOperators", function (req, res) {
    const data = req.body;
    console.log('Received data:', data);

    res.status(200).send(
        [
            "b1234567-1234-1234-1234-111111111111",
            "b1234567-1234-1234-1234-222222222222",
            "b1234567-1234-1234-1234-333333333333",
            "b1234567-1234-1234-1234-444444444444",
            "b1234567-1234-1234-1234-555555555555",
            "b1234567-1234-1234-1234-666666666666",
            "b1234567-1234-1234-1234-777777777777",
            "b1234567-1234-1234-1234-888888888888",
            "b1234567-1234-1234-1234-999999999999"
        ]
    );
})