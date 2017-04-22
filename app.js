var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/json"
}));


var reservation = [];


app.get("/index", function (req, res) {
    res.sendfile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendfile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendfile(path.join(__dirname, "tables.html"));
});

app.get("/api/:type?", function (req, res) {
    var type = req.params.type;

    if (type === "tables") {
        console.log(type);

        for (var i = 0;
            (i < 5 && i < reservation.length); i++) {
            return res.json(reservation[i]);
        }

    } else if (type === "waitlist") {
        for (i = 5; i < reservation.length; i++) {
            return res.json(reservation[i]);
        }
    } else {
        console.log(type);
        return res.json(reservation);
    }

});

app.post("/api/new", function (req, res) {
    var newReservation = req.body;


    reservation.push(newReservation);
    res.json(reservation.length);

});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});