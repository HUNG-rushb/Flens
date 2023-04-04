export async function loginUser(dispatch, loginPayload) {
  dispatch({
    type: 'LOGIN_SUCCESS',
    payload: { user: 'hung', auth_token: '123' },
  });

  window.localStorage.setItem(
    'currentUser',
    JSON.stringify({ user: 'hung', auth_token: '123' })
  );

  return { user: 'hung', auth_token: '123' };
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  window.localStorage.removeItem('currentUser');
}

// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';

// export async function loginUser(dispatch, loginPayload) {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(loginPayload),
//   };

//   try {
//     dispatch({ type: 'REQUEST_LOGIN' });
//     let response = await fetch(`${ROOT_URL}/login`, requestOptions);
//     let data = await response.json();

//     if (data.user) {
//       dispatch({ type: 'LOGIN_SUCCESS', payload: data });

//       localStorage.setItem('currentUser', JSON.stringify(data));

//       return data;
//     }

//     dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
//     return;
//   } catch (error) {
//     dispatch({ type: 'LOGIN_ERROR', error: error });
//   }
// }

// export async function logout(dispatch) {
//   dispatch({ type: 'LOGOUT' });
//   localStorage.removeItem('currentUser');
//   localStorage.removeItem('token');
// }