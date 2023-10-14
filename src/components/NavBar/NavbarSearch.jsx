import './NavBar.css';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

const NavbarSearch = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
    event.preventDefault();
      console.log('enter')  
    }
  }

  return (
    <Container>
      <Row className="navbar-search-row">
        <Col>
          <Form className="d-flex">
            <InputGroup
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
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
