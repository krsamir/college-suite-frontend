import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { removeToken } from "../../Redux/Actions/TokenAction";
import { adminSummary } from "../../Redux/Actions/UserAction";
const Home = (props) => {
  const { adminSummary } = props;
  useEffect(() => {
    adminSummary();
    // axios
    //   .get("/api/admin")
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, [adminSummary]);

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
            <Nav.Link>Admin Home</Nav.Link>
            <LinkContainer to="/link">
              <Nav.Link>Link</Nav.Link>
            </LinkContainer>
          </Nav>
          <NavDropdown title="options" id="basic-nav-dropdown" className="mr-5">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Card style={{ width: "18rem" }}>
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
            <ListGroup.Item>Manage Department and Position</ListGroup.Item>
          </LinkContainer>
          <LinkContainer to="/manage-subject" style={{ cursor: "pointer" }}>
            <ListGroup.Item>Manage Subjects and Semester</ListGroup.Item>
          </LinkContainer>
        </ListGroup>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => ({
  adminDetails: state.user.data[0],
});
export default connect(mapStateToProps, { removeToken, adminSummary })(Home);
