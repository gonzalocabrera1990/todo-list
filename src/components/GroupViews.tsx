import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";
import { getHelper } from '../redux/fetchsHelpers';
import { baseUrl } from '../shared/baseUrl';


interface Props {
  tasks: any;
  updateTaskGroup: any;
  checkTask: any;
  sendGroupTask: any;
  addUserGroup: any;
  deleteListGroup: any;
  deleteUserGroup: any;
  deleteTaskGroup: any;
  backgrounds: any;
}
export default function GroupView(props: Props) {
  const { groupId } = useParams()
  const [group, setGroup] = useState<any>(null)
  const [taskValue, settaskValue] = useState()
  const [membersActive, setMembersActive] = useState(false)
  const [tasksActive, setTasksActive] = useState(false)


  const [deleteGroupConfirmation, setDeleteGroupConfirmation] = useState(false)

  const [search, setSearch] = useState<any>(null);
  const [searchAssing, setSearchAssign] = useState<any>(null);
  const [groupTask, setGroupTask] = useState<any>({
    description: "",
    appointed: null,
    due: ""
  });

  const [updateValue, setUpdateValue] = useState<any>({
    open: false,
    description: '',
    _id: null,
    task: null,
    done: null,
    seen: null,
    appointed: null,
    oldUser: null,
    due: null
  })
  const [deleteListConfirmation, setDeleteListConfirmation] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false);
  const { pathname } = useLocation()
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("id") || '')
  useEffect(() => {
    if (props.tasks) {
      setGroup(props.tasks.groups.filter((group: any) => (group._id == groupId))[0])
      setSearchAssign(props.tasks.groups.members)
      console.log(props.tasks.groups);

    }
  }, [props.tasks, groupId])
  useEffect(() => {
    if (props.backgrounds) {
      const element: any = document.querySelector('.list-container')
      const path = pathname.split('/')[1]
      const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
      element.style.backgroundColor = props.backgrounds[backgroundType]
    }
  }, [props.backgrounds])
  const submit = () => {
    let group = {
      name: taskValue,
      leader: JSON.parse(localStorage.getItem("id") || '')
    }
    // props.createGroup(group, group.leader)
  }
  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchLoading(true)
    const QUERY = e.target.value;
    if (QUERY.length) {
      return getHelper(`search/app-members?q=${QUERY}`)
        .then(json => {
          setSearch(json)
          setSearchLoading(false)
          console.log(json);
          console.log(json.length);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setSearch(null)
    }
  }
  const controlState = (e: any) => {
    const target = e.target;
    const value = target.value;
    settaskValue(value)
  }
  const setMembers = () => {
    setTasksActive(false)
    setMembersActive(true)
  }
  const setTasks = () => {
    setMembersActive(false)
    setTasksActive(true)
    console.log("membersActive", membersActive);
    console.log("tasksActive", tasksActive);
  }
  const resetGroup = () => {
    setMembersActive(false)
    setTasksActive(false)
    console.log("membersActive", membersActive);
    console.log("tasksActive", tasksActive);
  }
  const searchAssignUser = (e: any) => {
    let name = e.target.value
    let regex = new RegExp(name, 'i')
    if (name.length) {
      setSearchAssign(group.members.filter((user: any) => regex.test(user.usuario)))
    } else {
      setSearchAssign(null)
    }
  }
  const handleChange = (e: any) => {
    let desc = e.target.value
    console.log(desc);
    setGroupTask((prevstate: any) => ({
      ...prevstate,
      description: desc
    }))
  }
  const sendTask = () => {
    if (groupTask.description && groupTask.appointed && groupTask.due) {
      const taskGroupData = {
        description: groupTask.description,
        appointed: groupTask.appointed._id,
        due: groupTask.due,
        group: group._id
      }

      props.sendGroupTask(user, group._id, taskGroupData)
    }
  }
  const updateTasks = (obj: any) => {
    setUpdateValue((prev: any) => ({
      task: obj,
      _id: obj._id,
      description: obj.description,
      done: obj.done,
      due: obj.due,
      seen: obj.seen,
      appointed: obj.appointed,
      oldUser: obj.appointed._id,
      open: prev._id == obj._id && prev.open ? false : true
    }))
  }
  const submitUpdate = () => {
    let task = {
      _id: updateValue.task._id,
      description: updateValue.description,
      done: updateValue.done,
      due: updateValue.due,
      seen: false,
      appointed: updateValue.appointed,
      group: group._id
    }
    setSearchAssign(null)
    props.updateTaskGroup(user, updateValue.oldUser, task)
  }
  const markDone = () => {
    setUpdateValue((prev: any) => ({
      ...prev,
      done: !prev.done
    }))

  }
  const setNull = () => {
    setUpdateValue((prev: any) => ({
      open: false,
      description: '',
      _id: null,
      task: null,
      done: null,
      seen: null,
      appointed: null,
      oldUser: prev.oldUser,
      due: null
    }))
    setSearchAssign(null)
  }
  const controlUpdate = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setUpdateValue((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }
  const deleteTask = () => {
    setSearchAssign(null)
    props.deleteTaskGroup(user, updateValue.appointed._id, group._id, updateValue._id)
    setNull()
  }
  const deleteUserGroup = (item: string) => {
    props.deleteUserGroup(user, item, group._id)
  }
  const deleteGroup = () => {
    props.deleteListGroup("group-delete", user, group._id)
    return navigate("/groupcreator")
  }
  const doneTasks = (task: any) => {
    task.done = true
    props.checkTask("assingTasks-done", user, task)
  }

  const unDoneTasks = (task: any) => {
    task.done = false
    props.checkTask("assingTasks-done", user, task)
  }
  return (
    <div className="list-container">
      <div className="title-container" >
        <div className="title-item" >
          <span className="bi bi-people"></span>
          <span>Detalle del grupo</span>
        </div>
        <div className="title-settings" >
          <span className="bi bi-columns-gap" onClick={addClassListEvent}></span>
        </div>
      </div>
      {
        group ?

          group.leader._id == user ?
            <div className="group-container-list" >
              <div className="group-item" >
                <div className="group-description">
                  <div className="cursor" onClick={() => resetGroup()}>{group.name}</div>
                </div>
                {deleteGroupConfirmation ?
                  <>
                    <span>¿Quiere eliminar este Grupo?</span>
                    <input className='delete-list' type='button' value="Si" onClick={() => deleteGroup()} />
                    <input className='delete-list' type='button' value="No" onClick={() => setDeleteGroupConfirmation(false)} />
                  </>
                  :
                  <>
                    <div className="group-input-buscar">
                      <input type="text" name="" id="" placeholder="Agregar miembro" onChange={(e) => handleSearch(e)} />
                    </div>
                    <div className="group-bi">
                      <span className="bi bi-people-fill cursor" onClick={() => setMembers()}></span>
                      <span className="bi bi-plus cursor" onClick={() => setTasks()}></span>
                      <span className="bi bi-trash-fill cursor" onClick={() => setDeleteGroupConfirmation(true)}></span>
                    </div>
                  </>
                }
              </div>

              {!group.tasks ? null :
                <div className='group-actions-view'>

                  {membersActive ?
                    <>
                      <h3>Lider</h3>
                      <div className='create-task-user'>
                        <div className='create-task-user-image'>
                          <img src={baseUrl + `${group.leader.image.filename}`} alt="" />
                        </div>
                        <div className='create-task-user-name'>
                          {group.leader.username}
                        </div>
                      </div>
                      <h3>Miembros</h3>
                      <div className='group-members-container'>
                        {group.members.length ?
                          group.members.map((item: any) => {
                            return (
                              <div className='create-task-user' key={item._id}>
                                <div className='create-task-user-image'>
                                  <img src={baseUrl + `${item.image.filename}`} alt="" />
                                </div>
                                <div className='create-task-user-name'>
                                  {item.username}
                                </div>
                                <span className="delete-user-group bi bi-trash-fill cursor" onClick={() => deleteUserGroup(item._id)}></span>
                              </div>
                            )
                          })
                          :
                          <div className="img-container" >
                            <div className="icon-svg svg-today">
                              <img src={'/backgrounds/meet_the_team.svg'} alt="" />
                              <span>Sin miembros todavia.</span>
                            </div>
                          </div>}
                      </div>
                    </>
                    : null
                  }

                  {tasksActive ?
                    <div className='create-task-container'>
                      <div className='create-task-head'>
                        <div className='create-task-inputs'>
                          <div className="group-input-create">
                            <label htmlFor="description">Descripción</label>
                            <input type="text" name="description" id="description" placeholder="Descripcion de la tarea" value={groupTask.description} onChange={(e: any) => handleChange(e)} />
                          </div>
                          <div className="group-input-create">
                            <label htmlFor="member">Miembro</label>
                            {!groupTask.appointed ?
                              <input type="text" name="" id="member" placeholder="Agregar miembro" onChange={(e) => searchAssignUser(e)} />
                              : <div className='user-picked' ><span>{groupTask.appointed.username}</span><span className="bi bi-x-circle cursor" onClick={() => setGroupTask((prevstate: any) => ({
                                ...prevstate,
                                appointed: null
                              }))}></span></div>
                            }
                          </div>
                          <div className="group-input-create">
                            <label htmlFor="member">Fecha Limite</label>
                            <input type="date"
                              id="date"
                              name="date"
                              value={groupTask.due}
                              onChange={(e) => setGroupTask((prevstate: any) => ({
                                ...prevstate,
                                due: e.target.value
                              }))} />
                          </div>
                        </div>
                        <div className="group-input-add cursor" onClick={() => sendTask()}>
                          <span className='bi bi-plus-square'></span>
                        </div>
                      </div>
                      <div className='create-task-body'>
                        <div className='create-task-users'>
                          {
                            searchAssing ? searchAssing.map((user: any) => {
                              return (
                                <div onClick={() => setGroupTask((prevstate: any) => ({
                                  ...prevstate,
                                  appointed: user
                                }))} key={user._id} className='create-task-user'>
                                  <div className='create-task-user-image'>
                                    <img src={baseUrl + `${user.image.filename}`} alt="" />
                                  </div>
                                  <div className='create-task-user-name'>
                                    {user.username}
                                  </div>
                                </div>
                              )
                            }) : null
                          }
                        </div>
                      </div>
                    </div>
                    : null
                  }
                  {!tasksActive && !membersActive ?
                    search ?
                      search!.length ?

                        search.map((item: any) => {
                          console.log("item._id != user", item._id != user);

                          if (item._id != user) {
                            return (
                              <div className="search-item" key={item._id}>
                                <div className="search-description">
                                  <div className="search-item-image">
                                    <img className="" src={baseUrl + item.image.filename} alt="item" />
                                  </div>
                                  <div className="search-item-name">
                                    <span>{`${item.username}`}</span>
                                  </div>
                                </div>
                                {group.members.length && group.members.some((us: any) => us._id == item._id) ?
                                  <span className="bi bi-check"></span>
                                  :
                                  <span className="bi bi-plus cursor" onClick={() => props.addUserGroup(user, group._id, item._id)}></span>
                                }
                              </div>
                            )
                          }
                        })
                        :
                        <div className="img-container" >
                          <div className="icon-svg svg-today">
                            <img src={'/backgrounds/no-result.svg'} alt="" />
                            <span>Sin resultados.</span>
                          </div>
                        </div>

                      :
                      group.tasks.length ?
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
                            <div className="input-container-update">
                              <div className="input-label">
                                <label htmlFor="description">Cambiar descripcion</label>
                                <textarea id="description" name="description" value={updateValue.description} onChange={(e) => controlUpdate(e)} />
                              </div>
                            </div>
                            <div className="input-label">
                              <label htmlFor="member">Miembro</label>
                              {!updateValue.appointed ?
                                <input type="text" name="" id="member" placeholder="Agregar miembro" onChange={(e) => searchAssignUser(e)} />
                                : <div className='user-picked' ><span>{updateValue.appointed.username}</span><span className="bi bi-x-circle cursor" onClick={() => setUpdateValue((prevstate: any) => ({
                                  ...prevstate,
                                  appointed: null
                                }))}></span></div>
                              }
                            </div>
                            <div className='update-task-search'>
                              {
                                searchAssing ? searchAssing.map((user: any) => {
                                  return (
                                    <div onClick={() => setUpdateValue((prevstate: any) => ({
                                      ...prevstate,
                                      appointed: user
                                    }))} key={user._id} className='update-task-user'>
                                      <div className='update-task-user-image'>
                                        <img src={baseUrl + `${user.image.filename}`} alt="" />
                                      </div>
                                      <div className='update-task-user-name'>
                                        {user.username}
                                      </div>
                                    </div>
                                  )
                                }) : null
                              }
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
                          <div className="tasks-container" >
                            {group.tasks.map((item: any) => {
                              return (
                                <div className="task-item" key={item._id}>
                                  <div className="task-description">
                                    {
                                      item.appointed._id == user ?
                                        item.done ?
                                          <span className="done-mark bi bi-check done-mark-ckeck cursor" onClick={() => unDoneTasks(item)} ></span>
                                          :
                                          <span className="done-mark cursor" onClick={() => doneTasks(item)} ></span>
                                        :
                                        item.done ?
                                          <span className="done-mark bi bi-check done-mark-ckeck" ></span>
                                          :
                                          <span className="done-mark" ></span>
                                    }
                                    <div>
                                      <div>{item.description}</div>
                                      <span>{item.appointed.username}</span>
                                    </div>
                                  </div>
                                  <div className='due-item'>
                                    <div>{item.due}</div>
                                    <span onClick={() => updateTasks(item)} className="cursor bi bi-bar-chart-steps"></span>
                                  </div>
                                </div>
                              )
                            }
                            )}
                          </div>
                        :
                        <div className="img-container" >
                          <div className="icon-svg svg-today">
                            <img src={'/backgrounds/sent.svg'} alt="" />
                          </div>
                        </div>
                    :
                    null
                  }
                </div>
              }
            </div>
            :

            // para los no lider
            <div className="group-container-list" >
              <div className="group-item" >
                <div className="group-description">
                  <div className="cursor" onClick={() => resetGroup()}>{group.name}</div>
                </div>
                <div className="group-bi">
                  <span className="bi bi-people-fill cursor" onClick={() => setMembers()}></span>
                </div>

              </div>

              {!group.tasks ? null :
                <div className='group-actions-view'>
                  {membersActive ?
                    <>
                      <h3>Lider</h3>
                      <div className='create-task-user'>
                        <div className='create-task-user-image'>
                          <img src={baseUrl + `${group.leader.image.filename}`} alt="" />
                        </div>
                        <div className='create-task-user-name'>
                          {group.leader.username}
                        </div>
                      </div>
                      <h3>Miembros</h3>
                      <div className='group-members-container'>
                        {group.members.length ?
                          group.members.map((item: any) => {
                            return (
                              <div className='create-task-user' key={item._id}>
                                <div className='create-task-user-image'>
                                  <img src={baseUrl + `${item.image.filename}`} alt="" />
                                </div>
                                <div className='create-task-user-name'>
                                  {item.username}
                                </div>
                              </div>
                            )
                          })
                          :
                          <div className="img-container" >
                            <div className="icon-svg svg-today">
                              <img src={'/backgrounds/meet_the_team.svg'} alt="" />
                              <span>Sin miembros todavia.</span>
                            </div>
                          </div>}
                      </div>
                    </>
                    : null
                  }

                  {!tasksActive && !membersActive ?
                    // search ?
                    //   search!.length ?

                    //     search.map((item: any) => {
                    //       return (
                    //         <div className="search-item" key={item._id}>
                    //           <div className="search-description">
                    //             <div className="search-item-image">
                    //               <img className="" src={baseUrl + item.image.filename} alt="item" />
                    //             </div>
                    //             <div className="search-item-name">
                    //               <span>{`${item.username}`}</span>
                    //             </div>
                    //           </div>
                    //           <span className="bi bi-plus cursor" onClick={() => addUserGroup(item._id)}></span>
                    //         </div>
                    //       )
                    //     })
                    //     :
                    //     <div className="img-container" >
                    //       <div className="icon-svg svg-today">
                    //         <img src={'/backgrounds/no-result.svg'} alt="" />
                    //         <span>Sin resultados.</span>
                    //       </div>
                    //     </div>

                    //   :
                    group.tasks.length ?
                      <div className="tasks-container" >
                        {group.tasks.map((item: any) => {
                          return (
                            <div className="task-item" key={item._id}>
                              <div className="task-description">
                                {
                                  item.appointed._id == user ?
                                    item.done ?
                                      <span className="done-mark bi bi-check done-mark-ckeck cursor" onClick={() => unDoneTasks(item)} ></span>
                                      :
                                      <span className="done-mark cursor" onClick={() => doneTasks(item)} ></span>
                                    :
                                    item.done ?
                                      <span className="done-mark bi bi-check done-mark-ckeck" ></span>
                                      :
                                      <span className="done-mark" ></span>
                                }
                                <div>
                                  <div>{item.description}</div>
                                  <span>{item.appointed.username}</span>
                                </div>
                              </div>
                              <div >
                                <span>{item.due}</span>
                              </div>
                            </div>
                          )
                        }
                        )}
                      </div>
                      :
                      <div className="img-container" >
                        <div className="icon-svg svg-today">
                          <img src={'/backgrounds/sent.svg'} alt="" />
                        </div>
                      </div>
                    :
                    null
                  }
                </div>

              }
            </div>
          :
          null
      }
    </div>
  )
}
