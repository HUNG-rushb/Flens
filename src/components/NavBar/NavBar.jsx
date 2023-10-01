import { useAuthState } from '../../context/AuthContext.js';
import { useAuthDispatch } from '../../context/AuthContext.js';
import { logout } from '../../context/actions/AuthActions.js';
import { useUserProfileImage } from '../../graphql/useUser.js';
import './NavBar.css';
import NavbarSearch from './NavbarSearch.jsx';
import { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {
  Bell,
  Envelope,
  PersonCircle,
  Clipboard2Data,
  CardChecklist,
  Journal,
} from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useAuthDispatch();
  const { id, isAdmin } = useAuthState();
  const isNotAuthenticated = id === '' && isAdmin === '';
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const checkPath = location.pathname.split('/');
  const pathType = checkPath[1];
  const navigate = useNavigate();

  const { id: userId } = useAuthState();
  const { isFetching, fetchedData, fetchError } = useUserProfileImage({
    userInfoData: { userId },
  });
  const clickOutsideRef = useRef(null);

  const handleLogout = () => {
    setShowDropdown(!showDropdown);
    logout(dispatch);
    // navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <Nav.Link as={Link} to="/explore/inspiration">
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
                    <Nav.Link
                      className={pathType === '' ? 'active-nav-link' : ''}
                      onClick={(e) => [e.preventDefault(), navigate('/')]}
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      className={
                        pathType === 'explore' ? 'active-nav-link' : ''
                      }
                      onClick={(e) => [
                        e.preventDefault(),
                        navigate('/explore/inspiration'),
                      ]}
                    >
                      Explore
                    </Nav.Link>
                    <Nav.Link
                      className={
                        pathType === 'academy' ? 'active-nav-link' : ''
                      }
                      onClick={(e) => [
                        e.preventDefault(),
                        navigate('/academy'),
                      ]}
                    >
                      Academy
                    </Nav.Link>
                    <Nav.Link
                      className={
                        pathType === 'contest' ? 'active-nav-link' : ''
                      }
                      onClick={(e) => [
                        e.preventDefault(),
                        navigate('/contest'),
                      ]}
                    >
                      Contest
                    </Nav.Link>
                    <Nav.Link
                      className={
                        pathType === 'message' ? 'active-nav-link' : ''
                      }
                    >
                      <Envelope
                        size={28}
                        onClick={(e) => [
                          e.preventDefault(),
                          navigate('/message'),
                        ]}
                      />
                    </Nav.Link>
                    <Nav.Link
                      className={
                        pathType === 'notification' ? 'active-nav-link' : ''
                      }
                    >
                      <Bell
                        size={28}
                        onClick={(e) => [
                          e.preventDefault(),
                          navigate('/notification'),
                        ]}
                      />
                    </Nav.Link>

                    <Nav.Item>
                      <div ref={clickOutsideRef}>
                        {fetchedData ? (
                          <img
                            id="navbar-avatar"
                            src={fetchedData.userInfo.profileImageURL}
                            alt=""
                            onClick={() => setShowDropdown(!showDropdown)}
                          />
                        ) : (
                          <PersonCircle
                            size={28}
                            onClick={() => setShowDropdown(!showDropdown)}
                            id="avtar-nav-bar"
                          />
                        )}
                        <div className="popover-avatar">
                          {showDropdown ? (
                            <ul className="popover-avatar-content">
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <Link to={`/profile/${id}`}>Profile</Link>
                              </li>
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <a href="/academy">Academy</a>
                              </li>
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <a href="/leaderBoard">Leader Board</a>
                              </li>
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <a href="/contest">Contest</a>
                              </li>
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <a href="/aboutUs">About us</a>
                              </li>
                              <li
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                <div onClick={() => handleLogout()}>
                                  Log out
                                </div>
                              </li>
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </Nav.Item>
                    <a href="/upload" id="upload-btn-navbar">
                      Upload
                    </a>
                  </Nav>
                </>
              ) : (
                <>
                  <NavbarSearch />
                  <Nav>
                    <Nav.Link as={Link} to="/courses-management">
                      <Journal size={28} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/report-management">
                      <CardChecklist size={28} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/statistic">
                      <Clipboard2Data size={28} />
                    </Nav.Link>
                    <Nav.Item>
                      <div ref={clickOutsideRef}>
                      {fetchedData ? (
                          <img
                            id="navbar-avatar"
                            src={fetchedData.userInfo.profileImageURL}
                            alt=""
                            onClick={() => setShowDropdown(!showDropdown)}
                          />
                        ) : (
                          <PersonCircle
                            size={28}
                            onClick={() => setShowDropdown(!showDropdown)}
                            id="avtar-nav-bar"
                          />
                        )}
                        <div className="popover-avatar">
                          {showDropdown ? (
                            <ul className="popover-avatar-content">
                              <li>
                                <Link to={`/profile/${id}`}>Profile</Link>
                              </li>
                              <li>
                                <a href="/courses-management">Courses</a>
                              </li>
                              <li>
                                <a href="/report-management">Reports</a>
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
