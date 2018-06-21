var mongoose = require("../index.js").mongoose;

var eventSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, "events need a date"]
  },
  startTime: {
    type: String,
    required: [true, "events need a start time"]
  },
  endTime: {
    type: String,
    required: [true, "events need a start time"]
  },
  description: {
    type: String,
    required: [true, "events need a description"]
  }
});

var Event = mongoose.model("Event", eventSchema);

var getAll = () => {
  return Event.find({}).exec();
};

var createOne = body => {
  return Event.create(body);
};

var update = (id, body) => {
  return findById(id).then(doc => {
    doc.set(body);
    return doc.save();
  });
};

var deleteOne = id => {
  return findById(id).then(doc => {
    return doc.remove();
  });
};

var findById = id => {
  return Event.findById(id).exec();
};

module.exports = { getAll, createOne, update, deleteOne };
