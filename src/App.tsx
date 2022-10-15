import React, { useRef, useState, useEffect, Fragment } from 'react';
import './App.css';
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
    useEffect(() => {
        if (localStorage.getItem('visited')) {
            setFirstTime(false);
        } else {
            localStorage.setItem('visited', 'true');
        }
    }, []);

    const [isLoaded, setIsLoaded] = useState(true);
    const [firstTime, setFirstTime] = useState(true);

    return (
        <>
            <Home isLoaded={isLoaded} firstTime={firstTime} />
            <div className={'footer'}>
                <p className={'info'}>
                    EMAIL: <p>drwonski.stream@gmail.com</p>
                </p>
                <p className={'info'}>
                    Made by <p>Drownski</p>
                </p>
                <p className={'info'}>
                    Powered by{' '}
                    <p>
                        <a href={'https://raider.io/'}>
                            Raider.IO{' '}
                            <img
                                width={'15px'}
                                style={{
                                    position: 'absolute',
                                    marginLeft: '5px',
                                }}
                                alt={'loading'}
                                src={linkIcon}
                            />
                        </a>
                    </p>
                </p>
            </div>
        </>
    );
}

export default App;
