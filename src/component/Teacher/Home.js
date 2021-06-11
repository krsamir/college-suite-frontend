import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, NavDropdown, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { removeToken } from "../../Redux/Actions/TokenAction";
import { URL } from "../../Constants";
import "../Admin/Home.css";
import DashBoardCard from "../Admin/DashboardCard";
import Student from "../../Resources/Icons/student.png";
import notice__icon from "../../Resources/Icons/notice.png";
import hod from "../../Resources/Icons/hod.png";
import Semester from "../../Resources/Icons/Semester.png";
import department__icon from "../../Resources/Icons/Department.png";
import books from "../../Resources/Icons/book.png";
import TotalSubjects from "../../Resources/Icons/Subjects.png";

const Home = (props) => {
  const [teacherData, setTeacherData] = useState({
    employee_id: "",
    department: "",
    ishod: "",
    name: "",
    position: "",
  });
  const [data, setData] = useState({
    total_student: 0,
    total_notices: 0,
    total_hod: 0,
    semester: `-`,
    total_dept: 0,
    active_subjects: 0,
    total_subjects: 0,
  });
  useEffect(() => {
    const particularTeacher = async () => {
      await axios
        .get(`${URL}/api/getParticularTeacher`)
        .then((response) => setTeacherData(response.data[0]))
        .catch((e) => console.log(e));
    };
    const dashboard = async () => {
      await axios
        .get(`${URL}/api/getTeacherDashboard`)
        .then((res) => {
          setData({
            total_student: res.data[0][0].total_student,
            total_notices: res.data[1][0].total_notices,
            total_hod: res.data[2][0].total_hod,
            semester: res.data[3][0].semester,
            total_dept: res.data[4][0].total_dept,
            active_subjects: res.data[5][0].active_subjects,
            total_subjects: res.data[6][0].total_subjects,
          });
        })
        .catch((e) => console.log(e));
    };
    particularTeacher();
    dashboard();
  }, []);
  const handleLogout = () => {
    props.removeToken();
    window.location.reload();
  };
  const {
    total_student,
    total_notices,
    total_hod,
    semester,
    total_dept,
    active_subjects,
    total_subjects,
  } = data;
  return (
    <div className="bodyDiv">
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>College-Suite</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Teacher Home</Nav.Link>
          </Nav>
          <NavDropdown title="options" id="basic-nav-dropdown" className="mr-5">
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <section>
        <nav>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Latest Notice</ListGroup.Item>
              </LinkContainer>
              <LinkContainer to="/Subject" style={{ cursor: "pointer" }}>
                <ListGroup.Item disabled={teacherData.ishod !== 1}>
                  Manage Subjects
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer
                to="/assignment-masters"
                style={{ cursor: "pointer" }}
              >
                <ListGroup.Item>Manage Assignments</ListGroup.Item>
              </LinkContainer>
              <LinkContainer to="/attendance" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Manage Attendance</ListGroup.Item>
              </LinkContainer>
            </ListGroup>
          </Card>
        </nav>
        <article>
          <h2>Welcome to Teacher Dashboard</h2>
          <div className="Cards__Component">
            <DashBoardCard
              redirectionLink="/attendance"
              image={Student}
              title="Total Students whom I head"
              body={total_student}
            />
            <DashBoardCard
              redirectionLink="/notices"
              image={notice__icon}
              title="Total Notices"
              body={total_notices}
            />
            <DashBoardCard
              redirectionLink="/"
              image={Semester}
              title="Semester"
              body={semester}
            />
            <DashBoardCard
              redirectionLink="/"
              image={department__icon}
              title="Total Department"
              body={total_dept}
            />
            <DashBoardCard
              redirectionLink="/"
              image={books}
              title="Active Subject"
              body={active_subjects}
            />
            <DashBoardCard
              redirectionLink="/"
              image={TotalSubjects}
              title="Total Subject"
              body={total_subjects}
            />
            <DashBoardCard
              redirectionLink="/"
              image={hod}
              title="HOD"
              body={total_hod}
            />
          </div>
        </article>
      </section>
    </div>
  );
};
export default connect(null, { removeToken })(Home);
