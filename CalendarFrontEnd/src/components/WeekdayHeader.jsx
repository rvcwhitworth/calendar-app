import React from "react";

export var DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var WeekdayHeader = () => (
  <div className="week-header">
    {DAYS.map((day, i) => (
      <div className="weekday" key={"weekday " + day}>
        {day}
      </div>
    ))}
  </div>
);

export default WeekdayHeader;
