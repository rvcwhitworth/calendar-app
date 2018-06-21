import React from "react";
import ReactDOM from "react-dom";
import Month from "./components/Month.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      currentMonth: today.getMonth(),
      currentDay: today.getDay()
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <Month />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
