import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../context/actions/AuthActions';
import { useAuthDispatch } from '../../context/AuthContext';
import { BoxArrowRight } from 'react-bootstrap-icons';

const LogOutButton = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate('/');
  };

  return (
    <Nav.Link onClick={() => handleLogout()}>
      <BoxArrowRight />
    </Nav.Link>
  );
};

export default LogOutButton;
