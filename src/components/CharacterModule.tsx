import React, { useEffect, useState } from 'react';
import {
    Character,
    DisplayCharacter,
    DungeonRun,
} from '../models/character-model';
import deleteIcon from '../img/delete.png';
import linkIcon from '../img/link.png';
import fortified from '../img/fortified.jpg';
import tyranical from '../img/tyranical.jpg';
import Tooltip from '@mui/material/Tooltip';
import CharacterModuleWeekly from './CharacterModuleWeekly';
import { Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from '../axios';

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

const DELETE_CHARACTER = '/deleteCharacter';

function CharacterModule(props: {
    characters: Character[];
    setCharacters: Function;
    isLoggedIn: boolean;
    displayCharacter: DisplayCharacter;
    type: string;
    dungeonRuns: DungeonRun[];
    bestRuns: DungeonRun[];
    alternateRuns: DungeonRun[];
    currentWeekRuns: DungeonRun[];
    previousWeekRuns: DungeonRun[];
}) {
    const [tyranicalRuns, setTyranicalRuns] = useState<DungeonRun[]>([]);
    const [fortifiedRuns, setFortifiedRuns] = useState<DungeonRun[]>([]);

    const dgNames = [
        'GMBT',
        'YARD',
        'ID',
        'STRT',
        'GD',
        'WORK',
        'UPPR',
        'LOWR',
    ];

    const deleteCharacter = (
        characterName: string,
        realm: string,
        region: string
    ) => {
        axios
            .post(
                DELETE_CHARACTER,
                {
                    characterName: characterName,
                    realm: realm,
                    region: region.toUpperCase(),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )
            .then((r) => {
                //props.setCharacters(localStorageCharacters);
                const deletedCharacter = JSON.parse(
                    JSON.stringify(props.characters)
                );
                for (let i = deletedCharacter.length - 1; i >= 0; --i) {
                    if (
                        deletedCharacter[i].characterName ===
                            props.displayCharacter.name &&
                        deletedCharacter[i].realm ===
                            props.displayCharacter.realm &&
                        deletedCharacter[i].region.toLowerCase() ===
                            props.displayCharacter.region.toLowerCase()
                    ) {
                        deletedCharacter.splice(i, 1);
                    }
                }
                props.setCharacters(deletedCharacter);
                console.log('DELETED', r);
            });
    };

    const getTyranical = () => {
        const tyranical: DungeonRun[] = [];
        dgNames.forEach((name) => {
            const bestRun = props.bestRuns!.find((run) => {
                return run.shortName === name;
            });
            const alternateRun = props.alternateRuns!.find((run) => {
                return run.shortName === name;
            });

            if (bestRun?.mainAffix === 'Tyrannical') {
                bestRun.main = true;
                tyranical.push(bestRun);
            } else if (alternateRun?.mainAffix === 'Tyrannical') {
                tyranical.push(alternateRun);
            } else {
                tyranical.push({
                    wasDone: false,
                    affixes: undefined,
                    inTime: false,
                    level: '0',
                    mainAffix: '',
                    name: '',
                    score: '',
                    shortName: name,
                    url: '',
                });
            }
        });
        console.log('tyr', tyranical);
        return tyranical;
    };

    const getFortified = () => {
        const tyranical: DungeonRun[] = [];
        dgNames.forEach((name) => {
            const bestRun = props.bestRuns!.find((run) => {
                return run.shortName === name;
            });
            const alternateRun = props.alternateRuns!.find((run) => {
                return run.shortName === name;
            });
            if (bestRun?.mainAffix === 'Fortified') {
                bestRun.main = true;
                tyranical.push(bestRun);
            } else if (alternateRun?.mainAffix === 'Fortified') {
                tyranical.push(alternateRun);
            } else {
                tyranical.push({
                    wasDone: false,
                    affixes: undefined,
                    inTime: false,
                    level: '0',
                    mainAffix: '',
                    name: '',
                    score: '',
                    shortName: name,
                    url: '',
                });
            }
        });
        console.log('fort', tyranical);
        return tyranical;
    };

    useEffect(() => {
        setFortifiedRuns(getFortified());
        setTyranicalRuns(getTyranical());
    }, []);

    const getTextColor = (level: number) => {
        if (level >= 20) return 'orange';
        if (level >= 15) return 'purple';
        if (level >= 10) return 'blue';
        if (level >= 5) return 'green';
        return 'white';
    };

    const completeVaultRuns = (weeklyRuns: DungeonRun[]) => {
        const completedRuns: DungeonRun[] = [];

        if (weeklyRuns.length >= 8) {
            completedRuns.push(...weeklyRuns.slice(0, 8));
        } else {
            completedRuns.push(...weeklyRuns);
            for (let i = 0; i < 8 - weeklyRuns.length; i++) {
                completedRuns.push({
                    wasDone: false,
                    affixes: undefined,
                    inTime: false,
                    level: '',
                    mainAffix: '',
                    name: '',
                    score: '',
                    shortName: '',
                    url: '',
                });
            }
        }
        console.log('completedRuns', completedRuns);
        return completedRuns;
    };

    const [completedDg, setCompletedDg] = useState<DungeonRun[]>([]);

    useEffect(() => {
        if (props.type === 'CurrentWeek')
            setCompletedDg(completeVaultRuns(props.currentWeekRuns));
        if (props.type === 'LastWeek')
            setCompletedDg(completeVaultRuns(props.previousWeekRuns));
    }, [props.type]);

    const handleModalYesClick = () => {
        if (props.isLoggedIn) {
            deleteCharacter(
                props.displayCharacter.name,
                props.displayCharacter.realm,
                props.displayCharacter.region
            );
        } else {
            const localStorageCharacters = JSON.parse(
                localStorage.getItem('characters') || ''
            );

            for (var i = localStorageCharacters.length - 1; i >= 0; --i) {
                if (
                    localStorageCharacters[i].characterName ===
                        props.displayCharacter.name &&
                    localStorageCharacters[i].realm ===
                        props.displayCharacter.realm &&
                    localStorageCharacters[i].region.toLowerCase() ===
                        props.displayCharacter.region.toLowerCase()
                ) {
                    localStorageCharacters.splice(i, 1);
                }
            }

            localStorage.setItem(
                'characters',
                JSON.stringify(localStorageCharacters)
            );

            props.setCharacters(localStorageCharacters);

            setOpen(false);
        }
    };
    const handleModalNoClick = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div
            style={{
                color: 'white',
                marginTop: '25px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
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
                            Are you sure you want to delete this character?
                        </Typography>
                        <div className={'modal-button-container'}>
                            <button
                                onClick={handleModalYesClick}
                                className={'modal-button yes'}
                            >
                                yes
                            </button>
                            <button
                                onClick={handleModalNoClick}
                                className={'modal-button no'}
                            >
                                no
                            </button>
                        </div>
                    </Box>
                </>
            </Modal>
            <div className={'ceva'}>
                <div
                    className={
                        'altceva ' + (props.type === 'Overall' ? 'overall' : '')
                    }
                >
                    <button
                        onClick={handleOpen}
                        style={{
                            maxHeight: '30px',
                            maxWidth: '30px',
                            visibility: 'hidden',
                            marginRight: '10px',
                        }}
                    >
                        <img
                            width={'30px'}
                            height={'30px'}
                            alt={'loading'}
                            style={{
                                visibility: 'visible',
                                cursor: 'pointer',
                            }}
                            src={deleteIcon}
                        />
                    </button>
                    <img
                        className={
                            'char-thumbnail-padding ' +
                            (props.type === 'Overall' ? 'overall' : '')
                        }
                        width={props.type === 'Overall' ? '100px' : '50px'}
                        height={props.type === 'Overall' ? '100px' : '50px'}
                        alt="error"
                        src={props.displayCharacter.thumbnailUrl}
                    />
                    <div className={'char-info-container'}>
                        <a
                            rel="noopener noreferrer"
                            className={'character-link'}
                            style={{ width: '150px' }}
                            href={props.displayCharacter.profileUrl}
                            target="_blank"
                        >
                            <span
                                style={{
                                    marginLeft: '50px',
                                    minWidth: '100px',
                                }}
                            >
                                {props.displayCharacter.name}
                                <img
                                    width={'23px'}
                                    style={{
                                        position: 'absolute',
                                        marginLeft: '10px',
                                    }}
                                    alt={'loading'}
                                    src={linkIcon}
                                />
                            </span>
                        </a>
                        <span
                            style={{
                                marginLeft: '50px',
                                minWidth: '100px',
                            }}
                        >
                            {props.displayCharacter.score}
                        </span>
                    </div>
                </div>
                <div className={'all-runs'}>
                    {props.type === 'Overall' ? (
                        <>
                            <CharacterModuleWeekly
                                displayCharacter={props.displayCharacter}
                                type={props.type}
                                dungeonRuns={tyranicalRuns}
                                affixImg={tyranical}
                            />

                            <CharacterModuleWeekly
                                displayCharacter={props.displayCharacter}
                                type={props.type}
                                dungeonRuns={fortifiedRuns}
                                affixImg={fortified}
                            />
                        </>
                    ) : (
                        <CharacterModuleWeekly
                            displayCharacter={props.displayCharacter}
                            type={props.type}
                            dungeonRuns={completedDg}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default CharacterModule;
