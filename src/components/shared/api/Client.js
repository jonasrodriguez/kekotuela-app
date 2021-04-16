
export const FetchClientList = (callback)=>{
    fetch('http://localhost:3001/clients')
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const FetchClientById = (id, callback)=>{
    fetch('http://localhost:3001/clients/' + id)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const PostNewClient = (client, cb)=>{  
  fetch('http://localhost:3001/clients', {
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
  return fetch("http://localhost:3001/clients?filter=" + filter)
        .then(res => res.json());
}
