const uri = "/api/users"

export const FetchUsersList = (callback)=>{
    fetch(uri)
    .then(res => res.json())
    .then((data) => { callback(data); })
}
