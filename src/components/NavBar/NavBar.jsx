import { useAuthState } from '../../context/AuthContext.js';
import { useAuthDispatch } from '../../context/AuthContext.js';
import { useUserProfileImage } from '../../graphql/useUser.js';
import { logout } from '../../context/actions/AuthActions.js';
import './NavBar.css';
import NavbarSearch from './NavbarSearch.jsx';
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {
  Bell,
  Envelope,
  PersonCircle,
  Clipboard2Data,
  CardChecklist,
  Journal,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useAuthDispatch();
  const { id, isAdmin } = useAuthState();
  const isNotAuthenticated = id === '' && isAdmin === '';
  const [show, setShow] = useState(false);

  const { id: userId } = useAuthState();
  const { isFetching, fetchedData, fetchError } = useUserProfileImage({
    userInfoData: { userId },
  });

  console.log("navbar", fetchedData)

  const handleLogout = () => {
    setShow(!show);
    logout(dispatch);
    // navigate('/');
  };

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
                Sign up
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Sign in
              </Nav.Link>
            </Nav>
          ) : (
            <>
              {!isAdmin ? (
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
                      <Envelope size={28} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="Notification">
                      <Bell size={28} />
                    </Nav.Link>
                    <Nav.Item>
                      <div>
                        <PersonCircle
                          size={28}
                          onClick={() => setShow(!show)}
                          id="avtar-nav-bar"
                        />

                        <div className="popover-avatar">
                          {show ? (
                            <ul className="popover-avatar-content">
                              <li onClick={() => setShow(!show)}>
                                <Link to={`/profile/${id}`}>Profile</Link>
                              </li>
                              <li onClick={() => setShow(!show)}>
                                <a href="/academy">Academy</a>
                              </li>
                              <li onClick={() => setShow(!show)}>
                                <a href="/leaderBoard">Leader Board</a>
                              </li>
                              <li onClick={() => setShow(!show)}>
                                <a href="/contest">Contest</a>
                              </li>
                              <li onClick={() => setShow(!show)}>
                                <a href="/aboutUs">About us</a>
                              </li>
                              <li onClick={() => setShow(!show)}>
                                <div onClick={() => handleLogout()}>
                                  Log out
                                </div>
                              </li>
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </Nav.Item>
                    <Nav.Link as={Link} to="upload">
                      <button>Upload</button>
                    </Nav.Link>
                  </Nav>
                </>
              ) : (
                <>
                  <NavbarSearch />
                  <Nav>
                    <Nav.Link as={Link} to="courses">
                      <Journal size={28} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="reports">
                      <CardChecklist size={28} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="statistic">
                      <Clipboard2Data size={28} />
                    </Nav.Link>
                    <Nav.Item>
                      <div>
                        <PersonCircle
                          size={29}
                          onClick={() => setShow(!show)}
                        />
                        <div className="popover-avatar">
                          {show ? (
                            <ul className="popover-avatar-content">
                              <li>
                                <a href="/profile">Profile</a>
                              </li>
                              <li>
                                <a href="/courses">Courses</a>
                              </li>
                              <li>
                                <a href="/reports">Reports</a>
                              </li>
                              <li>
                                <a href="/statistic">Statistic</a>
                              </li>
                              <li>
                                <a href="/aboutUs">About Us</a>
                              </li>
                              <li>
                                <div onClick={() => handleLogout()}>
                                  Log out
                                </div>
                              </li>
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </Nav.Item>
                  </Nav>
                </>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
