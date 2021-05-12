import Auth from '../shared/Auth'

const uri = process.env.REACT_APP_BACK_END + "/api/materials"

export const FetchMaterialList = (callback)=>{
  if(!Auth.loginStatus) {return;}
  fetch(uri, {headers : {'Authorization': 'Bearer ' + Auth.token}})
  .then(res => res.json())
  .then((data) => { callback(data); })
}

export const PostNewMaterial = (order, cb)=>{ 
  if(!Auth.loginStatus) { return; }
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify(order)})
  .then((data) => { cb(data); })
  }