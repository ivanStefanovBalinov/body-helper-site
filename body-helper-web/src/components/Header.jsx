"use client";
import React from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const { data: session, status } = useSession();
  const path = usePathname();

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/recipes", title: "Recipes" },
    { path: "/nutrientcalculator", title: "Nutrient Calculator" },
    { path: "/blog", title: "Blog" },
    { path: "/about", title: "About Us" },
  ];

  return (
    <header style={{ marginBottom: "50px" }}>
      <Navbar bg="dark" fixed="top" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Body-Helper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navItems.map((item) => (
                <Link
                  className={
                    path.startsWith(item.path) && item.path !== "/"
                      ? "active nav-items"
                      : "nav-items"
                  }
                  href={item.path}
                  key={item.path}>
                  {item.title}
                </Link>
              ))}
              {status === "authenticated" && session ? (
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <div className="user-avatar-wrapper">
                        <img
                          src={session.user.image}
                          alt={`session.user.name`}
                          className="user-avatar"
                        />
                      </div>
                      <p>Hi, {session.user.name}</p>
                    </div>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Link href="/profile">Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link href="/" onClick={() => signOut()}>
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Sign In
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="dark"
                        onClick={() => signIn()}
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}>
                        <FaUser />
                        Sign In
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Link href="/profile/createprofile">Create Account</Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              {status === "authenticated" && session.user.isAdmin && (
                <Link className="nav-items" href="/admin">
                  Admin Panel
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
