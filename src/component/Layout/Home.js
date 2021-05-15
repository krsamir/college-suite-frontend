import React from "react";
import { Navbar, Nav, Card, ListGroup, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./HomeLayout.css";
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
      <div>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={12} md={3} className="leftPane">
            <Card>
              <ListGroup variant="flush">
                <LinkContainer to="/notices" style={{ cursor: "pointer" }}>
                  <ListGroup.Item>Latest Notice</ListGroup.Item>
                </LinkContainer>
              </ListGroup>
            </Card>
          </Col>
          <Col xs={6} md={9}>
            <div className="box">
              <img
                className="iterImage"
                src={
                  "https://images.squarespace-cdn.com/content/v1/57713a8e2994cae381dd86fe/1543925384526-GNBBO11VDMAKDWGOTDEJ/ke17ZwdGBToddI8pDm48kKqO9yY8Sg_C2idoZ0Ama9wUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcynUbF52ThmzgUF93Xs0uQnDd5gZTz1wVPFEnCC6mUNyt-HHUFHb_20rlDGoSbEme/1-5.jpg?format=2500w"
                }
                alt=""
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
