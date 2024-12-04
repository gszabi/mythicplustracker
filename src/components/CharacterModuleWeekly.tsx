import React from 'react';
import { DisplayCharacter, DungeonRun } from '../models/character-model';
import dawnbreaker from '../img/dawnbreaker.jpg';
import arakara from '../img/arakara.jpg';
import mists from '../img/mists.jpg';
import cot from '../img/city.jpg';
import nw from '../img/necrotic.jpg';
import gb from '../img/grimbatol.jpg';
import sv from '../img/stonevault.jpg';
import siege from '../img/siege.jpg';
import questionmark from '../img/questionmark.jpg';


function CharacterModuleWeekly(props: {
    displayCharacter: DisplayCharacter;
    type: string;
    dungeonRuns: DungeonRun[];
    affixImg?: string;
}) {
    const getImgFromName = (name: string) => {
        switch (name) {
            case 'DAWN':
                return dawnbreaker;
            case 'ARAK':
                return arakara;
            case 'MISTS':
                return mists;
            case 'COT':
                return cot;
            case 'NW':
                return nw;
            case 'GB':
                return gb;
            case 'SV':
                return sv;
            case 'SIEGE':
                return siege;
            default:
                return questionmark;
        }
    };

    const getTextColor = (level: string) => {
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
            {props.dungeonRuns.map((run, index) => {
                return (
                    <div title={run.score}
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
                                            fontSize: '42px',
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
                                        fontSize: '42px',
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
