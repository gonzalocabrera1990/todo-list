import { Link } from "react-router-dom";
export default function Index() {
    return (
        <div>
            <div className="index-container" >
                <div className="index-title">
                    <h1>
                        Mejora tu productividad en el trabajo organizando las tareas
                    </h1>
                    <button>
                        <Link to={`/login`}>
                            Ir a la app
                        </Link>
                    </button>
                </div>
                <div className="index-img">
                    <img src="/first-div.svg" alt="" />
                </div>
            </div>
            <div className="index-container" >

                <div className="index-img">
                    <img src="/second-div.svg" alt="" />
                </div>
                <div className="index-title">
                    <h1>
                        Crea diferentes tipos de tareas
                    </h1>
                    <button>
                        <Link to={`/signup`}>
                            Sign Up
                        </Link>
                    </button>
                </div>
            </div>
            <div className="index-container" >
                <div className="index-title">
                    <h1>
                        Comparti listas de tareas en grupos de usuarios
                    </h1>
                    <button>
                        <Link to={`/login`}>
                            Login
                        </Link>
                    </button>
                </div>
                <div className="index-img">
                    <img src="/tercer-div.svg" alt="" />
                </div>
            </div>
        </div>
    )
}