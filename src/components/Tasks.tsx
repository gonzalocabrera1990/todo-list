import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";

interface Props {
    tasks: any;
    createTask: any;
    updateTask: any;
    checkTask: any;
    deleteTask: any;
    backgrounds: any;
}
export default function Tasks(props: Props) {
    const [tasks, setTasks] = useState<any>([])
    const [taskValue, settaskValue] = useState()
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [updateValue, setUpdateValue] = useState<any>({
        open: false,
        description: '',
        _id: null,
        task: null,
        done: null
    })
    const IdUser = JSON.parse(localStorage.getItem("id") || '')
    const { pathname } = useLocation()
    useEffect(() => {
        if (props.tasks) {
            setTasks(props.tasks.tasks)
        }
    }, [])
    useEffect(() => {
        if (props.backgrounds) {
            const element: any = document.querySelector('.importante-container')
            const path = pathname.split('/')[1]
            const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
            element.style.backgroundColor = props.backgrounds[backgroundType]
        }
    }, [props.backgrounds])
    const submit = () => {
        let task = {
            description: taskValue,
            user: JSON.parse(localStorage.getItem("id") || '')
        }
        props.createTask(task, task.user)
    }
    const submitUpdate = () => {
        let task = {
            _id: updateValue.task._id,
            description: updateValue.description,
            done: updateValue.done,
            user: JSON.parse(localStorage.getItem("id") || '')
        }
        props.updateTask("update-task", task.user, task)
    }
    const controlState = (e: any) => {
        const target = e.target;
        const value = target.value;
        settaskValue(value)
    }
    const updateTasks = (obj: any) => {
        console.log(obj);

        setUpdateValue((prev: any) => ({
            task: obj,
            _id: obj._id,
            description: obj.description,
            done: obj.done,
            open: prev._id == obj._id && prev.open ? false : true
        }))
    }
    const doneTasks = (obj: any) => {
        let task = {
            _id: obj._id,
            description: obj.description,
            done: true,
            user: obj.user
        }
        props.checkTask("task-done", task.user, task)
    }
    const unDoneTasks = (obj: any) => {
        let task = {
            _id: obj._id,
            description: obj.description,
            done: false,
            user: obj.user
        }
        props.checkTask("task-done", task.user, task)
    }
    const controlUpdate = (e: any) => {
        const target = e.target;
        const value = target.value;
        setUpdateValue((prev: any) => ({
            ...prev,
            description: value
        }))

    }
    const markDone = () => {
        console.log("aaa");

        setUpdateValue((prev: any) => ({
            ...prev,
            done: !prev.done
        }))

    }
    const deleteTask = () => {
        props.deleteTask("delete-task", IdUser, updateValue._id)
    }
    const tareas = tasks.length
        ?
        <div className="tasks-container" >
            {tasks.map((item: any) => {
                return (
                    <div className="task-item" key={item._id}>
                        <div className="task-description">
                            {
                                item.done ?
                                    <span className="done-mark bi bi-check done-mark-ckeck" onClick={() => unDoneTasks(item)} ></span>
                                    :
                                    <span className="done-mark" onClick={() => doneTasks(item)} ></span>
                            }
                            <div>{item.description}</div>
                        </div>
                        <span onClick={() => updateTasks(item)} className="cursor bi bi-bar-chart-steps"></span>
                    </div>
                )
            }
            )}
        </div>
        : <div className="img-container" >
            <div className="icon-svg svg-today">
                <img src={'/backgrounds/tasks.svg'} alt="" />
            </div>
        </div>

    return (
        <div className="container-tasks">
            <div className="importante-container">
                <div className="title-container" >
                    <div className="title-item" >
                        <span className="bi bi-house-door"></span>
                        <span>Tareas</span>
                    </div>
                    <div className="title-settings" onClick={addClassListEvent}>
                        <span className="bi bi-columns-gap"></span>
                    </div>
                </div>
                <>
                    {tareas}
                </>
                <div className="input-add-task">
                    <div className="input-container" >
                        <form onSubmit={submit}>
                            <input type="text" className="input-text-task" placeholder="Agregar tarea" onChange={(e) => controlState(e)} />
                            <span className="bi bi-plus"></span>
                            {/*<span className="bi bi-calendar-check-fill"></span>
                            <input
                            className="input-date-task"
                            type="date"
                            id="date"
                            name="due"
                            placeholder="Birth"
                            onChange={(e) => controlState(e)}
                            value={taskValue.due}
                        // onChange={controlState}
                        /> */}
                        </form>
                    </div>
                </div>
            </div>
            {
                updateValue.open ?
                    <form className="update-tasks" onSubmit={submitUpdate}>
                        <div className="input-container-update">
                            <div className="update-description">
                                {
                                    updateValue.done ?
                                        <span className="done-mark bi bi-check done-mark-ckeck" onClick={markDone}></span>
                                        :
                                        <span className="done-mark" onClick={markDone}></span>
                                }
                                <span>{updateValue.task ? updateValue.task.description : null}</span>
                            </div>
                            <span className="bi bi-star"></span>
                        </div>
                        <div className="input-container-update">
                            <div className="input-label">
                                <label htmlFor="description">Cambiar descripcion</label>
                                <textarea id="description" value={updateValue.description} onChange={(e) => controlUpdate(e)} />
                            </div>
                        </div>
                        <div className="update-buttons">
                            {
                                deleteConfirmation ?
                                    <>
                                        <span>¿Quiere eliminar esta tarea?</span>
                                        <input value="Si" onClick={() => deleteTask()} />
                                        <input value="No" onClick={() => setDeleteConfirmation(false)} />
                                    </>
                                    :
                                    <>
                                        <button type="submit" >Guardar</button>
                                        <input type="button" value="Eliminar" onClick={() => setDeleteConfirmation(true)} />
                                    </>
                            }
                        </div>
                    </form>
                    :
                    null
            }
        </div>
    )
}