import { Link } from "react-router-dom"

interface Props {
    user: any;
    logoutUser: any;
}

export default function Navbar(props: Props) {
    return (
        <div className="navbar-container">
            <div className="ver-list">
                <div className="info-user">
                    <div className="imagen-user">
                        <img src="/profile1.png" alt="" />
                    </div>
                    <div className="data-user">
                        <div>
                            <h1>Gonzalo Cabrera</h1>
                            <span onClick={props.logoutUser} className="bi bi-box-arrow-left"></span>
                        </div>
                        <span className="email">gonzalocabrera1990@gmail.com</span>
                    </div>
                </div>
                <div className="input-buscar">
                    <input type="text" name="" id="" placeholder="Buscar Tarea" />
                </div>
                <div className="task-panel">
                    <Link to='/home' className="mi-dia">
                        <span className="bi bi-sun"></span>
                        <span className="">Mi dia</span>
                    </Link>
                    <Link to='/importants' className="importante">
                        <span className="bi bi-star"></span>
                        <span className="" >Importante</span>
                    </Link>
                    <Link to='/tasks-date' className="planeado">
                        <span className="bi bi-journal-bookmark"></span>
                        <span className="" >Planeado</span>
                    </Link>
                    <Link to='/my-tasks' className="asignado-a-mi">
                        <span className="bi bi-people-fill"></span>
                        <span className="" >Asignado a mi</span>
                    </Link>
                    <Link to='/with-email' className="correo">
                        <span className="bi bi-flag"></span>
                        <span className="" >Correo electronico marcado</span>
                    </Link>
                    <Link to='/tasks' className="tareas">
                        <span className="bi bi-house-door"></span>
                        <span className="" >Tareas</span>
                    </Link>
                </div>
            </div>
            <div className="create-list">
                <div className="create-list-input">
                    <span className="bi bi-plus"></span>
                    <span>Nueva Lista</span>
                </div>
                <span className="bi bi-patch-plus"></span>

            </div>
        </div>
    )
}