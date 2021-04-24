const uri = "/api/orders"

export const FetchOrderList = (callback)=>{
    fetch(uri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const GetUniqueReadableId = ()=>{
    fetch(uri)
    .then(res => res.json())
}

export const PostNewOrder = (order, cb)=>{  
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