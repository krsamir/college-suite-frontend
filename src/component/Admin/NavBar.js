import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { removeToken } from "../../Redux/Actions/TokenAction";
import { adminSummary } from "../../Redux/Actions/UserAction";
function NavBar(props) {
  const handleLogout = () => {
    props.removeToken();
    window.location.reload();
  };
  return (
    <div style={{ width: "100%" }}>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>College-Suite</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Admin Home</Nav.Link>
          </Nav>
          <NavDropdown title="options" id="basic-nav-dropdown" className="mr-5">
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  adminDetails: state.user.data[0],
});
export default connect(mapStateToProps, { removeToken, adminSummary })(NavBar);
