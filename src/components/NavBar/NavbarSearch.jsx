import './NavBar.css';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarSearch = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = useCallback(() => {
    setSearchValue('');
    setIsFocus(false);
    navigate('/explore/inspiration', {
      state: {
        searchValue: searchValue,
      },
    });
  }, [navigate, searchValue]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  return useMemo(
    () => (
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
                  value={searchValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        {isFocus && (
          <div className="popover-content">
            <p>{searchValue}</p>
          </div>
        )}
      </Container>
    ),
    [handleKeyDown, isFocus, searchValue]
  );
};

export default NavbarSearch;
