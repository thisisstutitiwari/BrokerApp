export const validation = {};

validation.validateName = (value) => {
  return value !== "";
};

validation.validatePhoneNo = (value) => {
  const mobileNoRegex = /^\d{10}$/;

  return mobileNoRegex.test(value);
};

validation.validateAddress = (value) => {
  return value !== "";
};

validation.validateEmail = (value) => {
  const emailRegex = /^[A-z]\w+[A-z][@][A-z]{3,7}(.com)$/;

  return emailRegex.test(value);
};

validation.validatePassword = (value) => {
  const passwordregex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  return passwordregex.test(value);
};





