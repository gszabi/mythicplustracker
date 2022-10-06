import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import axios from '.././axios';
import { Link, useNavigate } from 'react-router-dom';
import kitty from '../img/kitty_better.gif';
import pumpkin from '../img/pumpkin.gif';

import logo from '../img/logo.png';

// Register.js
const REGISTER_URL = '/test';
const LOGIN_URL = '/login';
const ADD_CHARACTER = '/addCharacter';

const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface User {
    id: number;
    username: string;
    email: string;
}

const errorCodes = [
    'ACCOUNT_NOT_ACTIVATED',
    'ACCOUNT_NOT_FOUND',
    'INTERNAL_ERROR',
];

function Login(props: {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    useLocalStorage: boolean;
    setUseLocalStorage: Function;
}) {
    const [loginUser, setLoginUser] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const getErrorTextFromKey = (key: string) => {
        switch (key) {
            case 'ACCOUNT_NOT_ACTIVATED':
                return 'Account not activated!';
            case 'ACCOUNT_NOT_FOUND':
                return 'Account not found!';
            case 'INTERNAL_ERROR':
                return 'Internal server error';
            default:
                return 'Failed to log in';
        }
    };

    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        console.log('here');
        try {
            await axios
                .post(
                    LOGIN_URL,
                    {
                        username: loginUser,
                        password: loginPassword,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (
                        response.data &&
                        !errorCodes.includes(response.data.message)
                    ) {
                        props.setIsLoggedIn(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(getErrorTextFromKey(err.response.data));
                    if (err.response.data) {
                        console.log(err.response.data);
                    }
                });
        } catch (err: any) {
            console.log(err);
            setErrorMessage(getErrorTextFromKey(err.response.data));
            if (err.response.data) {
                console.log(err.response.data);
            }
        }
    };

    return (
        <div className="without-characters form">
            <div className={'logo-container  no-margin'}>
                <img className={'logo-img'} alt={'loading'} src={logo} />
                <img className={'logo-pumpkin'} alt={'loading'} src={pumpkin} />
            </div>
            <div className="centered-element">
                <img className={'login-kitty'} src={kitty} alt={'loading...'} />
                <div className="form">
                    <form onSubmit={handleLogin} className={'form register'}>
                        <label className={'input-label'} htmlFor="username">
                            Username:
                        </label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setLoginUser(e.target.value)}
                            value={loginUser}
                            required
                        />
                        <br />
                        <label className={'input-label'} htmlFor="password">
                            Password:
                        </label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setLoginPassword(e.target.value)}
                            value={loginPassword}
                            required
                        />
                        <br />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {errorMessage ? (
                                <p className={'error-message'}>
                                    {errorMessage}
                                </p>
                            ) : (
                                ''
                            )}
                            <button className={'button'}>Log in</button>
                            <br />
                            <span style={{ color: 'white' }}>
                                Don't have an account?
                            </span>{' '}
                            <Link to={'/register'} className={'link-auth'}>
                                Register
                            </Link>
                            <br />
                            <span style={{ color: 'white' }}>
                                Go back to home?
                            </span>{' '}
                            <Link
                                to={''}
                                onClick={() => props.setUseLocalStorage(true)}
                                className={'link-auth'}
                            >
                                Click here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
