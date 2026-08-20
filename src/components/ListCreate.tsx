import { useState, useEffect } from "react";
import { addClassListEvent } from "../helpers/libs";
import { Link, useLocation } from 'react-router-dom';
import { ListCreateProps, TodoList } from '../types';

export default function ListsCreator(props: ListCreateProps) {
  const [lists, setLists] = useState<TodoList[]>([])
  const [taskValue, settaskValue] = useState<string>('')
  const { pathname } = useLocation()

  useEffect(() => {
    if (props.tasks) {
      setLists(props.tasks.lists)
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

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const user = JSON.parse(localStorage.getItem("id") || '')
    const list = {
      name: taskValue
    }
    props.createList(list, user)
  }

  const controlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    settaskValue(e.target.value)
  }

  const listas = lists.length
    ?
    <div className="tasks-container" >
      {lists.map((item) => {
        return (
          <Link to={`/list-view/${item._id}`} className="task-item" key={item._id}>
            <div className="task-description">
              <div>{item.name}</div>
            </div>
            <span className="bi bi-caret-down-fill"></span>
          </Link>
        )
      }
      )}
    </div>
    : <div className="img-container" >
      <div className="icon-svg svg-today">
        <img src={'/backgrounds/mailbox.svg'} alt="" />
      </div>
    </div>

  return (
    <div className="importante-container">
      <div className="title-container" >
        <div className="title-item" >
          <span className="bi bi-card-checklist"></span>
          <span>Crear list</span>
        </div>
        <div className="title-settings" >
          <span className="bi bi-columns-gap" onClick={addClassListEvent}></span>
        </div>
      </div>
      <>
        {listas}
      </>
      <div className="input-add-task">
        <div className="input-container" >
          <form onSubmit={submit}>
            <input type="text" className="input-text-task" placeholder="Lista Nombre" onChange={(e) => controlState(e)} />
            <span className="bi bi-plus"></span>
          </form>
        </div>
      </div>
    </div>
  )
}
