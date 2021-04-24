const uri = "/api/clients"

export const FetchClientList = (callback)=>{
    fetch(uri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const FetchClientById = (id, callback)=>{
    fetch(uri + id)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const PostNewClient = (client, cb)=>{  
  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify(client)})
  .then((data) => { cb(data); })
}

export const FilterClientList = (filter)=>{
  return fetch(uri + "?filter=" + filter)
        .then(res => res.json());
}
