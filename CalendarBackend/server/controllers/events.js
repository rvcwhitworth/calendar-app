var Event = require("../../db/models/event.js");

var getAllEvents = (req, res) => {
  Event.getAll()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.error("Error retrieving all events from db", err);
      res.sendStatus(501);
    });
};

var createEvent = ({ body }, res) => {
  Event.createOne(body)
    .then(doc => {
      res.status(201).json(doc);
    })
    .catch(err => {
      console.error("Error creating new event", body, err);
      res.sendStatus(501);
    });
};

var updateEvent = ({ body, params }, res) => {
  Event.update(params.id, body)
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.error("Error updating event", id, body, err);
      res.sendStatus(501);
    });
};

var deleteEvent = ({ params }, res) => {
  Event.deleteOne(params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error("Error deleting resource with id", params.id, err);
      res.status(501);
    });
};

var badRequest = (req, res) => {
  res.sendStatus(400);
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  badRequest
};
