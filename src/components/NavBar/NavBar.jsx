import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, Envelope, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch.jsx';
import LogOutButton from './LogOutButton.jsx';
import './NavBar.css';
import { useAuthState } from '../../context/AuthContext.js';

const NavBar = () => {
  const { userDetails, token } = useAuthState();

  return (
    <Navbar expand="md">
      <Container className="navbar-items">
        <Navbar.Brand href="/" bg="light">
          FLENS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <NavbarSearch />

          {userDetails === '' && token === '' ? (
            <Nav>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Log in
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/explore">
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

              <LogOutButton />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
