import axios from 'axios'
const URL = 'http://localhost:3000'

export const registerUser = (username,password) =>{
    axios(`${URL}/register`,{
        method: 'POST',
        data:{
            username,
            password
        }
    }).then(data => console.log(data.data)).catch((err)=>console.log(err))
}

export const logInUser = (username,password) =>{

    axios(`${URL}/login`,{
        method: 'POST',
        data:{
            username,
            password
        }
    }).then(data => {
        console.log(data)
        localStorage.setItem("token", data.data.token)
    }).catch((err)=>console.log(err))
}

export const checkAuthentication = () =>{

    const token = localStorage.getItem("token")
    axios(`${URL}/profile`,{
        method: 'GET',
        headers:{
            'x-access-token': token
        }
    }).then(data => {
       alert(JSON.stringify(data.data))
    }).catch((err)=>console.log(err))
}