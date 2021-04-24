const uri = "/api/materials"

export const FetchMaterialList = (callback)=>{
    fetch(uri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const PostNewMaterial = (order, cb)=>{  
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