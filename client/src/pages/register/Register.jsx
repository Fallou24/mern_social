import React, { createRef, useEffect } from 'react';
import "./register.css"
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const username = createRef()
    const email = createRef();
    const password = createRef();
    const passwordAgain = createRef()
    useEffect(() => {
        username.current.focus()
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const usernameValue = username.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const passwordAgainValue = passwordAgain.current.value;

        if (passwordValue === passwordAgainValue) {
            try {
                await axios.post("/auth/register", { username: usernameValue, email: emailValue, password: passwordValue });
                <Navigate replace to="/login" />
            } catch (err) {
                console.log(err);
            }
        }
        else {
            alert("passwords dont' match !")
        }
    }
    return (
        <div className='login'>
            <div className="loginContainer">
                <div className="loginLeft">
                    <h1 className="loginLogo">facebook</h1>
                    <span className="loginLeftDesc">Connect with freinds and the world around you on Facebook </span>
                </div>
                <div className="loginRight">
                    <form className="registerbox" onSubmit={handleSubmit}>
                        <input type="text" className='loginInput' placeholder='Username' ref={username} />
                        <input type="email" className='loginInput' placeholder='Email' ref={email} />
                        <input type="password" minLength="6" className='loginInput' placeholder='Password' ref={password} />
                        <input type="password" className='loginInput' placeholder='Password again' ref={passwordAgain} />
                        <button className="loginButton" type='submit'>Sign up</button>
                        <hr className='loginHr' />
                        <Link to="/login" className="registerButton">Log into account</Link>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;