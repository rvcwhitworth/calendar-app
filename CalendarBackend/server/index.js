var express = require("express");
var bodyParser = require("body-parser");
var dbConnect = require("../db/index.js").connect;
var controller = require("./controllers/events.js");
var app = express();
const APP_PORT = process.env.PORT || 3000;

dbConnect();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../CalendarFrontEnd/dist"));

app.get("/events", controller.getAllEvents);
app.post("/events", controller.createEvent);
app.put("/events/:id", controller.updateEvent);
app.delete("/events/:id", controller.deleteEvent);
app.all("*", controller.badRequest);

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});
