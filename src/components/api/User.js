import Auth from '../shared/Auth'

const uri = process.env.REACT_APP_BACK_END + "/api/users"

export const Login = (username, password, callback) => {
    fetch(uri+"/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })        
    .then(res => res.json())
    .then((data) => { callback(data); })
    .catch(() => callback(null))
}

export const FetchUsersList = (callback)=>{
    if(!Auth.loginStatus) { return; }
    
    fetch(uri, {headers : {'Authorization': 'Bearer ' + Auth.token}})
    .then(res => res.json())
    .then((data) => { callback(data); })
}
