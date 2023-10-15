import { baseUrl } from "../shared/baseUrl";

export const getHelper = (url:any) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  console.log('bearerbe',bearer);
  
  return fetch(baseUrl + url, {
    method: "GET",
    headers: {
      'Authorization': bearer
    },
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        // error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
}
export const postHelperBody = (url:any, creds:any) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    body: JSON.stringify(creds)
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          // error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
}
export const postHelperMedia = (url:any, creds:any) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: "POST",
    body: creds,
    headers: {
      'Authorization': bearer
    }
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          // error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
}
export const putHelperBody = (url:any, creds:any) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + url , {
    method: "PUT",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error(
          "Setting Error " + response.status + ": " + response.statusText
        );
        // error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
}
export const deleteHelper = (url:any) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + url, {
    method: "DELETE",
    headers: {
      'Authorization': bearer,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        // error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(result => {
      return result
    })
    .catch(error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
}