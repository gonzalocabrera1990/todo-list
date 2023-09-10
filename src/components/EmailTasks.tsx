import { addClassListEvent } from "../helpers/libs";

export default function EmailTasks() {
    return (
        <div className="importante-container">
            <div className="title-container" >
                <div className="title-item" >
                    <span className="bi bi-flag"></span>
                    <span>Correo electronico marcado</span>
                </div>
                <div className="title-settings" onClick={addClassListEvent}>
                    <span className="bi bi-columns-gap"></span>
                </div>
            </div>
            <div className="icon-svg svg-email">

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