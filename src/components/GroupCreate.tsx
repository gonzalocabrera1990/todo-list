import { useState, useEffect } from "react";
import { addClassListEvent } from "../helpers/libs";
import { Link, useLocation } from "react-router-dom";
import { GroupCreateProps, Group } from '../types';

export default function GroupCreator(props: GroupCreateProps) {
  const [groups, setGroups] = useState<Group[]>([])
  const [taskValue, settaskValue] = useState<string>('')
  const { pathname } = useLocation()

  useEffect(() => {
    if (props.tasks) {
      setGroups(props.tasks.groups)
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
    const group = {
      name: taskValue,
      leader: JSON.parse(localStorage.getItem("id") || '')
    }
    props.createGroup(group, group.leader)
  }

  const controlState = (e: React.ChangeEvent<HTMLInputElement>) => {
    settaskValue(e.target.value)
  }

  const grupos = groups.length
    ?
    <div className="tasks-container" >
      {groups.map((item) => {
        return (
          <Link to={`/group-view/${item._id}`} className="task-item" key={item._id}>
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
          <span className="bi bi-people"></span>
          <span>Crear grupo</span>
        </div>
        <div className="title-settings" >
          <span className="bi bi-columns-gap" onClick={addClassListEvent}></span>
        </div>
      </div>
      <>
        {grupos}
      </>
      <div className="input-add-task">
        <div className="input-container" >
          <form onSubmit={submit}>
            <input type="text" className="input-text-task" placeholder="Grupo Nombre" onChange={(e) => controlState(e)} />
            <span className="bi bi-plus"></span>
          </form>
        </div>
      </div>
    </div>
  )
}
