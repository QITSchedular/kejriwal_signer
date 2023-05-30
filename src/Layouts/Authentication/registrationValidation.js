// formValidation.js
export const validateForm = (data) => {
    const errors = {};
  
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const userName = data.get('userName');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
  
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      errors.error = 'All the fields are mandatory';
      errors.isError = true;
      return errors;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.error = 'Email is invalid';
      errors.isError = true;
      return errors
    }
  
    if (!password) {
      errors.error = 'Password is required';
      errors.isError = true;
      return errors;
    } else if (password.length < 6) {
      errors.error = 'Password should be at least 6 characters';
      errors.isError = true;
      return errors;
    }
  
    if (!confirmPassword) {
      errors.error = 'Confirm Password is required';
      errors.isError = true;
      return errors;
    } else if (confirmPassword !== password) {
      errors.error = 'Passwords do not match';
      errors.isError = true;
      return errors;
    }
    errors.isError = false;
    return errors;
  };
  