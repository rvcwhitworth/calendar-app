import React from "react";
import ReactDOM from "react-dom";
import Week from "./components/Week.jsx";
import Month from "./components/Month.jsx";
import EventCreateModal from "./components/EventCreateModal.jsx";
import EventModifyModal from "./components/EventModifyModal.jsx";
import DayView from "./components/DayView.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      currentMonth: today.getMonth(),
      currentDay: today.getDate(),
      currentYear: today.getFullYear(),
      currentView: "month",
      monthlyEvents: {},
      loading: true,
      showCreateModal: false,
      showModifyModal: false,
      currentEvent: {
        startTime: "00:00",
        endTime: "00:00",
        description: "dummy data",
        date: today
      },
      weekStart: new Date(today - today.getDay())
    };

    this.changeMonth = this.changeMonth.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.openModifyModal = this.openModifyModal.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
  }

  componentDidMount() {
    this.loadEvents();
  }

  openModifyModal(event) {
    this.setState({
      currentEvent: event,
      showModifyModal: true
    });
  }

  openCreateModal(selectedDay) {
    this.setState(prevState => {
      prevState.currentDay = selectedDay;
      prevState.showCreateModal = true;
      return prevState;
    });
  }

  createEvent(event) {
    if (event.date.getTime() >= event.endDate.getTime()) {
      axios.post("/events", event).then(() => {
        this.loadEvents();
        this.closeModal();
      });
    } else {
      var oneDay = 1000 * 60 * 60 * 24;
      var startDate = event.date.getTime();
      var endDate = event.endDate.getTime();
      var postRequests = [];
      while (startDate < endDate) {
        postRequests.push(axios.post("/events", Object.assign({}, event)));
        event.date = new Date(event.date.getTime() + oneDay);
        startDate += oneDay;
      }
      Promise.all(postRequests).then(() => {
        this.loadEvents();
        this.closeModal();
      });
    }
  }

  changeMonth(monthDelta, leaveDay = false) {
    this.setState(prevState => {
      prevState.currentMonth += monthDelta;
      if (!leaveDay) {
        prevState.currentDay = 1;
      }
      if (prevState.currentMonth < 0) {
        prevState.currentYear--;
        prevState.currentMonth = 11;
      } else if (prevState.currentMonth > 11) {
        prevState.currentYear++;
        prevState.currentMonth = 0;
      }
      return prevState;
    });
  }

  changeWeek(weekDelta) {
    var oneWeek = 1000 * 60 * 60 * 24 * 7;
    this.setState(prevState => {
      prevState.weekStart = new Date(
        prevState.weekStart.getTime() + weekDelta * oneWeek
      );
      return prevState;
    });
  }

  changeDay(dayDelta) {
    this.setState(prevState => {
      prevState.currentDay += dayDelta;
      return prevState;
    });
  }

  updateEvent(event) {
    axios
      .put("/events/" + event._id, event)
      .then(() => {
        this.loadEvents();
        this.closeModal();
      })
      .catch(err => {
        console.error("Error updating event", err);
        alert("Error updating event, try again later.");
      });
  }

  deleteEvent(event) {
    axios
      .delete("/events/" + event._id)
      .then(() => {
        this.loadEvents();
        this.closeModal();
      })
      .catch(err => {
        console.error("Error deleting event", err);
        alert("Error deleting event, try again later.");
      });
  }

  loadEvents() {
    axios
      .get("/events")
      .then(({ data }) => {
        this.setupEvents(data);
      })
      .catch(err => {
        console.error("Error loading events", err);
        alert(
          "Your events could not be loaded correctly, please try reloading the page."
        );
      });
  }

  setupEvents(events) {
    var yearlyEvents = {};
    events.forEach(event => {
      var eventDate = new Date(event.date);

      var monthlyEvents = yearlyEvents[eventDate.getFullYear()];
      if (monthlyEvents === undefined) {
        monthlyEvents = {};
        for (let i = 0; i < 12; i++) {
          monthlyEvents[i] = {};
        }
      }

      var dailyEvents =
        monthlyEvents[eventDate.getMonth()][eventDate.getDate()] || [];
      dailyEvents.push(event);
      monthlyEvents[eventDate.getMonth()][eventDate.getDate()] = dailyEvents;
      yearlyEvents[eventDate.getFullYear()] = monthlyEvents;
    });

    this.setState(prevState => {
      prevState.yearlyEvents = yearlyEvents;
      prevState.loading = false;
      return prevState;
    });
  }

  closeModal() {
    this.setState({
      showCreateModal: false,
      showModifyModal: false
    });
  }

  handleViewChange(e) {
    this.setState({
      currentView: e.target.value
    });
  }

  render() {
    var {
      currentMonth,
      currentDay,
      currentView,
      currentYear,
      yearlyEvents,
      loading,
      showModifyModal,
      showCreateModal,
      currentEvent,
      weekStart
    } = this.state;
    var date = new Date(currentYear, currentMonth, currentDay);

    if (loading) {
      return <h1>Loading, please wait...</h1>;
    }

    return (
      <div>
        <select value={currentView} onChange={this.handleViewChange}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        {currentView === "month" ? (
          <Month
            currentMonth={currentMonth}
            currentDay={currentDay}
            currentYear={currentYear}
            dailyEvents={
              yearlyEvents[currentYear] === undefined
                ? {}
                : yearlyEvents[currentYear][currentMonth]
            }
            handleMonthChange={this.changeMonth}
            handleDayClick={this.openCreateModal}
            handleEventClick={this.openModifyModal}
          />
        ) : currentView === "week" ? (
          <Week
            weekStart={weekStart}
            handleWeekChange={this.changeWeek}
            events={yearlyEvents}
          />
        ) : (
          <DayView
            date={date}
            events={
              yearlyEvents[currentYear] === undefined
                ? []
                : yearlyEvents[currentYear][currentMonth][currentDay]
            }
            handleDayClick={this.openCreateModal}
            handleEventClick={this.openModifyModal}
            handleDayChange={this.changeDay}
          />
        )}
        <EventCreateModal
          handleCloseModal={this.closeModal}
          showModal={showCreateModal}
          createEvent={this.createEvent}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
        <EventModifyModal
          handleCloseModal={this.closeModal}
          showModal={showModifyModal}
          event={currentEvent}
          updateEvent={this.updateEvent}
          deleteEvent={this.deleteEvent}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
