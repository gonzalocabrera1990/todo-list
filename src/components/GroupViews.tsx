import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { addClassListEvent } from "../helpers/libs";
import { getHelper } from '../redux/fetchsHelpers';
import { baseUrl } from '../shared/baseUrl';
import { GroupViewsProps, Task, User, Group } from '../types';

interface GroupTaskState {
  description: string;
  appointed: User | null;
  due: string;
}

interface GroupUpdateValue {
  open: boolean;
  description: string;
  _id: string | null;
  task: Task | null;
  done: boolean | null;
  seen: boolean | null;
  appointed: User | null;
  oldUser: string | null;
  due: string | null;
}

export default function GroupView(props: GroupViewsProps) {
  const { groupId } = useParams<{ groupId: string }>()
  const [group, setGroup] = useState<Group | null>(null)
  const [membersActive, setMembersActive] = useState(false)
  const [tasksActive, setTasksActive] = useState(false)

  const [deleteGroupConfirmation, setDeleteGroupConfirmation] = useState(false)

  const [search, setSearch] = useState<User[] | null>(null);
  const [searchAssing, setSearchAssign] = useState<User[] | null>(null);
  const [groupTask, setGroupTask] = useState<GroupTaskState>({
    description: "",
    appointed: null,
    due: ""
  });

  const [updateValue, setUpdateValue] = useState<GroupUpdateValue>({
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
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("id") || '')

  useEffect(() => {
    if (props.tasks) {
      const foundGroup = props.tasks.groups.filter((grp) => (grp._id == groupId))[0]
      setGroup(foundGroup || null)
      if (foundGroup) {
        setSearchAssign(foundGroup.members)
      }
    }
  }, [props.tasks, groupId])

  useEffect(() => {
    if (props.backgrounds) {
      const element = document.querySelector<HTMLElement>('.list-container')
      const path = pathname.split('/')[1]
      const backgroundType = path == "list-view" ? "listcreator" : path == "group-view" ? "groupcreator" : path
      if (element) {
        element.style.backgroundColor = props.backgrounds[backgroundType]
      }
    }
  }, [props.backgrounds])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const QUERY = e.target.value;
    if (QUERY.length) {
      return getHelper(`search/app-members?q=${QUERY}`)
        .then((json: User[]) => {
          setSearch(json)
        })
        .catch((err: Error) => {
          console.log(err)
        })
    } else {
      setSearch(null)
    }
  }

  const setMembers = () => {
    setTasksActive(false)
    setMembersActive(true)
  }

  const setTasks = () => {
    setMembersActive(false)
    setTasksActive(true)
  }

  const resetGroup = () => {
    setMembersActive(false)
    setTasksActive(false)
  }

  const searchAssignUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const regex = new RegExp(name, 'i')
    if (name.length && group) {
      setSearchAssign(group.members.filter((usr) => regex.test(usr.username)))
    } else {
      setSearchAssign(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const desc = e.target.value
    setGroupTask((prevstate) => ({
      ...prevstate,
      description: desc
    }))
  }

  const sendTask = () => {
    if (groupTask.description && groupTask.appointed && groupTask.due && group) {
      const taskGroupData = {
        description: groupTask.description,
        appointed: groupTask.appointed._id,
        due: groupTask.due,
        group: group._id
      }
      props.sendGroupTask(user, group._id, taskGroupData)
    }
  }

  const updateTasks = (obj: Task) => {
    setUpdateValue((prev) => ({
      task: obj,
      _id: obj._id,
      description: obj.description,
      done: obj.done,
      due: obj.due || null,
      seen: obj.seen || null,
      appointed: obj.appointed || null,
      oldUser: obj.appointed?._id || null,
      open: prev._id == obj._id && prev.open ? false : true
    }))
  }

  const submitUpdate = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!group || !updateValue.task) return
    const task = {
      _id: updateValue.task._id,
      description: updateValue.description,
      done: updateValue.done!,
      due: updateValue.due!,
      seen: false,
      appointed: updateValue.appointed!,
      group: group._id
    }
    setSearchAssign(null)
    props.updateTaskGroup(user, updateValue.oldUser!, task)
  }

  const markDone = () => {
    setUpdateValue((prev) => ({
      ...prev,
      done: !prev.done
    }))
  }

  const setNull = () => {
    setUpdateValue((prev) => ({
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

  const controlUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateValue((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const deleteTask = () => {
    setSearchAssign(null)
    props.deleteTaskGroup(user, updateValue.appointed!._id, group!._id, updateValue._id!)
    setNull()
  }

  const deleteUserGroup = (item: string) => {
    props.deleteUserGroup(user, item, group!._id)
  }

  const deleteGroup = () => {
    props.deleteListGroup("group-delete", user, group!._id)
    return navigate("/groupcreator")
  }

  const doneTasks = (task: Task) => {
    const updatedTask = { ...task, done: true }
    props.checkTask("assingTasks-done", user, updatedTask)
  }

  const unDoneTasks = (task: Task) => {
    const updatedTask = { ...task, done: false }
    props.checkTask("assingTasks-done", user, updatedTask)
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
                          <img src={baseUrl + `${group.leader.image?.filename}`} alt="" />
                        </div>
                        <div className='create-task-user-name'>
                          {group.leader.username}
                        </div>
                      </div>
                      <h3>Miembros</h3>
                      <div className='group-members-container'>
                        {group.members.length ?
                          group.members.map((item) => {
                            return (
                              <div className='create-task-user' key={item._id}>
                                <div className='create-task-user-image'>
                                  <img src={baseUrl + `${item.image?.filename}`} alt="" />
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
                            <input type="text" name="description" id="description" placeholder="Descripcion de la tarea" value={groupTask.description} onChange={(e) => handleChange(e)} />
                          </div>
                          <div className="group-input-create">
                            <label htmlFor="member">Miembro</label>
                            {!groupTask.appointed ?
                              <input type="text" name="" id="member" placeholder="Agregar miembro" onChange={(e) => searchAssignUser(e)} />
                              : <div className='user-picked'><span>{groupTask.appointed.username}</span><span className="bi bi-x-circle cursor" onClick={() => setGroupTask((prevstate) => ({
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
                              onChange={(e) => setGroupTask((prevstate) => ({
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
                            searchAssing ? searchAssing.map((usr) => {
                              return (
                                <div onClick={() => setGroupTask((prevstate) => ({
                                  ...prevstate,
                                  appointed: usr
                                }))} key={usr._id} className='create-task-user'>
                                  <div className='create-task-user-image'>
                                    <img src={baseUrl + `${usr.image?.filename}`} alt="" />
                                  </div>
                                  <div className='create-task-user-name'>
                                    {usr.username}
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

                        search.map((item) => {
                          if (item._id != user) {
                            return (
                              <div className="search-item" key={item._id}>
                                <div className="search-description">
                                  <div className="search-item-image">
                                    <img className="" src={baseUrl + (item.image?.filename || '')} alt="item" />
                                  </div>
                                  <div className="search-item-name">
                                    <span>{`${item.username}`}</span>
                                  </div>
                                </div>
                                {group.members.length && group.members.some((us) => us._id == item._id) ?
                                  <span className="bi bi-check"></span>
                                  :
                                  <span className="bi bi-plus cursor" onClick={() => props.addUserGroup(user, group._id, item._id)}></span>
                                }
                              </div>
                            )
                          }
                          return null
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
                                value={updateValue.due || ''}
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
                                : <div className='user-picked'><span>{updateValue.appointed.username}</span><span className="bi bi-x-circle cursor" onClick={() => setUpdateValue((prevstate) => ({
                                  ...prevstate,
                                  appointed: null
                                }))}></span></div>
                              }
                            </div>
                            <div className='update-task-search'>
                              {
                                searchAssing ? searchAssing.map((usr) => {
                                  return (
                                    <div onClick={() => setUpdateValue((prevstate) => ({
                                      ...prevstate,
                                      appointed: usr
                                    }))} key={usr._id} className='update-task-user'>
                                      <div className='update-task-user-image'>
                                        <img src={baseUrl + `${usr.image?.filename}`} alt="" />
                                      </div>
                                      <div className='update-task-user-name'>
                                        {usr.username}
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
                            {group.tasks.map((item) => {
                              return (
                                <div className="task-item" key={item._id}>
                                  <div className="task-description">
                                    {
                                      item.appointed?._id == user ?
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
                                      <span>{item.appointed?.username}</span>
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
                          <img src={baseUrl + `${group.leader.image?.filename}`} alt="" />
                        </div>
                        <div className='create-task-user-name'>
                          {group.leader.username}
                        </div>
                      </div>
                      <h3>Miembros</h3>
                      <div className='group-members-container'>
                        {group.members.length ?
                          group.members.map((item) => {
                            return (
                              <div className='create-task-user' key={item._id}>
                                <div className='create-task-user-image'>
                                  <img src={baseUrl + `${item.image?.filename}`} alt="" />
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
                    group.tasks.length ?
                      <div className="tasks-container" >
                        {group.tasks.map((item) => {
                          return (
                            <div className="task-item" key={item._id}>
                              <div className="task-description">
                                {
                                  item.appointed?._id == user ?
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
                                  <span>{item.appointed?.username}</span>
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
