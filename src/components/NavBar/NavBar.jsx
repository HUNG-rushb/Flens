import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Bell, Envelope, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch.jsx';
import './NavBar.css';

export default function NavBar() {
  return (
    <Navbar expand="md">
      <Container className="navbar-items">
        <Navbar.Brand href="/" bg="light">
          FLENS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <NavbarSearch />

          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Explore">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="message">
              <Envelope />
            </Nav.Link>
            <Nav.Link as={Link} to="Notification">
              <Bell />
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <PersonCircle />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
