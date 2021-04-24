const uri = "/api/notes"

export const FetchNoteList = (callback)=>{
    fetch(uri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}

export const PostNewNote = (order, cb)=>{  
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