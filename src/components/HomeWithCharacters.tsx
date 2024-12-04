import React, { useRef, useState, useEffect, ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character, DisplayCharacter } from '../models/character-model';
import CharacterModule from './CharacterModule';
// import { Button, ButtonGroup } from '@mui/material';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ButtonToolbar } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import realmsEU from '../utils/realmsEU';
import realmsUS from '../utils/realmsUS';
import hamburger from '../img/hamburger.png';

import logo from '../img/logo.png';
import pumpkin from '../img/pumpkin.gif';

const StyledAutocomplete = styled(Autocomplete)({
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        color: 'white',
        transform: 'translate(14px, 20px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        color: '#4CAF50',
    },
    '& .MuiAutocomplete-inputRoot': {
        background: '#25232F',
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90

        '& .MuiOutlinedInput-notchedOutline': {
            borderStyle: 'none',
            borderRadius: '18px',
        },
        '&.Mui-focused .MuiInputLabel-root': {
            color: 'yellow !important',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderStyle: 'none',
            borderRadius: '18px',
        },
        // '&.Mui-focused .MuiInputLabel-outlined': {
        //     borderColor: 'white',
        // },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderStyle: 'none',
            borderRadius: '18px',
        },
    },
});

function HomeWithCharacters(props: {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    useLocalStorage: boolean;
    setUseLocalStorage: Function;
    firstTime: boolean;
    logOut: React.MouseEventHandler<HTMLButtonElement>;
    validCharacter: boolean;
    characterName: string;
    setCharacterName: Function;
    realm: string;
    setRealm: Function;
    region: string;
    handleRegionChange: ChangeEventHandler<HTMLSelectElement>;
    handleAddCharacter: React.MouseEventHandler<HTMLButtonElement>;
    characters: Character[];
    setCharacters: Function;
    displayCharacters: DisplayCharacter[];
}) {
    const navigate = useNavigate();
    const handleIt = () => {
        props.setUseLocalStorage(false);
        navigate('/register');
    };

    const handleStatChange = (selectedStat: string) => {
        setSelectedStat(selectedStat);
        localStorage.setItem('selectedStat', selectedStat);
    };

    const [selectedStat, setSelectedStat] = useState(
        localStorage.getItem('selectedStat') || 'Overall'
    );

    useEffect(() => {
        if (window.innerWidth >= 1360) {
            setShow(false);
            setShowMenu(true);
        } else {
            setShow(true);
            setShowMenu(false);
        }
    }, []);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1360) {
                setShow(false);
                setShowMenu(true);
            } else {
                setShow(true);
                setShowMenu(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [show, setShow] = useState(true);
    const [showMenu, setShowMenu] = useState(true);

    return (
        <div className="form">
            <div className={'nav-bar'}>
                <div className={'logo-container ' + (show ? 'full-width' : '')}>
                    <img className={'logo-img'} alt={'loading'} src={logo} />
                    <img
                        className={'logo-pumpkin'}
                        alt={'loading'}
                        src={pumpkin}
                    />
                    <button
                        style={{ width: '50px', visibility: 'hidden' }}
                        className={'button collapse'}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <img
                            alt={'loading'}
                            style={{ width: '30px', visibility: 'visible' }}
                            src={hamburger}
                        />
                    </button>
                </div>
                <div
                    className={
                        'form-container-contract ' + (showMenu ? 'shown' : '')
                    }
                >
                    <p
                        style={{
                            display: props.validCharacter ? 'none' : 'block',
                        }}
                    >
                        Character is not valid
                    </p>
                    <div className={'input-container-nav'}>
                        <input
                            type="text"
                            placeholder={'Character name'}
                            id="username"
                            className={'input-add-char'}
                            autoComplete="off"
                            onChange={(e) =>
                                props.setCharacterName(e.target.value)
                            }
                            value={props.characterName}
                            required
                        />
                        <select
                            value={props.region}
                            className={'select-add-char'}
                            onChange={props.handleRegionChange}
                        >
                            <option value="" disabled>
                                Region
                            </option>
                            <option value="EU">EU</option>
                            <option value="US">US</option>
                        </select>
                    </div>
                    <div className={'input-container-nav start'}>
                        <StyledAutocomplete
                            id="combo-box-demo"
                            options={
                                props.region === 'US' ? realmsUS : realmsEU
                            }
                            sx={{ width: 300, marginBottom: '10px' }}
                            value={props.realm}
                            onChange={(event: any, newValue: any) => {
                                props.setRealm(newValue.label);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    sx={{
                                        width: 300,
                                        zIndex: '10000',
                                    }}
                                    {...params}
                                    label="Realm"
                                />
                            )}
                        />
                        <button
                            className={'button add-character-main'}
                            onClick={props.handleAddCharacter}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className={'page-content'}>
                <div className={'button-group'}>
                    <button
                        onClick={() => handleStatChange('Overall')}
                        className={
                            'button type-button ' +
                            (selectedStat === 'Overall' ? 'selected' : '')
                        }
                    >
                        Overall
                    </button>
                    <button
                        onClick={() => handleStatChange('CurrentWeek')}
                        className={
                            'button type-button ' +
                            (selectedStat === 'CurrentWeek' ? 'selected' : '')
                        }
                    >
                        Current Week
                    </button>
                    <button
                        onClick={() => handleStatChange('LastWeek')}
                        className={
                            'button type-button ' +
                            (selectedStat === 'LastWeek' ? 'selected' : '')
                        }
                    >
                        Last Week
                    </button>
                </div>

                <>
                    {props.characters.map((char) => {
                        let c: any = props.displayCharacters.find((o) => {
                            return (
                                o.name === char.characterName &&
                                o.realm === char.realm &&
                                o.region === char.region.toLowerCase()
                            );
                        })!;

                        return c ? (
                            <div key={c.name + c.realm + c.region + 'highest'}>
                                <CharacterModule
                                    isLoggedIn={props.isLoggedIn}
                                    characters={props.characters}
                                    setCharacters={props.setCharacters}
                                    displayCharacter={c}
                                    dungeonRuns={c.bestRuns}
                                    bestRuns={c.bestRuns}
                                    currentWeekRuns={c.currentWeekRuns}
                                    previousWeekRuns={c.previousWeekRuns}
                                    type={selectedStat}
                                    alternateRuns={c.alternateRuns}
                                />
                            </div>
                        ) : (
                            ''
                        );
                    })}
                </>
            </div>
        </div>
    );
}

export default HomeWithCharacters;
