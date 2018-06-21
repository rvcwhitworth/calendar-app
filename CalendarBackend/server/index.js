var express = require("express");
var bodyParser = require("body-parser");
var items = require("../database-mongo");

var app = express();
const APP_PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/items", function(req, res) {
  items.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});
