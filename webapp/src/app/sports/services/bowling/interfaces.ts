export interface Player
{
    id: string;
    teamId: string;
    name: string;
    username: string;
    createdAt: Date;
}

export interface Team
{
    id: string;
    owner: string;
    name: string;
    image: string;
    ubication: string;
    foundationYear: number;
}

export interface CreateTeam
{
    name: string;
    image: string;
    ubication: string;
    foundationYear: number;
}

export interface CreateMatch
{
    encounterId: string;
    playerId: string;
    throw01: number;
    throw02: number;
    throw03: number;
    throw04: number;
    throw05: number;
    throw06: number;
    throw07: number;
    throw08: number;
    throw09: number;
    throw10: number;
}

export interface File
{
    lastModified: number;
    size: number;
    name: string;
    type: string;
}
