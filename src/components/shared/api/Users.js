import { FetchAll, Insert, Update, Delete } from './Common'

const uri = process.env.REACT_APP_BACK_END + "/api/users"

export const FetchUsers = (callback) => {
  FetchAll(uri, callback);
}

export const InsertUser = (body, callback) => {
  Insert(uri, body, callback);
}

export const UpdateUser = (id, body, callback) => {  
  Update(uri+"/"+id, body, callback);
}

export const DeleteUser = (id, callback) => {
  Delete(uri+"/"+id, callback);
}

export const Login = (username, password, callback) => {
  fetch(uri+"/login", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({
        'username': username,
        'password': password
    })
  })        
  .then(res => res.json())
  .then((data) => { callback(data); })
  .catch(() => callback(null))
}