import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";
import { TasksDateProps, Task } from '../types';

interface TaskDateValue {
  description: string;
  due: string;
}

interface TasksDateUpdateValue {
  open: boolean;
  description: string;
  _id: string | null;
  task: Task | null;
  due: string;
  done: boolean | null;
}

export default function TaskDate(props: TasksDateProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskValue, settaskValue] = useState<TaskDateValue>({
    description: '',
    due: ''
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [updateValue, setUpdateValue] = useState<TasksDateUpdateValue>({
    open: false,
    description: '',
    _id: null,
    task: null,
    due: '',
    done: null
  })
  const IdUser = JSON.parse(localStorage.getItem("id") || '')
  const { pathname } = useLocation()

  useEffect(() => {
    if (props.tasks) {
      setTasks(props.tasks.datetasks)
    }
  }, [props.tasks])

  useEffect(() => {
    if (props.backgrounds) {
      const element = document.querySelector<HTMLElement>('.importante-container')
      const path = pathname.split('/')[1]
      const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
      if (element) {
        element.style.backgroundColor = props.backgrounds[backgroundType]
      }
    }
  }, [props.backgrounds])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = {
      description: taskValue.description,
      due: taskValue.due,
      user: JSON.parse(localStorage.getItem("id") || '')
    }
    if (task.description.length && task.due.length) {
      settaskValue({
        description: '',
        due: ''
      })
      props.createDateTask(task, task.user)
    }
  }

  const controlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    settaskValue((prevProps) => ({
      ...prevProps,
      [name]: value
    }))
  }

  const submitUpdate = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const task = {
      _id: updateValue.task!._id,
      description: updateValue.description,
      done: updateValue.done!,
      due: updateValue.due,
      user: JSON.parse(localStorage.getItem("id") || '')
    }
    props.updateTask("update-datetask", task.user, task)
  }

  const updateTasks = (obj: Task) => {
    setUpdateValue((prev) => ({
      task: obj,
      _id: obj._id,
      description: obj.description,
      done: obj.done,
      due: obj.due!,
      open: prev._id == obj._id && prev.open ? false : true
    }))
  }

  const doneTasks = (obj: Task) => {
    const task = {
      _id: obj._id,
      description: obj.description,
      done: true,
      due: obj.due!,
      user: obj.user!
    }
    props.checkTask("task-datetask-done", task.user, task)
  }

  const unDoneTasks = (obj: Task) => {
    const task = {
      _id: obj._id,
      description: obj.description,
      done: false,
      due: obj.due!,
      user: obj.user!
    }
    props.checkTask("task-datetask-done", task.user, task)
  }

  const controlUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateValue((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const markDone = () => {
    setUpdateValue((prev) => ({
      ...prev,
      done: !prev.done
    }))
  }

  const deleteTask = () => {
    props.deleteTask("delete-datetask-task", IdUser, updateValue._id!)
  }

  const tareas = tasks.length
    ?
    <div className="tasks-container" >
      {tasks.map((item) => {
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
            <div className="due-item">
              <span className="due-task">{item.due}</span>
              <div onClick={() => updateTasks(item)}>
                <span className="cursor bi bi-bar-chart-steps"></span>
              </div>
            </div>
          </div>
        )
      }
      )}
    </div>
    : <div className="img-container" >
      <div className="icon-svg svg-today">
        <img src={'/backgrounds/date.svg'} alt="" />
      </div>
    </div>

  return (
    <div className="container-tasks">
      <div className="importante-container">
        <div className="title-container" >
          <div className="title-item" >
            <span className="bi bi-journal-bookmark"></span>
            <span>Planeado</span>
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
            <form onSubmit={(e) => submit(e)}>
              <input type="text" className="input-text-task" name="description" placeholder="Agregar tarea" onChange={(e) => controlState(e)} />
              <span className="bi bi-plus"></span>
              <input
                className="input-date-task"
                type="date"
                id="date"
                name="due"
                placeholder="Birth"
                onChange={(e) => controlState(e)}
                value={taskValue.due}
              />
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
            </div>
            <div className="input-container-update">
              <div className="input-label">
                <label htmlFor="description">Cambiar descripcion</label>
                <textarea id="description" value={updateValue.description} name="description" onChange={(e) => controlUpdate(e)} />
              </div>
            </div>
            <div className="input-label">
              <label htmlFor="update-date">Cambiar fecha</label>
              <input
                className="input-date-task-update"
                type="date"
                id="update-date"
                name="due"
                placeholder="Birth"
                onChange={(e) => controlUpdate(e)}
                value={updateValue.due}
              />
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
