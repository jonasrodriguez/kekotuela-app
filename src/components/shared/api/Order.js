const orderUri = "http://localhost:3001/orders"

export const FetchOrderList = (callback)=>{
    fetch(orderUri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const GetUniqueReadableId = ()=>{
    fetch(orderUri)
    .then(res => res.json())
}

export const PostNewOrder = (order, cb)=>{  
    fetch(orderUri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
      body: JSON.stringify(order)})
    .then((data) => { cb(data); })
  }