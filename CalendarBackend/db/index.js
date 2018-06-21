var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var connect = () =>
  mongoose.connect(
    `mongodb://${process.env.MONGO_USERNAME || "guest"}:${process.env
      .MONGO_PASSWORD || "guest0"}@ds263590.mlab.com:63590/calendar`,
    {
      useMongoClient: true
    }
  );

var db = mongoose.connection;

db.on("error", err => {
  console.error("mongoose connection error", err);
});

db.once("open", () => {
  console.log("mongoose connected successfully");
});

module.exports = { connect, mongoose };
