import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props: any) {
  const [dataForm, setDataForm] = useState({
    username: '',
    password: ''
  })

  let navigate = useNavigate();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      let log = await props.loginUser({ username: dataForm.username, password: dataForm.password })
      if (log) {
        navigate("/home")
      }
    } catch (err: any) {
      const error = new Error(err)
      throw error
    }
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
        </div>
        <div className="redirect-signup">
            <span>¿No tienes una cuenta?</span>
          <button>
            <Link to={`/signup`}>
              Sign Up
            </Link>
          </button>
          </div>
      </div>
  )
}


// import { useEffect, useState } from "react";
// import { Link, useNavigate, Navigate, redirect } from "react-router-dom";
// export default function Login(props: any) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [dataForm, setDataForm] = useState({
//     username: '',
//     password: ''
//   })

//   useEffect(()=>{
//     if (props.auth.isAuthenticated) {
//       console.log("props.auth.isAuthenticated", props.auth.isAuthenticated);
      
//       setIsLoggedIn(props.auth.isAuthenticated)
//     }
//   },[props.auth])
//   let navigate = useNavigate();
//   const handleLogin = async (event: any) => {
//     event.preventDefault();
//     try {
//       let log = await props.loginUser({ username: dataForm.username, password: dataForm.password })
//       if (log) {
//         navigate("/home")
//       }
//     } catch (err: any) {
//       const error = new Error(err)
//       throw error
//     }
//   }
//   const controlState = (e: any) => {
//     const target = e.target;
//     const value = target.value;
//     const name = target.name;
//     setDataForm((prevProps) => ({
//       ...prevProps,
//       [name]: value
//     }))
//   }
//   //     let response = await props.loginUser({ username: username.value, password: password.value})
//   //  if(response) props.history.push("/settings")
//   //  console.log('responsa', response);
//   if (isLoggedIn) {
//     return <Navigate to="/home" />;
//     // <Navigate to="/home" />;
//     // return navigate("/home")
//     // navigate("/home")
//     // return redirect("/home");
//     // redirect("/home");
//   }
//   return (
//       <div className="wraper-login">
//         <div className="data-form">
//           <form className="wraper-login wraper-form" onSubmit={handleLogin}>
//             <div className="wraper-text">
//               <div className="name">LANDSCAPE</div>
//               <div className="description">RED SOCIAL</div>
//             </div>
//             <div>
//               <div className="input-flex">
//                 <div>
//                   <input placeholder="Username" type="text" name="username" onChange={(e) => controlState(e)} value={dataForm.username} />
//                 </div>
//                 <div>
//                   <input placeholder="Password" type="password" name="password" onChange={(e) => controlState(e)} value={dataForm.password} />
//                 </div>
//               </div>
//             </div>
//             <div className="wraper-text">
//               <input type="submit" value="Login" />
//             </div>
//           </form>
//         </div>
//         <div className="redirect-signup">
//             <span>¿No tienes una cuenta?</span>
//           <button>
//             <Link to={`/signup`}>
//               Sign Up
//             </Link>
//           </button>
//           </div>
//       </div>
//   )
// }
