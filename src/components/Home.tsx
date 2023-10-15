import { useEffect } from 'react'
import { addClassListEvent } from "../helpers/libs";
import { useLocation } from 'react-router-dom';

interface Props {
  user: any;
  logoutUser: any;
  backgrounds: any;
}


export default function Home(props: Props) {
  console.log("PROPS", props.user);
  const { pathname } = useLocation()
  useEffect(() => {
    if (props.backgrounds) {
        const element:any = document.querySelector('.importante-container')
        const path = pathname.split('/')[1]
        const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
        console.log("element", element);
        console.log("path", path);
        console.log("backgroundType", backgroundType);
        console.log("props.backgrounds[backgroundType]", props.backgrounds[backgroundType]);
        
       
        element.style.backgroundColor = props.backgrounds[backgroundType]
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
