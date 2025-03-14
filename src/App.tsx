import React, { useRef, useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from './axios';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from 'react-router-dom';
import linkIcon from './img/link.png';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [useLocalStorage, setUseLocalStorage] = useState(
    //     !!localStorage.getItem('useLocalStorage')
    // )

    // const [items, setItems] = useState([])
    const [useLocalStorage, setUseLocalStorage] = useState(true);

    // useEffect(() => {
    //     setUseLocalStorage(!!localStorage.getItem('useLocalStorage'))
    // }, [])

    useEffect(() => {
        console.log('useLocalStorage', useLocalStorage);
        localStorage.setItem('useLocalStorage', useLocalStorage ? 'true' : '');
    }, [useLocalStorage]);

    useEffect(() => {
        if (localStorage.getItem('visited')) {
            setFirstTime(false);
        } else {
            localStorage.setItem('visited', 'true');
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('items', JSON.stringify(items))
    // }, [items])
    //
    // useEffect(() => {
    //     // @ts-ignore
    //     const items = JSON.parse(localStorage.getItem('items'))
    //     if (items) {
    //         setItems(items)
    //     }
    // }, [])

    const [isLoaded, setIsLoaded] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        setIsLoaded(false);
        axios
            .post(
                '/user',
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
            .then((response) => {
                if (response.data) {
                    setIsLoggedIn(true);
                }
                setIsLoaded(true);
            }).catch((error) => {
                console.log(error);
                setIsLoaded(true);
        });
    }, []);

    return (
        <>
            <Router>
                <Fragment>
                    {isLoaded ? (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        isLoggedIn={isLoggedIn}
                                        setIsLoggedIn={setIsLoggedIn}
                                        useLocalStorage={useLocalStorage}
                                        setUseLocalStorage={setUseLocalStorage}
                                        isLoaded={isLoaded}
                                        firstTime={firstTime}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    !(isLoggedIn || useLocalStorage) ? (
                                        <Register
                                            isLoggedIn={isLoggedIn}
                                            setIsLoggedIn={setIsLoggedIn}
                                            useLocalStorage={useLocalStorage}
                                            setUseLocalStorage={
                                                setUseLocalStorage
                                            }
                                        />
                                    ) : (
                                        <Navigate to={'/'} />
                                    )
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    !(isLoggedIn || useLocalStorage) ? (
                                        <Login
                                            isLoggedIn={isLoggedIn}
                                            setIsLoggedIn={setIsLoggedIn}
                                            useLocalStorage={useLocalStorage}
                                            setUseLocalStorage={
                                                setUseLocalStorage
                                            }
                                        />
                                    ) : (
                                        <Navigate to={'/'} />
                                    )
                                }
                            />
                            {/*<Route path="/register" element={<Register />} />*/}
                            {/*<Route path="/login" element={<Login />} />*/}
                        </Routes>
                    ) : (
                        ''
                    )}
                </Fragment>
            </Router>
        </>
    );
}

export default App;
