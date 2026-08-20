import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { SignupProps, SignupFormData, TouchedState, SignupValidationErrors } from '../types';
import { countries } from '../shared/countries';

function SignUp(props: SignupProps) {
  const [dataForm, setDataForm] = useState<SignupFormData>({
    username: '',
    password: '',
    repeatpassword: '',
    firstname: '',
    lastname: '',
    gender: '',
    date: '',
    country: ''
  })
  const [touched, setTouched] = useState<TouchedState>({
    password: false,
    username: false,
    repeatpassword: false,
    firstname: false,
    lastname: false
  })

  const navigate = useNavigate();

  const controlState = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDataForm((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  }

  const handleBlur = (field: keyof TouchedState) => () => {
    setTouched((prevProps) => ({
      ...prevProps,
      [field]: true
    }))
  }

  const validar = (
    username: string,
    password: string,
    repeatpassword: string,
    firstname: string,
    lastname: string,
    gender: string,
    date: string,
    country: string
  ): SignupValidationErrors => {
    const error: SignupValidationErrors = {
      password: { err: "", valid: false },
      repeatpassword: { err: "", valid: false },
      username: { err: "", valid: false },
      firstname: { err: "", valid: false },
      lastname: { err: "", valid: false },
      gender: false,
      date: false,
      country: false
    };

    const expreg = /^(\w{3,})@(gmail|hotmail|outlook).\b(com|info|web)\b/;

    if (touched.firstname && firstname.length < 1) {
      error.firstname.err = "It is empty.";
    } else if (touched.firstname && firstname.length > 15) {
      error.firstname.err = "It must be less than or equal to 15 characters.";
    } else if (firstname !== "") {
      error.firstname.valid = true
    }

    if (touched.lastname && lastname.length < 1) {
      error.lastname.err = "It is empty.";
    } else if (touched.lastname && lastname.length > 15) {
      error.lastname.err = "It must be less than or equal to 15 characters.";
    } else if (lastname !== "") {
      error.lastname.valid = true
    }

    if (touched.password && password.length < 4) {
      error.password.err =
        "The password is WEAK. It must be greater than 4 characters. We recommend alternating numbers and letters.";
    } else if (touched.password && password.length > 10) {
      error.password.err =
        "The password must be less than or equal to 10 characters. We recommend alternating numbers and letters.";
    } else if (password !== "") {
      error.password.valid = true
    }

    if (touched.repeatpassword && repeatpassword !== password) {
      error.repeatpassword.err =
        "Password and Repeat password do not match. Please validate these fields.";
    } else if (touched.repeatpassword && repeatpassword.length > 10) {
      error.repeatpassword.err =
        "The password must be less than or equal to 10 characters. We recommend alternating numbers and letters.";
    } else if (repeatpassword !== "") {
      error.repeatpassword.valid = true
    }
    if (touched.username && !expreg.test(username)) {
      error.username.err = "Wrong e-mail format. Ej: exampe@mail.com";
    } else if (username !== "") {
      error.username.valid = true
    }

    if (gender !== 'Choose a gender ...' && gender !== "") {
      error.gender = true
    }

    if (date !== "") {
      error.date = true
    }
    if (country !== "") {
      error.country = true
    }

    return error;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.signupUser(dataForm)
    navigate("/post-signup");
  };

  const error = validar(
    dataForm.username,
    dataForm.password,
    dataForm.repeatpassword,
    dataForm.firstname,
    dataForm.lastname,
    dataForm.gender,
    dataForm.date,
    dataForm.country
  );
  const enableButton = error.username.valid && error.password.valid &&
    error.repeatpassword.valid && error.firstname.valid && error.lastname.valid && error.gender &&
    error.date && error.country ? true : false;

  const country = countries.map((c: string, index: number) => <option key={index}>{c}</option>)

  return (
    <div className="auth-grap">
      <div className="auth-container data-form-back">
        <div className="auth-sidebar">
          <div className="desktop-content">
            <h2>¡Bienvenido de nuevo!</h2>
            <p>Regístrate para comenzar a disfrutar de todas nuestras funcionalidades exclusivas.</p>
            <div className="redirect-box">
              <span>¿Ya tienes una cuenta?</span>
              <Link to={`/login`} className="btn-secondary">
                Iniciar sesión
              </Link>
            </div>
          </div>
          <div className="mobile-content">
            <h2>Sign Up</h2>
            <button onClick={() => navigate('/login')} className="btn-link">
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </div>
        <div className="data-form data-form-sign">
          <form onSubmit={onSubmit} className="">
            <div className="input-container">
              <label htmlFor="username">Email</label>
              <div className="input-container-child">
                <input
                  type="email"
                  id="username"
                  name="username"
                  placeholder="example@mail.com"
                  value={dataForm.username}
                  onChange={controlState}
                  onBlur={handleBlur("username")}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <div className="input-container-child">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={dataForm.password}
                  onChange={controlState}
                  onBlur={handleBlur("password")}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="repeatpassword">Repeat Password</label>
              <div className="input-container-child">
                <input
                  type="password"
                  id="repeatpassword"
                  name="repeatpassword"
                  placeholder="repeat contraseña"
                  value={dataForm.repeatpassword}
                  onChange={controlState}
                  onBlur={handleBlur("repeatpassword")}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="firstname">Nombre</label>
              <div className="input-container-child">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="firstname"
                  value={dataForm.firstname}
                  onChange={controlState}
                  onBlur={handleBlur("firstname")}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="lastname">Apellido</label>
              <div className="input-container-child">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="lastname"
                  value={dataForm.lastname}
                  onChange={controlState}
                  onBlur={handleBlur("lastname")}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="gender">Gender</label>
              <div className="input-container-child">
                <select
                  id="gender"
                  name="gender"
                  value={dataForm.gender}
                  onChange={controlState}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="date">Birthdate</label>
              <div className="input-container-child">
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Birth"
                  value={dataForm.date}
                  onChange={controlState}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="country">Country</label>
              <div className="input-container-child-country">
                <select
                  id="country"
                  name="country"
                  value={dataForm.country}
                  onChange={controlState}
                >
                  {country}
                </select>
                {
                  enableButton
                    ?
                    <button type="submit" className="border-0">Send</button>
                    :
                    <button disabled className="disabled-button">Send</button>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp
