import React, { useState } from "react";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateData = event => {
    switch(event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  const updateShowLogin = () => {
    props.setShowLogin(false);
  }

  const attemptLogin = event => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password
    }

    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch("http://localhost:3001/login", settings)
    .then(response => response.json())
    .then(data => {
      console.log("Response to login attempt", data);
      // If we found a user in the db with the same username and password as the login data
      // Log the user in
      if (data.id.length > 0) {
        props.setCurrentUserId(data.id);
        props.setIsLoggedIn(true);
      // If we found no user in the db with the same username and password as the login data
      // Display an alert informing the user of this
      } else {
        alert("Could not log you in - please try again!");
        setUsername("");
        setPassword("");
      }
    })
    
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={attemptLogin}>
        <div>
          <label>Username</label>
          <input name="username" onChange={updateData} value={username} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>

        <button>Sign In</button>
      </form>

      <button onClick={updateShowLogin}>Not registered yet? Register for an account!</button>
    </div>
  )
}

export default Login;