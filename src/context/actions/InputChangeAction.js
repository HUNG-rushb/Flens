export const handleInputChange = (dispatch, type, field, value) => {
  dispatch({ type: type, field, value });
};
