import React from "react";
import Event from "./Event.jsx";

var Day = ({ day, handleEventClick, handleClick, events = [], empty }) => {
  if (events.length > 1) {
    events.sort(sortByStartTime);
  }

  return (
    <div
      className={empty ? "empty-day" : "day"}
      onClick={empty ? () => {} : () => handleClick(day)}
      title={empty ? "" : "Click to add a new event"}
    >
      <p>{day}</p>
      {events.map(event => (
        <Event handleClick={handleEventClick} event={event} key={event._id} />
      ))}
    </div>
  );
};

var sortByStartTime = (a, b) => {
  return a.startTime > b.startTime;
};

export default Day;
