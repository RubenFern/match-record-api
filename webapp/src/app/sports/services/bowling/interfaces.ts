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
    foundationYear: string;
}

export interface File
{
    lastModified: number;
    size: number;
    name: string;
    type: string;
}
