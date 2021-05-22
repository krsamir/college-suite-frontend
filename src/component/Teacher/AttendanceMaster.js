import React, { Component } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { URL } from "../../Constants";
class AttendanceMaster extends Component {
  constructor() {
    super();
    this.state = {
      fullStudentList: [],
      filteredArray: [],
    };
  }
  async componentDidMount() {
    const fullStudentList = async () => {
      await axios
        .get(`${URL}/api/getStudentList`)
        .then((res) => {
          this.setState({ fullStudentList: res.data, filteredArray: res.data });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fullStudentList();
  }
  handleClick = (value) => {
    const { regd_no } = value;
    this.props.history.push(`/attendance/${regd_no}`);
  };

  render() {
    console.log();
    const { handleClick } = this;
    const { fullStudentList, filteredArray } = this.state;
    return (
      <div style={{ marginTop: "20px" }}>
        <Alert variant="success">List of students whom you head</Alert>
        <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Regd No</th>
              <th>Department</th>
              <th>Section</th>
              <th>Semester</th>
              <th>Redirect to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    const id = fullStudentList.filter((val) =>
                      val.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredArray: id });
                  }}
                  placeholder="Search Name..."
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    const id = fullStudentList.filter((val) =>
                      val.regd_no.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredArray: id });
                  }}
                  placeholder="Search Regd. no...."
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    const id = fullStudentList.filter((val) =>
                      val.department.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredArray: id });
                  }}
                  placeholder="Search Department..."
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    const id = fullStudentList.filter((val) =>
                      val.section.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredArray: id });
                  }}
                  placeholder="Search Section..."
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value;
                    const id = fullStudentList.filter((val) =>
                      String(val.current_semester).includes(value)
                    );
                    this.setState({ filteredArray: id });
                  }}
                  placeholder="Search Semester...."
                  style={{
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td></td>
            </tr>
            {filteredArray.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.regd_no}</td>
                  <td>{value.department}</td>
                  <td>{value.section}</td>
                  <td>{value.current_semester}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick(value)}
                    >
                      <i className="fas fa-arrow-circle-right"></i>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AttendanceMaster;
