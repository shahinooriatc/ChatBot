import React, { Component } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import logo from "../../Assets/Images/logo.png";
import LogOut from "../../Auth/LogOut/LogOut";
class NavSection extends Component {
  render() {
    return (
      <>
        <Navbar bg="success" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                style={{ width: "50px" }}
                src={logo}
                alt=""
                title="Talk Bot"
              />
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/chatboard">Live Chat</Nav.Link>
              <Nav.Link>
                <Dropdown>
                  <Dropdown.Toggle variant="success"></Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item active>Logged Email</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Private Chat</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={this.handleChange}>
                      {<LogOut />}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavSection;
