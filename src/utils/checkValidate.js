export const checkValidate = (name, email, password, rePassword) => {
  const validationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name !== undefined && name.trim() === '') {
    validationErrors.name = 'Name is required.';
  }
  if (!email) {
    validationErrors.email = 'Email is required.';
  } else if (!emailRegex.test(email)) {
    validationErrors.email = 'Invalid email address.';
  }
  if (!password) {
    validationErrors.password = 'Password is required.';
  } else if (password.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters.';
  }
  else if (rePassword !== password) {
    validationErrors.rePassword = 'Please retype your password';
  }
  return validationErrors;
};
