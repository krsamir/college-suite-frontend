import React, { Component } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { URL } from "../../Constants";
class AttendanceModule extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      time: new Date().toLocaleTimeString(),
      userDetail: {
        contact: "",
        department: "",
        name: "",
        regd_no: "",
        year_of_joining: "",
        current_semester: "",
        section: "",
      },
    };
  }
  //This happens when the component mount and the setInterval function get called with a call back function updateClock()
  componentDidMount() {
    axios
      .get(`${URL}/api/getStudent`)
      .then((res) => {
        this.setState({ userDetail: res.data[0] });
      })
      .catch((e) => console.log(e));
    this.intervalID = setInterval(() => this.updateClock(), 1000);
  }

  //This section clears setInterval by calling intervalID so as to optimise memory
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  //This function set the state of the time to a new time
  updateClock() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleSave = () => {
    // this.handleClose();
    const { name, regd_no, department, section } = this.state.userDetail;
    const { time } = this.state;
    const date = new Date().toLocaleDateString("en-GB");
    const uniqueId = `${date}-${regd_no}`;
    const data = { name, regd_no, department, section, time, date, uniqueId };
    axios
      .post(`${URL}/api/attendance`, data)
      .then((res) => {
        if (res.data.status === "duplicate") {
          alert("You have already marked attendance once !!");
        } else if (res.data.status === "punched") {
          alert("Attendance Marked Successfully !!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const { show, time, userDetail } = this.state;
    const { handleShow, handleClose, handleSave } = this;
    const { name, regd_no, department, section } = userDetail;
    return (
      <>
        <div variant="primary" onClick={handleShow}>
          Mark Attendance
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mark Your Attendance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Alert
                variant="success"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span>Name : {name}</span>
                <span>Registration No. : {regd_no}</span>
                <span>
                  Department : {department}
                  {"-"}
                  {section}
                </span>
              </Alert>
              <Alert variant="dark">
                {" "}
                Mark attendance at <span style={{ color: "red" }}>{time}</span>
              </Alert>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Mark Attendance
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AttendanceModule;
