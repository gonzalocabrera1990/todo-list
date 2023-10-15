import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";

interface Props {
    tasks: any;
    createTask: any;
    checkTask: any;
    backgrounds: any;
}
export default function MyTasks(props: Props) {
    const [tasks, setTasks] = useState<any>([])
    const [taskValue, settaskValue] = useState()
    const [updateValue, setUpdateValue] = useState({
        open: false,
        description: ''
    })
    
    const IdUser = JSON.parse(localStorage.getItem("id") || '')
    const { pathname } = useLocation()
    useEffect(() => {
        if (props.tasks) {
            setTasks(props.tasks.assigntasks)
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
    const controlState = (e: any) => {
        const target = e.target;
        const value = target.value;
        settaskValue(value)
    }
    const doneTasks = (task: any) => {
        task.done = true
        props.checkTask("assingTasks-done", IdUser, task)
    }

    const unDoneTasks = (task: any) => {
        task.done = false
        props.checkTask("assingTasks-done", IdUser, task)
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
                        <div>{item.due}</div>
                    </div>
                )
            }
            )}
        </div>
        : <div className="img-container" >
            <div className="icon-svg svg-today">
                <img src={'/backgrounds/assign.svg'} alt="" />
            </div>
        </div>

    return (
        <div className="container-tasks">
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
        </div>
    )
}