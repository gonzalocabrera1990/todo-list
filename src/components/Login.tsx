import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(props: any) {
  const [dataForm, setDataForm] = useState({
    username: '',
    password: ''
  })

  const handleLogin = (event: any) => {
    event.preventDefault();
    props.loginUser({
      username: dataForm.username,
      password: dataForm.password
    })
      .then((resp: any) => {
        console.log('aaaaaaaaaa', resp);
        return resp ? props.history.push("/signup") : null
      })
  }
  const controlState = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setDataForm((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  }
  //     let response = await props.loginUser({ username: username.value, password: password.value})
  //  if(response) props.history.push("/settings")
  //  console.log('responsa', response);

  return (
    <div className="contenedor">
      <div className="wraper-login">
        <div className="data-form">
          <form className="wraper-login wraper-form" onSubmit={handleLogin}>
            <div className="wraper-text">
              <div className="name">LANDSCAPE</div>
              <div className="description">RED SOCIAL</div>
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
          <button>
            <Link to={`/signup`}>
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
