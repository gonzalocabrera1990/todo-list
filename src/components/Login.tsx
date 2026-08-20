import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginProps, LoginFormData } from '../types';

export default function Login(props: LoginProps) {
  const [dataForm, setDataForm] = useState<LoginFormData>({
    username: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await props.loginUser({ username: dataForm.username, password: dataForm.password })
      navigate("/home")
    } catch (err: unknown) {
      const error = new Error(String(err))
      throw error
    }
  }

  const controlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  }

  return (
    <div className="wraper-login">
      <div className="data-form data-form-login data-form-back">
        <form className="wraper-login wraper-form" onSubmit={handleLogin}>
          <div className="wraper-text">
            <div className="name">TODO APP</div>
            <div className="description">LOGIN</div>
          </div>
          <div>
            <div className="input-flex">
              <div>
                <input placeholder="Username" type="text" name="username" onChange={(e) => controlState(e)} value={dataForm.username} />
              </div>
              <div>
                <input placeholder="Password" type="password" name="password" onChange={(e) => controlState(e)} value={dataForm.password} />
              </div>
            </div>
          </div>
          <div className="wraper-text">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
      <div className="redirect-signup">
        <span>¿No tienes una cuenta?</span>
        <button className="redirect-signup-button">
          <Link to={`/signup`}>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  )
}
