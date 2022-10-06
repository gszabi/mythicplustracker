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
        if (parseInt(level) >= 20) return 'orange';
        if (parseInt(level) >= 15) return 'purple';
        if (parseInt(level) >= 10) return 'blue';
        if (parseInt(level) >= 5) return 'green';
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
                                    }}
                                >
                                    <span
                                        className={'run-level'}
                                        style={{
                                            fontSize: '30px',
                                            background: 'none',
                                            color: run.inTime
                                                ? getTextColor(run.level)
                                                : 'gray',
                                        }}
                                    >
                                        {run.level}
                                    </span>
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
                                }}
                            >
                                <span
                                    className={'run-level'}
                                    style={{
                                        fontSize: '30px',
                                        background: 'none',
                                        color: run.inTime
                                            ? getTextColor(run.level)
                                            : 'gray',
                                    }}
                                >
                                    {run.level}
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CharacterModuleWeekly;
