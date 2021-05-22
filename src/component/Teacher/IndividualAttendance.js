import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../Constants";
export default class IndividualAttendance extends Component {
  constructor() {
    super();
    this.state = {
      attendanceList: [],
    };
  }
  async componentDidMount() {
    const getAttendanceByTeacher = async () => {
      await axios
        .post(`${URL}/api/getAttendanceByTeacher`, {
          studentid: this.props.match.params.id,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ attendanceList: res.data });
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getAttendanceByTeacher();
  }
  render() {
    // const { props } = this;
    return <div>Hello</div>;
  }
}
