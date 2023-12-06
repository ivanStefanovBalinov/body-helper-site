"use client";
import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
const Header = () => {
  const LogoutHandler = () => {
    alert("logout");
  };
  const navItems = [
    { path: "/", title: "Home" },
    { path: "/recipes", title: "Recipes" },
    { path: "/foodcalculator", title: "Food Calculator" },
    { path: "/blog", title: "Blog" },
    { path: "/about", title: "About Us" },
  ];
  const userInfo = false;
  return (
    <header style={{ marginBottom: "50px" }}>
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Body-Helper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navItems.map((item) => (
                <Link className="nav-items" href={item.path} key={item.path}>
                  {item.title}
                </Link>
              ))}
              {userInfo ? (
                <NavDropdown>
                  <NavDropdown.Item>Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={LogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="nav-items" href="/login">
                  <FaUser />
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
