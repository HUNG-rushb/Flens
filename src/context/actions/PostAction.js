export const handleInputChange = (dispatch, field, value) => {
  dispatch({ type: 'UPDATE_POST_FIELD', field, value });
};
