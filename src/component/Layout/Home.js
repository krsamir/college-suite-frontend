import React from "react";
import { Navbar, Nav, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
// NavDropdown
const Home = () => {
  return (
    <div className="home">
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>WELCOME TO COLLEGE-SUITE</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
          {/* <NavDropdown title="options" id="basic-nav-dropdown" className="mr-5">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Some Action</NavDropdown.Item>
          </NavDropdown> */}
        </Navbar.Collapse>
      </Navbar>
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Latest Notice</ListGroup.Item>
          </LinkContainer>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Home;
