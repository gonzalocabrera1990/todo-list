import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { baseUrl } from "../shared/baseUrl";
import { HeaderProps, Task, Group } from '../types';

export default function Navbar(props: HeaderProps) {
  const [tasks, setTasks] = useState(props.tasks)
  const [stateSearch, setStateSearch] = useState<string>("")
  const [assignTasks, setAssignTasks] = useState<{
    amount: number;
    noSeen: boolean;
  }>({
    amount: 0,
    noSeen: false
  })
  const navigate = useNavigate();

  const userId = (() => {
    try {
      return JSON.parse(localStorage.getItem("id") || 'null')
    } catch {
      return null
    }
  })()
    const userToken = (() => {
    try {
      return localStorage.getItem("token")
    } catch {
      return null
    }
  })()

  useEffect(() => {
    if (!props.tasks || !userId) return

    setTasks(props.tasks)

    const groups = props.tasks.groups || []
    const unreadCount = groups.reduce((totalAcc: number, group: Group) => {
      const groupTasks = group?.tasks || []
      const countInGroup = groupTasks.filter(
        (task: Task) => String(task.appointed?._id) === String(userId) && !task.seen
      ).length
      return totalAcc + countInGroup
    }, 0)

    setAssignTasks({
      amount: unreadCount,
      noSeen: unreadCount > 0
    })
  }, [props.tasks, userId])

  const showGroup = () => {
    const element = document.getElementById('grupos')
    element?.classList.toggle('show')
  }

  const showList = () => {
    const element = document.getElementById('listas')
    element?.classList.toggle('show')
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files[0]) return
    const loadProfile = files[0]
    const leader = JSON.parse(localStorage.getItem("id") || '')
    const filedata = new FormData();
    filedata.append('image', loadProfile, loadProfile.name);
    props.imagenUser(leader, filedata)
  }

  const searchFocus = () => {
    navigate('/searchView')
  }

  const readTasks = () => {
    fetch(`${baseUrl}tasks/read-tasks/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 2. Envías el token con la palabra 'Bearer ' antes
      'Authorization': `Bearer ${userToken}` 
    }
  })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const searchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setStateSearch(query)
    if (!props.tasks) return
    const obj = [
      props.tasks.assigntasks,
      props.tasks.datetasks,
      props.tasks.favTasks,
      props.tasks.tasks
    ]
    props.search(obj, query)
  }

  return (
    <div className="navbar-container" >
      <div className="ver-list">
        {props.user.user ?

          <form encType="multipart/form-data">
            <div className="info-user">
              <div className="imagen-user">
                <label htmlFor="img">
                  <img src={`${baseUrl}${props.user.user.image?.filename}`} alt="" />
                </label>
              </div>
              <div className="data-user">
                <div>
                  <h1>{props.user.user.firstname} {props.user.user.lastname}</h1>
                  <span onClick={props.logoutUser} className="bi bi-box-arrow-left"></span>
                </div>
                <span className="email">{props.user.user.username}</span>
              </div>
              <input
                type="file"
                id="img"
                name="image"
                className="btn-success"
                onChange={(e) => handleSubmit(e)}
                style={{ display: "none" }}
              />
            </div>
          </form>

          : null
        }
        {tasks ?
          <>
            <div className="input-buscar">
              <input type="text" placeholder="Buscar Tarea" value={stateSearch} onFocus={searchFocus} onChange={(e) => searchSubmit(e)} />
            </div>
            <div className="task-panel">
              <Link to='/home' className="mi-dia">
                <span className="bi bi-sun"></span>
                <span className="">Mi dia</span>
              </Link>
              <Link to='/importants' className="importante">
                <span className="bi bi-star"></span>
                <span className="" >Importante</span>
              </Link>
              <Link to='/whitdate' className="planeado">
                <span className="bi bi-journal-bookmark"></span>
                <span className="" >Planeado</span>
              </Link>
              {
                assignTasks.noSeen ?

                  <Link to='/mytasks' className="asignado-a-mi" onClick={readTasks}>
                    <div className="asignado-a-mi-link">
                      <span className="bi bi-person"></span>
                      <span className="" >Asignado a mi</span>
                    </div>
                    <span className="asignado-a-mi-numero">{assignTasks.amount}</span>
                  </Link>
                  :

                  <Link to='/mytasks' className="asignado-a-mi">
                    <div className="asignado-a-mi-link">
                      <span className="bi bi-person"></span>
                      <span className="" >Asignado a mi</span>
                    </div>
                  </Link>

              }
              <Link to='/alltasks' className="tareas">
                <span className="bi bi-house-door"></span>
                <span className="" >Tareas</span>
              </Link>
              {tasks.groups.length ?
                <div className="grupos-container" >
                  <div>
                    <span className="bi bi-people"></span>
                    <span className="" >Grupos</span>
                  </div>
                  <div onClick={showGroup} className="cursor" >
                    <span className="bi bi-caret-down-fill"></span>
                  </div>
                  <div className="grupos" id="grupos">
                    {
                      tasks.groups.map((group) => {
                        return <Link to={`/group-view/${group._id}`} key={group._id}><div >{group.name}</div></Link>
                      })
                    }
                  </div>
                </div>
                :
                null
              }
              {tasks.lists.length ?
                <div className="listas-container" >
                  <div>
                    <span className="bi bi-card-checklist"></span>
                    <span className="" >Listas</span>
                  </div>
                  <div onClick={showList} className="cursor">
                    <span className="bi bi-caret-down-fill"></span>
                  </div>
                  <div className="listas" id="listas">
                    {
                      tasks.lists.map((list) => {
                        return <Link to={`/list-view/${list._id}`} key={list._id}>{list.name}</Link>
                      })
                    }
                  </div>
                </div>
                :
                null
              }
            </div>
          </>
          :
          null
        }
      </div>
      <div className="create-list">
        <Link to={'/listcreator'} className="create-list-input">
          <span className="bi bi-plus"></span>
          <span>Nueva Lista</span>
        </Link>
        <Link to={'/groupcreator'}>
          <span className="bi bi-patch-plus" title="Crear Grupo" ></span>
        </Link>
      </div>
    </div>
  )
}
