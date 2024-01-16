import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUserName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/users/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {username, email, password: pass} ),
        });
        const resp = await response.json();

        if(resp.username) {
            window.alert("User registration was successfull. You can now login");
        } else {
            window.alert("User registration was unsuccessfull. Use different username or email");
        }
    }

    const handleInputs = (e) => {
        let name, value;

        name = e.target.name;
        value = e.target.value;

        if(name === "username") {
            setUserName(value);
        } else if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPass(value);
        }
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="flex flex-col bg-gray-200 border-2 border-black rounded-md p-10">
                <h2 className='text-2xl font-bold'>Register</h2>
                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label className="pb-1" htmlFor="name">Username</label>
                    <input className="border-2 border-black rounded-md bg-white p-3" value={username} name="username" id="name" placeholder="username" onChange={handleInputs}/>
                    <label className="pb-1" htmlFor="email">E-mail</label>
                    <input className="border-2 border-black rounded-md bg-white p-3" value={email} type="email" placeholder="your email@gmail.com" id="email" name="email" onChange={handleInputs}/>
                    <label className="pb-1" htmlFor="password">Password</label>
                    <input className="border-2 border-black rounded-md bg-white p-3" value={pass} type="password" placeholder="password" id="password" name="password" onChange={handleInputs}/>
                    <button className="flex justify-center border-2 border-black rounded-md bg-white p-3 mt-5 text-purple-500 cursor-pointer" type="submit" >Register</button>
                </form>
                <button className="mt-5 text-black underline" onClick={() => toggleForm('login')}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}

export default Register