import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#app");

export default class EventModifyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.event);
    this.state.event = new Date(this.state.event);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({ event }) {
    this.setState(prevState => {
      event.date = new Date(event.date);
      return Object.assign(prevState, event);
    });
  }

  handleInputChange(field, value) {
    if (field === "date") {
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
      this.props.updateEvent(Object.assign(this.props.event, this.state));
    }
  }

  render() {
    var { showModal, handleCloseModal, deleteEvent, event } = this.props;
    var { startTime, endTime, description, date } = this.state;
    return (
      <ReactModal
        isOpen={showModal}
        contentLabel="Event Creation Modal"
        className="modal"
      >
        <h3> Edit Event </h3>
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
        <div>
          Day
          <input
            type="date"
            value={
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              date
                .getDate()
                .toString()
                .padStart(2, "0")
            }
            onChange={e => this.handleInputChange("date", e.target.value)}
          />
        </div>
        <textarea
          value={description}
          onChange={e => this.handleInputChange("description", e.target.value)}
        />
        <div>
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={() => deleteEvent(event)}>Delete</button>
          <button onClick={this.handleSubmit}>Update</button>
        </div>
      </ReactModal>
    );
  }
}
