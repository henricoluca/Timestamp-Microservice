require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const absolutePath = __dirname + "/views/index.html"

app.get("/", (req, res) => res.sendFile(absolutePath));

app.get("/api/:date?", (req, res, next) => {
    let dateParam = req.params.date;
    let date;


    if (/^\d+$/.test(dateParam)) {
        date = new Date(parseInt(dateParam));
    } else {
        date = new Date(dateParam);
    }

    if (date.toString() === "Invalid Date") {
        return res.json({error: "Invalid Date"});
    }

    res.json({unix: date.getTime(), utc: date.toUTCString()});
})



const listener = app.listen(PORT, function () {
    console.log("Node.js listening on port " + listener.address().port);
  });