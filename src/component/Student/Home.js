import React from "react";
import { Navbar, Nav, NavDropdown, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { removeToken } from "../../Redux/Actions/TokenAction";
import AttendanceModule from "./AttendanceModule";
const Home = (props) => {
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
            <Nav.Link>Student Home</Nav.Link>
          </Nav>
          <NavDropdown title="options" id="basic-nav-dropdown" className="mr-5">
            <NavDropdown.Item>
              <AttendanceModule />
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Latest Notice</ListGroup.Item>
          </LinkContainer>
          <LinkContainer to="/assignments" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Manage Assignments</ListGroup.Item>
          </LinkContainer>
        </ListGroup>
      </Card>
    </>
  );
};

export default connect(null, { removeToken })(Home);
