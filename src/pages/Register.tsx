import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import axios from '.././axios';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Modal, Typography } from '@mui/material';
import hamburger from '../img/hamburger.png';
import logo from '../img/logo.png';
import pumpkin from '../img/pumpkin.gif';

// Register.js
const REGISTER_URL = '/register';
const LOGIN_URL = '/login';
const ADD_CHARACTER = '/addCharacter';

const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;

interface User {
    id: number;
    username: string;
    email: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Register(props: {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    useLocalStorage: boolean;
    setUseLocalStorage: Function;
}) {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [loginUser, setLoginUser] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [validUser, setValidUser] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const validateEmail = (email: string) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const v1 = user.length > 4;
        const v2 = password.length > 7;
        if (!v1) {
            setErrorMessage('Invalid Username');
            return;
        }
        if (!v2) {
            setErrorMessage('Invalid Passwords');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Invalid Email');
            return;
        }
        setErrorMessage('');
        console.log(e, user);

        const characters = JSON.parse(
            localStorage.getItem('characters') || '[]'
        );

        try {
            const response = await axios
                .post(
                    REGISTER_URL,
                    {
                        email: email,
                        username: user,
                        password: password,
                        characters: characters,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
                .then((r) => {
                    localStorage.removeItem('characters');
                    setOpen(true);
                });
        } catch (err: any) {
            throw err;
        }
    };

    useEffect(() => {
        setPasswordsMatch(password === verifyPassword);
    }, [password, verifyPassword]);

    const navigator = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOk = () => {
        setOpen(false);
        navigator('/login');
    };

    return (
        <div className="without-characters form">
            <div className={'logo-container no-margin'}>
                <img className={'logo-img'} alt={'loading'} src={logo} />
                <img className={'logo-pumpkin'} alt={'loading'} src={pumpkin} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Account has been created. Check your E-Mail to
                            verify!
                        </Typography>
                        <div className={'modal-button-container'}>
                            <button
                                onClick={handleOk}
                                className={'modal-button yes'}
                            >
                                OK
                            </button>
                        </div>
                    </Box>
                </>
            </Modal>
            <div className="centered-element">
                <form onSubmit={handleSubmit} className={'form register'}>
                    <label className={'input-label'} htmlFor="username">
                        Username:
                    </label>
                    <br />
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <br />
                    <label className={'input-label'} htmlFor="username">
                        Email:
                    </label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <br />
                    <label className={'input-label'} htmlFor="verifyPassword">
                        Verify Password:
                    </label>
                    <br />
                    <input
                        type="password"
                        id="verifyPassword"
                        autoComplete="off"
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        value={verifyPassword}
                        required
                    />
                    <br />
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        {errorMessage ? (
                            <p className={'error-message'}>{errorMessage}</p>
                        ) : (
                            ''
                        )}
                        <button className={'button'}>Create Account</button>
                        <br />
                        <span style={{ color: 'white' }}>
                            Already have an account?
                        </span>{' '}
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
    );
}

export default Register;
