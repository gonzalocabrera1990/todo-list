export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  password: string;
  repeatpassword: string;
  firstname: string;
  lastname: string;
  gender: string;
  date: string;
  country: string;
}

export interface TouchedState {
  password: boolean;
  username: boolean;
  repeatpassword: boolean;
  firstname: boolean;
  lastname: boolean;
}

export interface ValidationError {
  err: string;
  valid: boolean;
}

export interface SignupValidationErrors {
  password: ValidationError;
  repeatpassword: ValidationError;
  username: ValidationError;
  firstname: ValidationError;
  lastname: ValidationError;
  gender: boolean;
  date: boolean;
  country: boolean;
}
