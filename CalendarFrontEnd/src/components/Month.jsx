import React from "react";
import Day from "./Day.jsx";
import WeekdayHeader from "./WeekdayHeader.jsx";

const CALENDAR_SIZE = 42;
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    var { currentMonth, currentYear } = this.props;
    this.state = {
      month: MONTH_NAMES[currentMonth],
      monthStartDay: getMonthStartDay(currentMonth, currentYear),
      monthLastDate: getLastDate(currentMonth, currentYear)
    };
  }

  componentWillReceiveProps(props) {
    var { currentMonth, currentYear } = props;
    this.setState({
      month: MONTH_NAMES[currentMonth],
      monthStartDay: getMonthStartDay(currentMonth, currentYear),
      monthLastDate: getLastDate(currentMonth, currentYear)
    });
  }

  handleClick(day) {
    this.props.handleClick;
  }

  render() {
    var { month, monthStartDay, monthLastDate } = this.state;
    var {
      dailyEvents,
      handleMonthChange,
      handleDayClick,
      handleEventClick
    } = this.props;
    var calendarRows = (monthStartDay + monthLastDate) / 7;

    return (
      <div className="wrapper">
        <MonthHeader
          handleClick={handleMonthChange}
          month={month}
          year={this.props.currentYear}
        />
        <WeekdayHeader />
        <div
          className={calendarRows > 5 ? "calendar-6-rows" : "calendar-5-rows"}
        >
          {/* Fill leading month days with empty days */}
          {new Array(monthStartDay)
            .fill(0)
            .map((_, i) => (
              <Day empty={true} day={""} key={"leadingDay " + i} />
            ))}

          {new Array(monthLastDate)
            .fill(0)
            .map((_, i) => (
              <Day
                day={i + 1}
                key={"day " + i}
                handleClick={handleDayClick}
                handleEventClick={handleEventClick}
                events={dailyEvents[i + 1] || []}
              />
            ))}

          {/* Fill trailing month days with empty days */}
          {new Array((CALENDAR_SIZE - (monthStartDay + monthLastDate)) % 7)
            .fill(0)
            .map((_, i) => (
              <Day empty={true} day={""} key={"trailingday " + i} />
            ))}
        </div>
      </div>
    );
  }
}

var MonthHeader = ({ handleClick, month, year }) => (
  <div className="month-header">
    <button onClick={() => handleClick(-1)} className="month-button">
      Prev
    </button>
    <h1>{month + " " + year}</h1>
    <button onClick={() => handleClick(1)} className="month-button">
      Next
    </button>
  </div>
);

var getMonthStartDay = (currentMonth, currentYear) => {
  var firstDay = new Date(currentYear, currentMonth, 1);
  return firstDay.getDay();
};

var getLastDate = (currentMonth, currentYear) => {
  var lastDay = new Date(currentYear, currentMonth + 1, 0);
  return lastDay.getDate();
};
