let id = window.localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).id
  : '';

let isAdmin = window.localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).isAdmin
  : '';

let profileImageURL = window.localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).profileImageURL
  : '';

export const initialState = {
  id: '' || id,
  isAdmin: '' || isAdmin,
  profileImageURL: '' || profileImageURL,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        id: action.payload.id,
        isAdmin: action.payload.isAdmin,
        profileImageURL: action.payload.profileImageURL,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isAdmin: '',
        id: '',
        profileImageURL: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
