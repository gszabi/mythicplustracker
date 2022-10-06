export interface Character {
    id?: number;
    userId?: number;
    characterName: string;
    realm: string;
    region: string;
}

export interface DisplayCharacter {
    name: string;
    realm: string;
    region: string;
    class: string;
    faction: string;
    gender: string;
    thumbnailUrl: string;
    profileUrl: string;
    lastUpdatedAt: string;
    score: string;
    alternateRuns: DungeonRun[];
    bestRuns: DungeonRun[];
    highestRuns: DungeonRun[];
    currentWeekRuns: DungeonRun[];
    previousWeekRuns: DungeonRun[];
}

export interface DungeonRun {
    affixes: any;
    wasDone: boolean;
    main?: boolean;
    mainAffix: string;
    name: string;
    shortName: string;
    inTime: boolean;
    score: string;
    level: string;
    url: string;
}
