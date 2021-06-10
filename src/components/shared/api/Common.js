import Auth from '../Auth'

export const FetchAll = (uri, cb)=>{
  if(!Auth.loginStatus) {return;}
  fetch(uri, {headers : {'Authorization': 'Bearer ' + Auth.token}})
  .then(res => res.json())
  .then((data) => { cb(data); })
}

export const FetchQuery = (uri, query, cb)=>{
  if(!Auth.loginStatus) {return;}
  fetch(uri+'?'+query, {headers : {'Authorization': 'Bearer ' + Auth.token}})
  .then(res => res.json())
  .then((data) => { cb(data); })
}

export const Insert = (uri, body, cb)=>{ 
  if(!Auth.loginStatus) { return; }
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + Auth.token
    },
    body: JSON.stringify(body)})
  .then((data) => { cb(data); })
}

export const Update = (uri, body, cb)=>{
  if(!Auth.loginStatus) { return; }
  fetch(uri, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + Auth.token,
    },
    body: JSON.stringify(body)})
  .then((data) => { cb(data); })
}

export const Delete = (uri, callback)=>{
  if(!Auth.loginStatus) { return; }
  fetch(uri, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + Auth.token
    }
  })
  .then(response => callback(response));
}   