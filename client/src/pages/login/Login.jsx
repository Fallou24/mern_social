import React, { createRef, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { authContext } from '../../context/AuthContext';
import "./login.css"

const Login = () => {
    const email = createRef();
    const password = createRef();
    const {dispatch,isFetching,user} = useContext(authContext)
    useEffect(() => {
        email.current.focus()
    })
    function handleSubmit(e) {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
    return (
        <div className='login'>
            <div className="loginContainer">
                <div className="loginLeft">
                    <h1 className="loginLogo">facebook</h1>
                    <span className="loginLeftDesc">Connect with freinds and the world around you on Facebook </span>
                </div>
                <div className="loginRight">
                    <form className="loginbox" onSubmit={handleSubmit}>
                        <input type="email" className='loginInput' placeholder='Email' ref={email} />
                        <input type="password" className='loginInput' placeholder='Password' ref={password} />
                        <button className="loginButton">{isFetching ? "Loading..." : "Log in"}</button>
                        <p className="forgetPassword">Forgot password ?</p>
                        <hr className='loginHr' />
                        <Link to="/register" className="registerButton">{isFetching ? "Loading..." : "Create a new account"}</Link>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;