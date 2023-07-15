import React, { useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import './NavBar.css';

const NavbarSearch = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');

  return (
    <Container>
      <Row className="navbar-search-row">
        <Col>
          <Form className="d-flex">
            <InputGroup
              onChange={(e) => {
                e.preventDefault();
                setInput(e.target.value);
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => {
                setIsFocus(false);
              }}
            >
              <FormControl
                type="search"
                placeholder="Search Flens"
                className="me-2 rounded-md"
                aria-label="Search"
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {isFocus && (
        <div className="popover-content">
          <p>{input}</p>
        </div>
      )}
    </Container>
  );
};

export default NavbarSearch;
