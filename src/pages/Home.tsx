import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import linkIcon from '../img/link.png';
import axios from '.././axios';
import HomeWithCharacters from '../components/HomeWithCharacters';
import HomeWithoutCharacters from '../components/HomeWithoutCharacters';
import {
    Character,
    DisplayCharacter,
    DungeonRun,
} from '../models/character-model';
import { useNavigate } from 'react-router-dom';

// Register.js
const REGISTER_URL = '/test';
const LOGIN_URL = '/login';
const ADD_CHARACTER = '/addCharacter';
const GET_CHARACTERs = '/getCharacters';

const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface User {
    id: number;
    username: string;
    email: string;
}

function Home(props: {
    isLoggedIn: boolean;
    setIsLoggedIn: Function;
    useLocalStorage: boolean;
    setUseLocalStorage: Function;
    setIsLoaded: Function;
    firstTime: boolean;
}) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [validCharacter, setValidCharacter] = useState(true);

    const [displayCharacters, setDisplayCharacrs] = useState<
        DisplayCharacter[]
    >([]);

    //Get characters on load
    // https://raider.io/api/v1/characters/profile?region=eu&realm=Draenor&name=Temski&fields=
    // mythic_plus_highest_level_runs%2C
    // mythic_plus_alternate_runs%2Cmythic_plus_weekly_highest_level_runs%2C
    // mythic_plus_previous_weekly_highest_level_runs%2Cmythic_plus_scores_by_season%3Acurrent
    useEffect(() => {
        console.log('getting char info', props.isLoggedIn);
        if (!props.isLoggedIn) {
            if (localStorage.getItem('characters')) {
                console.log(localStorage.getItem('characters'));
                const char: Character[] = JSON.parse(
                    localStorage.getItem('characters')!
                );
                char.forEach((c: Character) => {
                    getCharRioInfo(c.characterName, c.realm, c.region);
                });
                setCharacters(JSON.parse(localStorage.getItem('characters')!));
            }
        } else {
            axios
                .post(
                    '/getCharacters',
                    {},
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    setCharacters([]);
                    response.data.forEach((character: Character) => {
                        getCharRioInfo(
                            character.characterName,
                            character.realm,
                            character.region
                        );
                        setCharacters((prevState) => [...prevState, character]);
                        props.setIsLoaded(true);
                    });
                });
        }
    }, [props.isLoggedIn]);

    const isCharacterAlreadyAdded = (char?: Character) => {
        const charName = char ? char.characterName : characterName;
        const charRealm = char ? char.realm : realm;
        const charRegion = char ? char.region : region;
        if (
            characters.some((char) => {
                if (
                    char.characterName === charName &&
                    char.region === charRegion &&
                    char.realm === charRealm
                ) {
                    return true;
                }
            })
        ) {
            return true;
        }
    };

    const fields =
        'mythic_plus_highest_level_runs,' +
        'mythic_plus_alternate_runs,mythic_plus_weekly_highest_level_runs,' +
        'mythic_plus_previous_weekly_highest_level_runs,' +
        'mythic_plus_best_runs,' +
        'mythic_plus_scores_by_season:current';
    // mythic_plus_alternate_runs%2Cmythic_plus_weekly_highest_level_runs%2C
    // mythic_plus_previous_weekly_highest_level_runs%2Cmythic_plus_scores_by_season%3Acurrent
    const getCharRioInfo = (
        charName: string,
        realm: string,
        region: string
    ) => {
        if (charName && realm && region) {
            console.log('here where we get char');
            axios
                .get(
                    'https://raider.io/api/v1/characters/profile?region=' +
                        region.toLowerCase() +
                        '&realm=' +
                        realm +
                        '&name=' +
                        charName +
                        '&fields=' +
                        fields,
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                .then((response) => {
                    let charToAdd: DisplayCharacter = {} as DisplayCharacter;
                    charToAdd.name = response.data.name;
                    charToAdd.realm = response.data.realm;
                    charToAdd.region = response.data.region;
                    charToAdd.class = response.data.class;
                    charToAdd.faction = response.data.faction;
                    charToAdd.gender = response.data.gender;
                    charToAdd.thumbnailUrl = response.data.thumbnail_url;
                    charToAdd.profileUrl = response.data.profile_url;
                    charToAdd.lastUpdatedAt = response.data.last_crawled_at;
                    charToAdd.score =
                        response.data.mythic_plus_scores_by_season[0].scores.all;

                    let alternateRuns = [] as DungeonRun[];
                    let bestRuns = [] as DungeonRun[];
                    let highestRuns = [] as DungeonRun[];
                    let currentWeekRuns = [] as DungeonRun[];
                    let previousWeekRuns = [] as DungeonRun[];

                    response.data.mythic_plus_alternate_runs.forEach(
                        (dgRun: any) => {
                            alternateRuns.push(getInfoFromRun(dgRun));
                        }
                    );
                    response.data.mythic_plus_best_runs.forEach(
                        (dgRun: any) => {
                            bestRuns.push(getInfoFromRun(dgRun));
                        }
                    );
                    response.data.mythic_plus_highest_level_runs.forEach(
                        (dgRun: any) => {
                            highestRuns.push(getInfoFromRun(dgRun));
                        }
                    );
                    response.data.mythic_plus_weekly_highest_level_runs.forEach(
                        (dgRun: any) => {
                            currentWeekRuns.push(getInfoFromRun(dgRun));
                        }
                    );
                    response.data.mythic_plus_previous_weekly_highest_level_runs.forEach(
                        (dgRun: any) => {
                            previousWeekRuns.push(getInfoFromRun(dgRun));
                        }
                    );

                    charToAdd.alternateRuns = [...alternateRuns];
                    charToAdd.bestRuns = [...bestRuns];
                    charToAdd.highestRuns = [...highestRuns];
                    charToAdd.currentWeekRuns = [...currentWeekRuns];
                    charToAdd.previousWeekRuns = [...previousWeekRuns];

                    setDisplayCharacrs((prevState) => [
                        ...prevState,
                        charToAdd,
                    ]);
                });
        }
    };

    const getInfoFromRun = (dgRun: any) => {
        let run = {} as DungeonRun;
        run.affixes = [...dgRun.affixes];
        run.mainAffix = dgRun.affixes[0].name;
        run.name = dgRun.dungeon;
        run.shortName = dgRun.short_name;
        run.inTime = dgRun.clear_time_ms < dgRun.par_time_ms;
        run.score = dgRun.score;
        run.level = dgRun.mythic_level;
        run.url = dgRun.url;
        return run;
    };

    const handleAddCharacter = () => {
        console.log(characterName);

        axios
            .get(
                'https://raider.io/api/v1/characters/profile?region=' +
                    region.toLowerCase() +
                    '&realm=' +
                    realm +
                    '&name=' +
                    characterName,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            .then((response) => {
                if (isCharacterAlreadyAdded()) {
                    console.log('ALREADY ADDED');
                    return;
                }

                getCharRioInfo(characterName, realm, region);

                setValidCharacter(true);

                setCharacters((prevState) => [
                    ...prevState,
                    {
                        characterName: characterName,
                        realm: realm,
                        region: region,
                    },
                ]);
                if (!props.isLoggedIn) {
                    if (localStorage.getItem('characters')) {
                        localStorage.setItem(
                            'characters',
                            JSON.stringify([
                                ...JSON.parse(
                                    localStorage.getItem('characters')!
                                ),
                                {
                                    characterName: characterName,
                                    realm: realm,
                                    region: region,
                                },
                            ])
                        );
                    } else {
                        localStorage.setItem(
                            'characters',
                            JSON.stringify([
                                {
                                    characterName: characterName,
                                    realm: realm,
                                    region: region,
                                },
                            ])
                        );
                    }
                } else {
                    try {
                        axios
                            .post(
                                ADD_CHARACTER,
                                {
                                    characterName: characterName,
                                    realm: realm,
                                    region: region,
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    withCredentials: true,
                                }
                            )
                            .then((r) => console.log(r));
                    } catch (err: any) {}
                }
            })
            .catch((error) => {
                setValidCharacter(false);
            });
    };

    const logOut = () => {
        axios
            .post(
                '/logout',
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
            .then((r) => {
                props.setIsLoggedIn(false);
                window.location.reload();
            });
    };

    const handleRegionChange = (event: any) => {
        setRegion(event.target.value);
    };

    const [characterName, setCharacterName] = useState('');
    const [realm, setRealm] = useState('');
    const [region, setRegion] = useState('EU');

    return (
        <div className="home">
            {characters.length > 0 ? (
                <HomeWithCharacters
                    isLoggedIn={props.isLoggedIn}
                    setIsLoggedIn={props.setIsLoggedIn}
                    useLocalStorage={props.useLocalStorage}
                    setUseLocalStorage={props.setUseLocalStorage}
                    firstTime={props.firstTime}
                    logOut={logOut}
                    characterName={characterName}
                    validCharacter={validCharacter}
                    setCharacterName={setCharacterName}
                    realm={realm}
                    setRealm={setRealm}
                    region={region}
                    handleRegionChange={handleRegionChange}
                    handleAddCharacter={handleAddCharacter}
                    characters={characters}
                    setCharacters={setCharacters}
                    displayCharacters={displayCharacters}
                />
            ) : (
                <HomeWithoutCharacters
                    isLoggedIn={props.isLoggedIn}
                    setIsLoggedIn={props.setIsLoggedIn}
                    useLocalStorage={props.useLocalStorage}
                    setUseLocalStorage={props.setUseLocalStorage}
                    firstTime={props.firstTime}
                    logOut={logOut}
                    characterName={characterName}
                    validCharacter={validCharacter}
                    setCharacterName={setCharacterName}
                    realm={realm}
                    setRealm={setRealm}
                    region={region}
                    handleRegionChange={handleRegionChange}
                    handleAddCharacter={handleAddCharacter}
                    characters={characters}
                />
            )}
        </div>
    );
}

export default Home;
