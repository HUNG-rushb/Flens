import { useAuthState } from '../../context/AuthContext';
import { useSearchQuery } from '../../graphql/useSearch';
import './NavBar.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  const clickOutsideRef = useRef(null);
  const { id: userId } = useAuthState();
  const { searchQuery } = useSearchQuery();

  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState({});

  // console.log({ searchResult });

  const handleChange = useCallback(
    async (event) => {
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
    },
    [searchQuery, userId]
  );

  const handleSearch = useCallback(() => {
    setSearchValue('');
    navigate(`/tag/${searchValue}`, {
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

  const handleClickTagResult = useCallback(
    (tag) => {
      setSearchValue(tag.name);
      handleSearch();
      setIsFocus(false);
    },
    [handleSearch]
  );

  const handleClickUserResult = useCallback(
    (user) => {
      setSearchValue('');
      setIsFocus(false);
      navigate(`/profile/${user.id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target)
      ) {
        setIsFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return useMemo(
    () => (
      <Container ref={clickOutsideRef}>
        <Row className="navbar-search-row">
          <Col>
            <Form className="d-flex">
              <InputGroup
                onFocus={() => {
                  setIsFocus(true);
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
            {searchResult?.tags && (
              <div className="tags-result">
                <p id="result-label">Tags</p>
                <hr />
                {searchResult?.tags.map((tag) => (
                  <p
                    id="tag-value"
                    key={tag?.id}
                    onClick={() => handleClickTagResult(tag)}
                  >
                    # {tag?.name}
                  </p>
                ))}
              </div>
            )}

            {searchResult?.users && (
              <div className="users-result">
                <p id="result-label">Photographers</p>
                <hr />
                {searchResult?.users.map((user) => (
                  <div id="user-value" key={user?.id}>
                    <img
                      src={user.profileImageURL}
                      id="user-search-result-avatar"
                      onClick={() => handleClickUserResult(user)}
                      alt=""
                    />
                    <span
                      id="user-search-result-username"
                      onClick={() => handleClickUserResult(user)}
                    >
                      {user?.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    ),
    [
      handleChange,
      handleClickTagResult,
      handleClickUserResult,
      handleKeyDown,
      isFocus,
      searchResult?.tags,
      searchResult?.users,
      searchValue,
    ]
  );
};

export default NavbarSearch;
