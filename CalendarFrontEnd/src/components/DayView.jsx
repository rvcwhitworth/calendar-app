import React from "react";
import Day from "./Day.jsx";

var DayView = ({
  handleDayChange,
  date,
  events,
  handleDayClick,
  handleEventClick
}) => (
  <div className="day-wrapper">
    <DayHeader date={date} handleClick={handleDayChange} />
    <Day
      day={date.getDate()}
      handleClick={handleDayClick}
      handleEventClick={handleEventClick}
      events={events}
    />
  </div>
);

var DayHeader = ({ date, handleClick }) => (
  <div className="day-view-header">
    <button onClick={() => handleClick(-1)} className="day-button">
      Prev
    </button>
    <h2>{date.toDateString()}</h2>
    <button onClick={() => handleClick(1)} className="day-button">
      Next
    </button>
  </div>
);
export default DayView;
