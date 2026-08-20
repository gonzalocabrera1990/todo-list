import { useEffect } from 'react'
import { addClassListEvent } from "../helpers/libs";
import { useLocation } from 'react-router-dom';
import { HomeProps } from '../types';

export default function Home(props: HomeProps) {
  const { pathname } = useLocation()

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

  return (
    <div className="importante-container">
      <div className="title-container" >
        <div className="title-item" >
          <span className="bi bi-sun"></span>
          <span>Tareas</span>
        </div>
        <div className="title-settings" onClick={addClassListEvent}>
          <span className="bi bi-columns-gap"></span>
        </div>
      </div>
      <div className="icon-svg svg-tasks">
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
