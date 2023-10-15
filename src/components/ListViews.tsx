import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";

interface Props {
    tasks: any;
    createTaskList: any;
    updateTaskList: any;
    deleteTaskList: any;
    deleteListGroup: any;
    checkGroupTask: any;
    backgrounds: any;
}
export default function ListView(props: Props) {
    const { listId } = useParams()
    let navigate = useNavigate();
    const [list, setList] = useState<any>(null)
    const [listTask, setListTask] = useState<any>(null);
    const [deleteListConfirmation, setDeleteListConfirmation] = useState(false)
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
            setList(props.tasks.lists.filter((list: any) => (list._id == listId))[0])
        }
    }, [props.tasks, listId])
    useEffect(() => {
        if (props.backgrounds) {
            const element: any = document.querySelector('.list-container')
            const path = pathname.split('/')[1]
            const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path

            element.style.backgroundColor = props.backgrounds[backgroundType]
        }
    }, [props.backgrounds])
    useEffect(() => {
        return function () {
            setList(null)
            setListTask(null);
            setUpdateValue({
                open: false,
                description: '',
                _id: null,
                task: null,
                done: null
            })
        }
    }, [])
    const sendTask = () => {
        if (listTask) {
            const taskListData = {
                description: listTask
            }
            props.createTaskList(IdUser, list._id, taskListData)
        }
    }
    const submitUpdate = () => {
        let task = {
            _id: updateValue.task._id,
            description: updateValue.description,
            done: updateValue.done
        }
        props.updateTaskList(IdUser, list._id, task)
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
            done: true
        }
        props.checkGroupTask("task-list-done", IdUser, list._id, task)
    }

    const unDoneTasks = (obj: any) => {
        let task = {
            _id: obj._id,
            description: obj.description,
            done: false
        }
        props.checkGroupTask("task-list-done", IdUser, list._id, task)
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
        setUpdateValue((prev: any) => ({
            ...prev,
            done: !prev.done
        }))

    }
    const setNull = () => {
        setUpdateValue((prev: any) => ({
            task: null,
            _id: null,
            description: null,
            done: null,
            open: false
        }))
    }
    const deleteTask = () => {
        props.deleteTaskList(IdUser, list._id, updateValue._id)
        setNull()
    }
    const deleteList = () => {
        props.deleteListGroup("list-delete", IdUser, list._id)
        return navigate("/listcreator")
    }
    return (
        <div className="list-container">
            <div className="title-container" >
                <div className="title-item" >
                    <span className="bi bi-people"></span>
                    <span>Detalle de Lista</span>
                </div>
                <div className="title-settings" >
                    <span className="bi bi-columns-gap" onClick={addClassListEvent}></span>
                </div>
            </div>
            {!list ? null : (
                <div className="group-container-list" >
                    <div className="group-item" >
                        <div className="group-description">
                            <div className="cursor">{list.name}</div>
                        </div>
                        {
                            deleteListConfirmation ?
                                <>
                                    <span>¿Quiere eliminar esta Lista?</span>
                                    <input className='delete-list' type='button' value="Si" onClick={() => deleteList()} />
                                    <input className='delete-list' type='button' value="No" onClick={() => setDeleteListConfirmation(false)} />
                                </>
                                :
                                <>
                                    <div className="group-input-buscar">
                                        <input type="text" name="" id="" placeholder="Agregar tarea" onChange={(e) => setListTask(e.target.value)} />
                                    </div>
                                    <div className="group-bi">
                                        <span className="bi bi-plus cursor" onClick={() => sendTask()}></span>
                                    </div>
                                    <div className="group-bi">
                                        <span className="bi bi-trash-fill cursor" onClick={() => setDeleteListConfirmation(true)}></span>
                                    </div>
                                </>
                        }
                    </div>


                    <div className="tasks-container" >
                        {
                            list.tasks.length ?
                                updateValue.open ?
                                    <form className="update-list-tasks" onSubmit={submitUpdate}>
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
                                            <span className="bi bi-backspace-fill cursor" onClick={() => setNull()}></span>
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
                                                        <input type='button' value="Si" onClick={() => deleteTask()} />
                                                        <input type='button' value="No" onClick={() => setDeleteConfirmation(false)} />
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
                                    list.tasks.map((item: any) => {
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
                                                <div >
                                                    <span onClick={() => updateTasks(item)} className="cursor bi bi-bar-chart-steps"></span>
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                <div className="img-container" >
                                    <div className="icon-svg svg-today">
                                        <img src={'/backgrounds/list.svg'} alt="" />
                                    </div>
                                </div>
                        }

                    </div>

                </div>)}
            {/* <div className="input-add-task">
        <div className="input-container" >
          <form onSubmit={submit}>
            <input type="text" className="input-text-task" placeholder="Grupo Nombre" onChange={(e) => controlState(e)} />
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
                        /> 
          </form>
        </div>
      </div> */}
        </div>
    )
}
