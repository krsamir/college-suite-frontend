import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, NavDropdown, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { removeToken } from "../../Redux/Actions/TokenAction";
import { URL } from "../../Constants";
const Home = (props) => {
  const [teacherData, setTeacherData] = useState({
    employee_id: "",
    department: "",
    ishod: "",
    name: "",
    position: "",
  });
  useEffect(() => {
    axios
      .get(`${URL}/api/getParticularTeacher`)
      .then((response) => setTeacherData(response.data[0]))
      .catch((e) => console.log(e));
  }, []);
  const handleLogout = () => {
    props.removeToken();
    window.location.reload();
  };
  return (
    <>
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
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Latest Notice</ListGroup.Item>
          </LinkContainer>
          {teacherData.ishod === 1 ? (
            <LinkContainer to="/Subject" style={{ cursor: "pointer" }}>
              <ListGroup.Item>Manage Subjects</ListGroup.Item>
            </LinkContainer>
          ) : null}
          <LinkContainer to="/assignment-masters" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Manage Assignments</ListGroup.Item>
          </LinkContainer>
          <LinkContainer to="/attendance" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Manage Attendance</ListGroup.Item>
          </LinkContainer>
        </ListGroup>
      </Card>
    </>
  );
};
export default connect(null, { removeToken })(Home);
