import { useAuthState } from '../../context/AuthContext.js';
import LogOutButton from './LogOutButton.jsx';
import './NavBar.css';
import NavbarSearch from './NavbarSearch.jsx';
import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, Envelope, PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { userDetails, token } = useAuthState();
  const isNotAuthenticated = userDetails === '' && token === '';

  return (
    <Navbar expand="md">
      <Container className="navbar-items">
        {isNotAuthenticated ? (
          <Navbar.Brand href="/explore" bg="light">
            FLENS
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/" bg="light">
            FLENS
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {isNotAuthenticated ? (
            <Nav>
              <Nav.Link as={Link} to="/explore">
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Sign in
              </Nav.Link>
            </Nav>
          ) : (
            <>
              <NavbarSearch />

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
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
