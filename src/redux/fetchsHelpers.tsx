import { baseUrl } from "../shared/baseUrl";

export const getHelper = (url: string): Promise<any> => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
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

export const postHelperBody = (url: string, creds: unknown): Promise<any> => {
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

export const postHelperMedia = (url: string, creds: FormData): Promise<any> => {
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

export const putHelperBody = (url: string, creds: unknown): Promise<any> => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return fetch(baseUrl + url, {
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

export const deleteHelper = (url: string): Promise<any> => {
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
