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

export interface File
{
    lastModified: number;
    size: number;
    name: string;
    type: string;
}
