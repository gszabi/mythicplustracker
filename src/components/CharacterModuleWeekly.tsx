import React from 'react';
import { DisplayCharacter, DungeonRun } from '../models/character-model';
import docks from '../img/docks.jpg';
import gambit from '../img/gambit.jpg';
import grimrail from '../img/grimrail.jpg';
import junkyard from '../img/junkyard.jpg';
import lower from '../img/lower.jpg';
import streets from '../img/streets.jpg';
import upper from '../img/upper.jpg';
import workshop from '../img/workshop.jpg';
import fortified from '../img/fortified.jpg';
import questionmark from '../img/questionmark.jpg';
import tyranical from '../img/tyranical.jpg';
import Tooltip from '@mui/material/Tooltip';

function CharacterModuleWeekly(props: {
    displayCharacter: DisplayCharacter;
    type: string;
    dungeonRuns: DungeonRun[];
    affixImg?: string;
}) {
    const getImgFromName = (name: string) => {
        switch (name) {
            case 'GMBT':
                return gambit;
            case 'YARD':
                return junkyard;
            case 'ID':
                return docks;
            case 'STRT':
                return streets;
            case 'GD':
                return grimrail;
            case 'WORK':
                return workshop;
            case 'UPPR':
                return upper;
            case 'LOWR':
                return lower;
            default:
                return questionmark;
        }
    };

    const getTextColor = (level: string) => {
        if (parseInt(level) >= 20) return '#ffa82b';
        if (parseInt(level) >= 15) return '#FF16FFFF';
        if (parseInt(level) >= 10) return '#1645ff';
        if (parseInt(level) >= 5) return '#14FF21FF';
        return 'white';
    };

    const isVaultOption = (index: number) => {
        if (props.type === 'Overall') return false;
        if (index === 0) return true;
        if (index === 3) return true;
        return index === 7;
    };

    return (
        <div className={'runs'}>
            {props.type === 'Overall' ? (
                <div className={'run-container'}>
                    <div
                        className={'run header'}
                        style={{
                            backgroundImage: 'url("' + props.affixImg + '")',
                        }}
                    ></div>
                </div>
            ) : (
                ''
            )}
            {props.dungeonRuns.map((run, index) => {
                return (
                    <div
                        className={'run-container'}
                        key={run.name + props.displayCharacter.name + index}
                    >
                        {run.url ? (
                            <a
                                rel="noopener noreferrer"
                                href={run.url}
                                target="_blank"
                            >
                                <div
                                    className={
                                        'run ' +
                                        (isVaultOption(index)
                                            ? 'vault-option'
                                            : '')
                                    }
                                    style={{
                                        backgroundImage:
                                            'url("' +
                                            getImgFromName(run.shortName) +
                                            '")',
                                        textAlign: 'inherit',
                                    }}
                                >
                                    <span
                                        className={'run-name'}
                                        style={{
                                            fontSize: '14px',
                                            marginTop: '-10px',
                                            position: 'absolute',
                                            background: 'none',
                                        }}
                                    >
                                        {run.shortName}
                                    </span>

                                    <div
                                        style={{
                                            textAlign: 'center',
                                            display: 'grid',
                                        }}
                                    >
                                        <span
                                            className={'run-level'}
                                            style={{
                                                fontSize:
                                                    props.type === 'Overall'
                                                        ? '25px'
                                                        : '30px',
                                                background: 'none',
                                                color: run.inTime
                                                    ? getTextColor(run.level)
                                                    : 'gray',
                                            }}
                                        >
                                            {run.level}
                                        </span>
                                        {props.type === 'Overall' ? (
                                            <span
                                                className={'run-level'}
                                                style={{
                                                    fontSize: '15px',
                                                    marginTop: '-10px',
                                                    background: 'none',
                                                    color: run.inTime
                                                        ? getTextColor(
                                                              run.level
                                                          )
                                                        : 'gray',
                                                }}
                                            >
                                                {run.score}
                                            </span>
                                        ) : (
                                            ' '
                                        )}
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div
                                className={
                                    'run ' +
                                    (isVaultOption(index) ? 'vault-option' : '')
                                }
                                style={{
                                    backgroundImage:
                                        'url("' +
                                        getImgFromName(run.shortName) +
                                        '")',
                                    textAlign: 'inherit',
                                }}
                            >
                                <span
                                    className={'run-name'}
                                    style={{
                                        fontSize: '14px',
                                        marginTop: '-10px',
                                        position: 'absolute',
                                        background: 'none',
                                    }}
                                >
                                    {run.shortName}
                                </span>
                                <div style={{ textAlign: 'center' }}>
                                    <span
                                        className={'run-level'}
                                        style={{
                                            fontSize: '25px',
                                            background: 'none',
                                            color: run.inTime
                                                ? getTextColor(run.level)
                                                : 'gray',
                                        }}
                                    >
                                        {run.level}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CharacterModuleWeekly;
