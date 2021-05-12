import Auth from '../shared/Auth'

const uri = "/api/orders"

export const FetchOrderList = (callback)=>{
  if(!Auth.loginStatus) { return; }
  fetch(uri, {headers : {'Authorization': 'Bearer ' + Auth.token}})
  .then(res => res.json())
  .then((data) => { callback(data); })
}

export const PostNewOrder = (order, cb)=>{
  if(!Auth.loginStatus) { return; }
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Bearer ' + Auth.token,
    },
    body: JSON.stringify(order)})
  .then((data) => { cb(data); })
}