import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Bell, Envelope, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <Navbar variant="dark" bg="">
      <Container className='navbar-items'>
        <Navbar.Brand href="/login">FLENS</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search Flens"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Nav >
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
          <Nav.Link as={Link} to="/profile" >
            <PersonCircle />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}