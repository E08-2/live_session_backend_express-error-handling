import React, { useState } from "react";

const Register = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const updateData = event => {
      switch(event.target.name) {
        case "username":
          setUsername(event.target.value);
          break;
        case "password":
          setPassword(event.target.value);
          break;
        case "firstName":
          setFirstName(event.target.value);
          break;
        case "lastName":
          setLastName(event.target.value);
          break;
        case "email":
          setEmail(event.target.value);
          break;
        default:
          break;
      }
    }
  
    const registerUser = event => {
      event.preventDefault();

      // Create a "new user" object using the data the user entered in the form
      const newUser = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailAddress: email
      }
      
      // Create a "settings" object to define our POST request
      const settings = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      }

      // Make a POST request to the "/register" endpoint in our server
      fetch("http://localhost:3001/register", settings)
      .then(response => response.json())
      .then(data => {
        // When the server sends a response, log the data in the response object
        console.log("New registered user", data);
        props.setCurrentUserId(data.id);
        props.setIsLoggedIn(true);
      })
    }

    const updateShowLogin = () => {
      props.setShowLogin(true);
    }

    return (
    <div>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <div>
          <label>Username</label>
          <input name="username" onChange={updateData} value={username} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>
        <div>
          <label>First Name</label>
          <input name="firstName" onChange={updateData} value={firstName} />
        </div>
        <div>
          <label>Last Name</label>
          <input name="lastName" onChange={updateData} value={lastName} />
        </div>
        <div>
          <label>Email Address</label>
          <input name="email" onChange={updateData} value={email} />
        </div>

        <button>Register an account</button>
      </form>

      <button onClick={updateShowLogin}>Already registered? Log in to your account!</button>
    </div>
  )
}

export default Register;