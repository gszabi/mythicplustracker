import React, { useRef, useState, useEffect, ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Character } from '../models/character-model';
import realmsUS from '../utils/realmsUS';
import realmsEU from '../utils/realmsEU';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
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

function HomeWithoutCharacters(props: {
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
}) {
    const navigate = useNavigate();
    const goToRegister = () => {
        props.setUseLocalStorage(false);
        navigate('/register');
    };
    const goToLogin = () => {
        props.setUseLocalStorage(false);
        navigate('/login');
    };

    return (
        <div className="without-characters form">
            <div className={'logo-container  no-margin'}>
                <img className={'logo-img'} alt={'loading'} src={logo} />
                <img className={'logo-pumpkin'} alt={'loading'} src={pumpkin} />
            </div>
            <div className="centered-element">
                <br />
                <br />
                <input
                    className="form-input add-character"
                    type="text"
                    id="username"
                    placeholder={'Character name'}
                    autoComplete="off"
                    onChange={(e) => props.setCharacterName(e.target.value)}
                    value={props.characterName}
                    required
                />
                <br />
                <select
                    className="form-select add-character"
                    value={props.region}
                    onChange={props.handleRegionChange}
                >
                    <option value="" disabled>
                        Region
                    </option>
                    <option value="EU">EU</option>
                    <option value="US">US</option>
                </select>
                <br />
                <StyledAutocomplete
                    id="combo-box-demo"
                    options={props.region === 'US' ? realmsUS : realmsEU}
                    sx={{ width: 300 }}
                    value={props.realm}
                    onChange={(event: any, newValue: any) => {
                        props.setRealm(newValue.label);
                    }}
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                width: '315px',
                                zIndex: '10000',
                            }}
                            {...params}
                            label="Realm"
                        />
                    )}
                />
                <br />
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button
                        className="button submit"
                        onClick={props.handleAddCharacter}
                    >
                        Add
                    </button>
                    {props.isLoggedIn ? (
                        <>
                            <br />
                            <br />
                            <button
                                className="button logout"
                                onClick={props.logOut}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        ''
                    )}
                    <p
                        style={{
                            display: props.validCharacter ? 'none' : 'block',
                        }}
                    >
                        Character is not valid
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeWithoutCharacters;
