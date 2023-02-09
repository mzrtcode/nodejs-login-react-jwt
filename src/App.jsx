import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import logo from './assets/logo.png'
import { registerUser, logInUser, checkAuthentication } from "./helpers/user.helper";
function App() {

  const [checkAuthenticated, setCheckAuthenticated] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const handleSubmitRegister = (e) =>{
    e.preventDefault()
    setUsername(e.target.username.value)
    setPassword(e.target.password.value)
    
    
    registerUser(username,password)
  }

  const handleSubmitLogin = (e) =>{
    e.preventDefault()
    
    setUsername(e.target.username.value)
    setPassword(e.target.password.value)
    setCheckAuthenticated(true)

    logInUser(username,password)
  }



  return (
    <div className="container">

<figure>
<img src={logo} alt="Logo JWT" />
</figure>
     
      <div className="content">
        <form action="/register" method="POST" className="mb-3" onSubmit={handleSubmitRegister}>
          <h2>Registration</h2>
          <input
            type="username"
            className="form-control"
            id="exampleFormControlInput1"
            name="username"
            placeholder="Username"
          />

          <input
     
            type="password"
            className="form-control mt-2"
            id="exampleFormControlInput1"
            name="password"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-info mt-2">Register</button>
        </form>

        </div>

  <div className="content mt-4">
        <form action="/auth" method="POST" className="mb-3" onSubmit={handleSubmitLogin}>
          <h2>Login</h2>
          <input
          onChange={(e)=>{setUsername(e.target.value)}}
          value={username}
            type="text"
            name="username"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Username"
          />

          <input
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
            type="password"
            name="password"
            className="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="Password"
          />
          
          <button  type="submit" className="btn btn-primary mt-2">Log In</button>
        </form>
        {(checkAuthenticated) && <div className="col-md-12 text-center"><button onClick={checkAuthentication} className="btn btn-outline-danger">Check if Authenticated</button></div> }
        </div>

  
      
        
    </div>
  );
}

export default App;
