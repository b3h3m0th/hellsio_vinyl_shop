import * as emailValidator from "email-validator";

export type RegistrationData = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export const registrationErrorOptions = {
  password_too_short: "Your Password must at least contain 8 characters",
  password_does_not_match: "Your Passwords do not match",
  username_too_short: "Your Username cannot be empty",
  email_not_valid: "Please enter a valid email",
} as const;

const validateRegistrationData: (
  pwData: RegistrationData
) => Array<
  typeof registrationErrorOptions[keyof typeof registrationErrorOptions]
> = (pwData: RegistrationData) => {
  let errors: Array<
    typeof registrationErrorOptions[keyof typeof registrationErrorOptions]
  > = [];

  //username
  if (pwData.username.length < 0) {
    errors.push(registrationErrorOptions.username_too_short);
  } else {
    errors.filter(
      (error) => error !== registrationErrorOptions.username_too_short
    );
  }

  //email
  if (!emailValidator.validate(pwData.email)) {
    errors.push(registrationErrorOptions.email_not_valid);
  } else {
    errors.filter(
      (error) => error !== registrationErrorOptions.email_not_valid
    );
  }

  //password
  if (pwData.password.length < 8) {
    errors.push(registrationErrorOptions.password_too_short);
  } else {
    errors.filter(
      (error) => error !== registrationErrorOptions.password_too_short
    );
  }

  if (pwData.password !== pwData.password2) {
    errors.push(registrationErrorOptions.password_does_not_match);
  } else {
    errors.filter(
      (error) => error !== registrationErrorOptions.password_does_not_match
    );
  }

  return errors;
};

export default validateRegistrationData;
