import * as ActionTypes from "./ActionTypes";
import { getHelper, postHelperBody, postHelperMedia, putHelperBody, deleteHelper } from "./fetchsHelpers";

export const loginUser = (creds:any) => async (dispatch:any) => {
  // We dispatch requestLogin to kickoff the call to the API  
  dispatch(requestLogin(creds));
  postHelperBody("users/login", creds)
    .then(response => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify({username: creds.username}));
        localStorage.setItem("id", JSON.stringify(response.userdata._id));
        dispatch(fetchUser(response.userdata.username))
        dispatch(receiveLogin(response))
        return response.token
      } else {
        var error = new Error("Error " + response.status);
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)));
};
export const requestLogin = (creds:any) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  };
};
//se agrego userdata: response.user
export const receiveLogin = (response:any) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
    userdata: response
  };
};

export const loginError = (message:any) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    errMess: message
  };
};
//REGISTER POST DATA
export const signupUser =  (User:any) => async (dispatch:any) => {
  const newUser = {
    username: User.username,
    password: User.password,
    date: User.date,
    gender: User.gender,
    country: User.country,
    firstname: User.firstname,
    lastname: User.lastname
  };
  postHelperBody("users/signup", newUser)
    .then(response => {
      const Resp = response.status;
      dispatch(responseSignup(Resp));
    })
    .catch(error => {
      const Err = error.status;
      dispatch(errorSignup(Err));
    });
};
export const responseSignup = (creds:any) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: creds
  };
};
export const errorSignup = (creds:any) => {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    payload: creds
  };
};

// Logs the user out
export const logoutUser = () => (dispatch:any) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  localStorage.removeItem("id");
  dispatch(receiveLogout());
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
};


export const fetchUser = (id:string) => async (dispatch:any) => {
  dispatch(userLoading());
  getHelper(`users/get-home-user/${id}`)
    .then(response => {
      dispatch(receiveUser(response));
      const tasksDispatch = {
        tasks: response.tasks,
        todaytasks: response.todaytasks,
        favTasks: response.favTasks,
        datetasks: response.datetasks,
        lists: response.lists,
        groups: response.groups,
        assigntasks: response.assigntasks
      }
      dispatch(receiveTask(tasksDispatch));
      dispatch(Backgrounds(response.backgrounds));
    })
    .catch(error => dispatch(receiveUserError(error)));
};

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING
});

export const receiveUser = (response:any) => {
  return {
    type: ActionTypes.USER_SUCCESS,
    user: response
  };
};
export const receiveUserError = (error:any) => {
  return {
    type: ActionTypes.USER_ERROR,
    errMess: error
  };
};

export const createTask = (task:any, id:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-task/${id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const updateTask = (url: string, id:string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  putHelperBody(`tasks/${url}/${id}/${task._id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const checkTask = (url: string, id:string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  putHelperBody(`tasks/${url}/${id}/${task._id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const deleteTask = (url: string, id:string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  deleteHelper(`tasks/${url}/${id}/${task}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const createDateTask = (task:any, id:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-datetask/${id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const createFavTask = (task:any, id:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-favtask/${id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}

export const addFavTask = (task:any, userId:string, taskId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/add-favtask/${userId}/${taskId}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const dropFavTask = (task:any, userId:string, taskId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/drop-favtask/${userId}/${taskId}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const createGroup = (group:any, userId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-user-group/${userId}`, group)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const deleteTaskGroup = (userId:string, userTaskId:string, groupId:string, taskId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  deleteHelper(`tasks/task-group-delete/${userId}/${userTaskId}/${groupId}/${taskId}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const updateTaskGroup = (id:string, oldUser: string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  putHelperBody(`tasks/update-assingTasks/${id}/${oldUser}/${task._id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}


export const createList = (list:any, userId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-user-list/${userId}`, list)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const createTaskList = (userId:string, listId:any, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-task-list/${userId}/${listId}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const updateTaskList = (userId:string, listId:any, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/task-list-update/${userId}/${listId}/${task._id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const checkGroupTask = (url: string, userId: string, groupId:string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  putHelperBody(`tasks/${url}/${userId}/${groupId}/${task._id}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const sendGroupTask = (userId:string, groupId:string, task:any) => (dispatch:any) => {
  dispatch(taskLoading())
  postHelperBody(`tasks/create-tasks-group/${userId}/${groupId}`, task)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const addUserGroup = (userid: string, groupid: string, itemid: string) => (dispatch:any) => {
  getHelper(`tasks/add-user-group/${userid}/${groupid}/${itemid}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const deleteUserGroup = (userId:string, groupUser:string, groupId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  deleteHelper(`tasks/group-delete-user/${userId}/${groupUser}/${groupId}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const deleteTaskList = (userId:string, listId:string, taskId:string) => (dispatch:any) => {
  dispatch(taskLoading())
  getHelper(`tasks/task-list-delete/${userId}/${listId}/${taskId}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const deleteListGroup = (url:string, userId:string, id:string) => (dispatch:any) => {
  dispatch(taskLoading())
  deleteHelper(`tasks/${url}/${userId}/${id}`)
  .then((response)=>{
    const tasksDispatch = {
      tasks: response.tasks,
      todaytasks: response.todaytasks,
      favTasks: response.favTasks,
      datetasks: response.datetasks,
      lists: response.lists,
      groups: response.groups,
      assigntasks: response.assigntasks
    }
    dispatch(receiveTask(tasksDispatch));
  })
  .catch(error => dispatch(receiveTaskError(error)));
}
export const taskLoading = () => ({
  type: ActionTypes.TASKS_LOADING
});

export const receiveTask = (response:any) => {
  return {
    type: ActionTypes.TASKS_SUCCESS,
    payload: response
  };
};
export const receiveTaskError = (error:any) => {
  return {
    type: ActionTypes.TASKS_FAILED,
    errMess: error
  };
};
export const imagenUser = (userID:string, image:any) => async (_dispatch:any) => {
  postHelperMedia(`imagen/profile-image-post/change/${userID}`, image)
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      console.log("ERROR", error);
    });
};
export const changeBackgrounds = (id:any, data:string) => (dispatch:any) => {
  postHelperBody(`users/change-background/${id}`, data)
  .then((response)=>{
    dispatch(Backgrounds(response));
  })
  .catch(error => dispatch(BackgroundsFaild(error)));
}

export const Backgrounds = (response:any) => {
  return {
    type: ActionTypes.BACKGROUNDS_SUCCESS,
    payload: response
  };
};
export const BackgroundsFaild = (response:any) => {
  return {
    type: ActionTypes.BACKGROUNDS_FAILED,
    errmess: response
  };
};
export const search = (data:any, textoBusqueda:string) => (dispatch:any) => {
  if(!textoBusqueda.length){
    dispatch(searchSuccess([]));
    return;
  }
  let resultados:any = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let conditional = data[i][j].description.includes(textoBusqueda)
      if (conditional) {
        resultados.unshift(data[i][j])
      }
    }
    
  }
  dispatch(searchSuccess(resultados));
}
export const searchLoading = () => ({
  type: ActionTypes.SEARCH_LOADING,
});
export const searchSuccess = (result:any) => ({
  type: ActionTypes.SEARCH_SUCCESS,
  payload:result
});
export const searchFiled = (result:any) => ({
  type: ActionTypes.SEARCH_FAILED,
  payload:result
});

