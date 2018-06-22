import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app");

export default class EventCreateModal extends React.Component {
  constructor(props) {
    super(props);
    var { currentYear, currentMonth, currentDay } = this.props;
    this.state = {
      startTime: "00:00",
      endTime: "00:00",
      description: "",
      endDate: new Date(currentYear, currentMonth, currentDay),
      date: new Date(currentYear, currentMonth, currentDay)
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({ currentYear, currentMonth, currentDay }) {
    this.setState(prevState => {
      prevState.date = new Date(currentYear, currentMonth, currentDay);
      prevState.endDate = new Date(currentYear, currentMonth, currentDay);
      return prevState;
    });
  }

  handleInputChange(field, value) {
    if (field === "endDate") {
      var date = value.split("-");
      date[2] = (parseInt(date[2]) + 1).toString().padStart(2, "0");
      value = new Date(date.join("-"));
    }
    this.setState(prevState => {
      prevState[field] = value;
      return prevState;
    });
  }

  handleSubmit() {
    if (!this.state.description.length) {
      alert("Description is required.");
    } else {
      this.props.createEvent(this.state);
    }
  }

  render() {
    var { showModal, handleCloseModal } = this.props;
    var { date, startTime, endTime, endDate } = this.state;

    return (
      <ReactModal
        isOpen={showModal}
        contentLabel="Event Creation Modal"
        className="modal"
      >
        <h3> Create Event </h3>
        <div>
          Start Time
          <input
            type="time"
            value={startTime}
            onChange={e => this.handleInputChange("startTime", e.target.value)}
          />
        </div>
        <div>
          End Time
          <input
            type="time"
            value={endTime}
            onChange={e => this.handleInputChange("endTime", e.target.value)}
          />
        </div>
        <div>Start Day: {date.toLocaleDateString()}</div>
        <div>
          End Day
          <input
            type="date"
            value={
              endDate.getFullYear() +
              "-" +
              (endDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              endDate
                .getDate()
                .toString()
                .padStart(2, "0")
            }
            onChange={e => this.handleInputChange("endDate", e.target.value)}
          />
        </div>
        <textarea
          placeholder="Describe your event"
          onChange={e => this.handleInputChange("description", e.target.value)}
        />
        <div>
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={this.handleSubmit}>Add Event</button>
        </div>
      </ReactModal>
    );
  }
}
