import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ toggleForm, setCurrentUser, setCurrentToken, setUserID, setHabitID, myStorage }) => {

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const response = await fetch("http://localhost:5000/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const res = await response.json();
    console.log(res)

    const habitCreated = await fetch(`http://localhost:5000/habit/${res.user._id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${res.token}`}
    })
    const habitAvail = await habitCreated.json();
    console.log(habitAvail);
    if(habitAvail.length !== 0) {
      myStorage.setItem("habitID", habitAvail[0]._id);
      setHabitID("habitID", habitAvail[0]._id);
    }
    
    if (res.user.username) {
      myStorage.setItem("username", res.user.username);
      myStorage.setItem("token", res.token);
      myStorage.setItem("userID", res.user._id);
      setUserID(res.user._id);
      setCurrentUser(res.user.username);
      setCurrentToken(res.token);

      navigate("/");
    } else {
      window.alert("Invalid details");
    }
  }

  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;

    if (name === 'email') {
      setEmail(value);
    }
    else if (name === 'password') {
      setPass(value);
    }
  }

  return (
    <div className="login-container">
      {/* <h1>Habit Tracker</h1> */}
      <div className="">
        <h2 className=''>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className='pb-1'>E-mail</label>
          <input 
            value={email} 
            type="email" 
            placeholder="your email@gmail.com" 
            id="email" 
            name="email" 
            onChange={handleInputs} 
            className='login-input'
          />
          <label htmlFor="password" className='pb-1'>Password</label>
          <input 
            value={password} 
            type="password" 
            placeholder="password" 
            id="password" 
            name="password" 
            onChange={handleInputs} 
            className='login-input'
          />
          <button 
            type="submit" 
            className='login-button'
          >
            Login
          </button>
        </form>
        <button className="register-page-button" onClick={() => toggleForm('register')}>Don't have an account? Register here.</button>
      </div>
    </div>
  )
}

export default LoginPage