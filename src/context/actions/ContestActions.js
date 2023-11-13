export const handleInputChange = (dispatch, field, value) => {
  dispatch({ type: 'UPDATE_CONTEST_FIELD', field, value });
};
