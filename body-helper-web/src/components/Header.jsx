"use client";
import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
const Header = () => {
  const LogoutHandler = () => {
    alert("logout");
  };
  const userInfo = false;
  return (
    <header style={{ marginBottom: "50px" }}>
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Body-Helper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Recipes</Nav.Link>
              <Nav.Link>Food Calculator</Nav.Link>
              <Nav.Link>Blog</Nav.Link>
              <Nav.Link>About Us</Nav.Link>
              {userInfo ? (
                <NavDropdown>
                  <NavDropdown.Item>Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={LogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <FaUser />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
