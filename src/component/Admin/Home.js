import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "./NavBar";
import axios from "axios";
import "./Home.css";
import { URL } from "../../Constants";
import notice__icon from "../../Resources/Icons/notice.png";
import department__icon from "../../Resources/Icons/Department.png";
import position__icon from "../../Resources/Icons/Position.png";
import Semester from "../../Resources/Icons/Semester.png";
import TotalSubjects from "../../Resources/Icons/Subjects.png";
import Student from "../../Resources/Icons/student.png";
import hod from "../../Resources/Icons/hod.png";
import teacher from "../../Resources/Icons/teacher.png";
import books from "../../Resources/Icons/book.png";
import DashboardCard from "./DashboardCard";
export default function Home1(props) {
  const [data, setData] = useState({
    total_notices: "",
    total_dept: "",
    total_position: "",
    total_student: "",
    active_subjects: "",
    total_subjects: "",
    semester: "",
    total_teacher: "",
    total_hod: "",
  });
  useEffect(() => {
    axios
      .get(`${URL}/api/getDashboard`)
      .then((res) => {
        // console.log(res.data);
        setData({
          total_notices: res.data[0][0].total_notices,
          total_dept: res.data[1][0].total_dept,
          total_position: res.data[2][0].total_position,
          total_student: res.data[3][0].total_student,
          active_subjects: res.data[4][0].active_subjects,
          total_subjects: res.data[5][0].total_subjects,
          semester: res.data[6][0].semester,
          total_teacher: res.data[7][0].total_teacher,
          total_hod: res.data[8][0].total_hod,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const {
    active_subjects,
    semester,
    total_dept,
    total_hod,
    total_notices,
    total_position,
    total_student,
    total_subjects,
    total_teacher,
  } = data;
  return (
    <div className="bodyDiv">
      {/* <header>Something Here</header> */}
      <NavBar {...props} />
      <section>
        <nav>
          <Card>
            <ListGroup variant="flush">
              <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Latest Notice</ListGroup.Item>
              </LinkContainer>
              <LinkContainer to="/create-notice" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Create & Edit Notices</ListGroup.Item>
              </LinkContainer>
              <LinkContainer to="/teacher" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Manage Teachers</ListGroup.Item>
              </LinkContainer>
              <LinkContainer
                to="/department-position"
                style={{ cursor: "pointer" }}
              >
                <ListGroup.Item>
                  Manage Department, Position & section
                </ListGroup.Item>
              </LinkContainer>
              <LinkContainer to="/manage-subject" style={{ cursor: "pointer" }}>
                <ListGroup.Item>Manage Subjects and Semester</ListGroup.Item>
              </LinkContainer>
            </ListGroup>
          </Card>
        </nav>

        <article>
          <h2>Welcome to Admin Dash Board</h2>
          <div className="Cards__Component">
            <DashboardCard
              redirectionLink="/create-notice"
              image={notice__icon}
              title="Total Notices"
              body={total_notices}
            />
            <DashboardCard
              redirectionLink="/department-position"
              image={department__icon}
              title="Departments"
              body={total_dept}
            />
            <DashboardCard
              redirectionLink="/department-position"
              image={position__icon}
              title="Positions"
              body={total_position}
            />
            <DashboardCard
              redirectionLink="/teacher"
              image={teacher}
              title="Total Teachers"
              body={total_teacher}
            />
            <DashboardCard
              redirectionLink="/teacher"
              image={hod}
              title="HOD"
              body={total_hod}
            />
            <DashboardCard
              redirectionLink="/manage-subject"
              image={TotalSubjects}
              title="Total Subject"
              body={total_subjects}
            />{" "}
            <DashboardCard
              redirectionLink="/manage-subject"
              image={books}
              title="Active Subject"
              body={active_subjects}
            />
            <DashboardCard
              redirectionLink="/"
              image={Student}
              title="Total Student"
              body={total_student}
            />
            <DashboardCard
              redirectionLink="/manage-subject"
              image={Semester}
              title="Semester"
              body={semester}
            />
          </div>
        </article>
      </section>

      <footer>
        <p>{"\u00A9"}Samir</p>
      </footer>
    </div>
  );
}
