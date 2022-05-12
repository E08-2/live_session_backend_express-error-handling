import React, { useState } from "react";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateData = event => {
    switch (event.target.name) {
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

  const attemptLogin = async event => {
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

    // Make a POST request to the "/login" endpoint in our server...
    // ... and then handle the response from the server
    const response = await fetch("http://localhost:3001/login", settings);

    try {
      // If the request was successful
      if (response.ok) {
        const data = await response.json();
        props.setCurrentUserId(data.id);
        props.setIsLoggedIn(true);
      
      // If the request was unsuccessful
      } else {
        const errObj = await response.json();
        throw new Error(errObj.message);
      }
    } catch (err) {
      alert(err.message)
      setUsername("");
      setPassword("");
    }
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