import Auth from '../shared/Auth'

const uri = process.env.REACT_APP_BACK_END + "/api/clients"

export const FetchClientList = (callback)=>{
  if(!Auth.loginStatus) {return;}
  fetch(uri, {headers : {'Authorization': 'Bearer ' + Auth.token}})
  .then(res => res.json())
  .then((data) => { callback(data); })
}

export const FetchClientById = (id, callback)=>{
  if(!Auth.loginStatus) {return;}
    fetch(uri + id, {headers : {'Authorization': 'Bearer ' + Auth.token}})
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const PostNewClient = (client, cb)=>{  
  if(!Auth.loginStatus) {return;}
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + Auth.token,
    },
    body: JSON.stringify(client)})
  .then((data) => { cb(data); })
}

export const FilterClientList = (filter)=>{
  if(!Auth.loginStatus) {return;}
  return fetch(uri + "?filter=" + filter, {headers : {'Authorization': 'Bearer ' + Auth.token}})
        .then(res => res.json());
}
