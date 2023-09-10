import { addClassListEvent } from "../helpers/libs";

export default function MyTaks() {
    return (
        <div className="importante-container">
            <div className="title-container" >
                <div className="title-item" >
                    <span className="bi bi-people-fill"></span>
                    <span>Tareas asignadas a mi usuario</span>
                </div>
                <div className="title-settings" onClick={addClassListEvent}>
                    <span className="bi bi-columns-gap"></span>
                </div>
            </div>
            <div className="icon-svg svg-my-tasks">

            </div>
            <div className="input-add-task">
                <div className="input-container" >
                    <input type="text" placeholder="Agregar tarea" />
                    <span className="bi bi-plus"></span>
                    <span className="bi bi-calendar-check-fill"></span>
                </div>
            </div>
        </div>
    )
}