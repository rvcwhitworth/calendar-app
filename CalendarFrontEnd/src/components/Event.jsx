import React from "react";

var Event = ({ event, handleClick }) => (
  <div
    className="event"
    onClick={e => {
      e.stopPropagation();
      handleClick(event);
    }}
    title="Click to update or delete event"
  >
    <div className="event-content">
      <div>{event.startTime + " - " + event.endTime}</div>
      <div>{event.description}</div>
    </div>
  </div>
);

export default Event;
