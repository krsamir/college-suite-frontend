import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { URL } from "../../Constants";
export default class IndividualAttendance extends Component {
  constructor() {
    super();
    this.state = {
      attendanceList: [],
      presentDate: [],
    };
  }
  async componentDidMount() {
    const getAttendanceByTeacher = async () => {
      await axios
        .post(`${URL}/api/getAttendanceByTeacher`, {
          studentid: this.props.match.params.id,
        })
        .then((res) => {
          this.setState({
            attendanceList: res.data,
            presentDate: res.data.map((value) => value.date),
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getAttendanceByTeacher();
  }
  render() {
    const { presentDate } = this.state;
    const date = new Date();
    const dateArray = Array.from({ length: moment().daysInMonth() }).map(
      (value, index) => {
        return {
          date: moment(
            `${date.getFullYear()}-${date.getMonth() + 1}-${index + 1}`,
            "YYYY-MM-DD"
          ).format("YYYY-MM-DD"),
        };
      }
    );
    return (
      <div style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "20px" }}>
          Attendance Register for {this.props.match.params.id}
        </h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span>
                    Date (<strong>YYYY-MM-DD</strong>)
                  </span>
                </div>
              </th>
              <th style={{ display: "flex", justifyContent: "center" }}>
                Marked
              </th>
            </tr>
          </thead>
          <tbody>
            {dateArray.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {val.date}
                    </div>
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    {presentDate.includes(val.date) ? "Present" : "-"}
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
