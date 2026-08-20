import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";
import { MyTasksProps, Task } from '../types';

export default function MyTasks(props: MyTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskValue, settaskValue] = useState<string>('')
  
  const IdUser = JSON.parse(localStorage.getItem("id") || '')
  const { pathname } = useLocation()

  useEffect(() => {
    if (props.tasks) {
      setTasks(props.tasks.assigntasks)
    }
  }, [])

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

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const task = {
      description: taskValue,
      user: JSON.parse(localStorage.getItem("id") || '')
    }
    props.createTask(task, task.user)
  }

  const controlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    settaskValue(e.target.value)
  }

  const doneTasks = (task: Task) => {
    const updatedTask = { ...task, done: true, user: IdUser }
    props.checkTask("assingTasks-done", IdUser, updatedTask)
  }

  const unDoneTasks = (task: Task) => {
    const updatedTask = { ...task, done: false, user: IdUser }
    props.checkTask("assingTasks-done", IdUser, updatedTask)
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
