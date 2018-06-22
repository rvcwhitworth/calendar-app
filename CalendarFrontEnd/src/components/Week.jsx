import React from "react";
import Day from "./Day.jsx";
import WeekdayHeader from "./WeekdayHeader.jsx";

var oneDay = 1000 * 60 * 60 * 24;

var Week = ({
  weekStart,
  events,
  handleDayClick,
  handleEventClick,
  handleWeekChange
}) => {
  var days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(weekStart.getTime() + oneDay * i));
  }
  return (
    <div className="week-wrapper">
      <WeekHeader handleClick={handleWeekChange} weekStart={weekStart} />
      <WeekdayHeader />
      <div className="week">
        {days.map((day, i) => (
          <Day
            day={day.getDate()}
            key={"week-day " + i}
            handleClick={handleDayClick}
            handleEventClick={handleEventClick}
            events={
              events[day.getFullYear()] === undefined
                ? []
                : events[day.getFullYear()][day.getMonth()][day.getDate()]
            }
          />
        ))}
      </div>
    </div>
  );
};

var WeekHeader = ({ handleClick, weekStart }) => (
  <div className="week-view-header">
    <button onClick={() => handleClick(-1)} className="week-button">
      Prev
    </button>
    <h2>
      {weekStart.toDateString() +
        " - " +
        new Date(weekStart.getTime() + oneDay * 6).toDateString()}
    </h2>
    <button onClick={() => handleClick(1)} className="week-button">
      Next
    </button>
  </div>
);

export default Week;
