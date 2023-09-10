import { useState } from "react";
import { countries } from '../shared/countries';

import { useNavigate } from 'react-router-dom';

function SignUp(props:any) {
  const [dataForm, setDataForm] = useState({
    username: '',
    password: '',
    repeatpassword: '',
    gender: '',
    date: '',
    country: ''
  })
  const [touched, setTouched] = useState({
    password: false,
    username: false,
    repeatpassword: false
  })

  let navigate = useNavigate();
  const controlState = (e:any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setDataForm((prevProps)=>({
      ...prevProps,
      [name]: value
    }))
  }

  const handleBlur = (field:any) => (e:any) => {
      setTouched((prevProps)=>({
        ...prevProps,
        [field]: true
      })
    )
  }

  const validar = ( username:string, password:string, repeatpassword:string, gender:string, date:string, country:string) => {
    const error = {
      password: { err: "", valid: false },
      repeatpassword: { err: "", valid: false },
      username: { err: "", valid: false },
      gender: false,
      date: false,
      country: false
    };
    
    const expreg = /^(\w{3,})@(gmail|hotmail|outlook).\b(com|info|web)\b/;

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

  const onSubmit = (e:any) => {
    e.preventDefault();
    props.signupUser(dataForm).then(() => {
      navigate("/post-signup");
    });
  };


    const error = validar(
      dataForm.username,
      dataForm.password,
      dataForm.repeatpassword,
      dataForm.gender,
      dataForm.date,
      dataForm.country
    );
    const enableButton = error.username.valid && error.password.valid &&
      error.repeatpassword.valid && error.gender &&
      error.date && error.country ? true : false;
      
    const country = countries.map((c, index) => <option key={index}>{c}</option>)
  return (
    <div className="signup-container">
      <div className="container">
        <div className="">
          <h1>SignUp</h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={onSubmit}  className="">
          <div className="input-container" >
            <label htmlFor="username" >
              Email
            </label>
            <div >
              <input
                type="email"
                id="username"
                name="username"
                placeholder="example@mail.com"
                value={dataForm.username}
                // valid={error.username.err === ""}
                //invalid={error.username.err !== ""}
                onChange={controlState}
                onBlur={handleBlur("username")}
              />
              
            </div>
          </div>
          <div className="input-container" >
            <label htmlFor="password" >
              Password
            </label>
            <div >
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={dataForm.password}
                // valid={error.password.err === ""}
                // invalid={error.password.err !== ""}
                onChange={controlState}
                onBlur={handleBlur("password")}
              />
            </div>
          </div>
          <div className="input-container" >
            <label htmlFor="repeatpassword" >
              Repeat Password
            </label>
            <div >
              <input
                type="password"
                id="repeatpassword"
                name="repeatpassword"
                placeholder="repeat contraseña"
                value={dataForm.repeatpassword}
                // valid={error.repeatpassword.err === ""}
                // invalid={error.repeatpassword.err !== ""}
                onChange={controlState}
                onBlur={handleBlur("repeatpassword")}
              />
            </div>
          </div>
          <div className="input-container" >
            <label htmlFor="gender" >
              Gender
            </label>
            <div >
              <select
                id="gender"
                name="gender"
                value={dataForm.gender}
                onChange={controlState}
              >
                <option>Choose a gender ...</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
              </select>
            </div>
          </div>
          <div className="input-container" >
            <label htmlFor="date" >
              Birthdate
            </label>
            <div >
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
          <div className="input-container" >
            <label htmlFor="country" >
              Country
            </label>
            <div >
              <select
                id="country"
                name="country"
                placeholder="country"
                value={dataForm.country}
                onChange={controlState}
              >
                {country}
              </select>
            </div>
            <div>
              {
                enableButton
                  ?
                  <button type="submit" className="bg-success border-0" >Send</button>
                  :
                  <button disabled >Send</button>
              }

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp