import { useAuthState } from '../../context/AuthContext';
import { useSearchQuery } from '../../graphql/useSearch';
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
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const { searchQuery } = useSearchQuery();

  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({});
  console.log({ searchResult });

  const handleChange = async (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    try {
      const a = await searchQuery({
        variables: {
          searchQueryData: {
            userId,
            searchString: event.target.value,
          },
        },
      });
      console.log({ a });
      setSearchResult(a.data.searchQuery);
    } catch (e) {
      throw e;
    }
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

            {searchResult?.tags &&
              searchResult.tags.map((tag) => <p key={tag.id}>{tag.name}</p>)}

            {searchResult?.users &&
              searchResult.users.map((user) => (
                <p key={user.id}>{user.name}</p>
              ))}
          </div>
        )}
      </Container>
    ),
    [handleKeyDown, isFocus, searchValue]
  );
};

export default NavbarSearch;
