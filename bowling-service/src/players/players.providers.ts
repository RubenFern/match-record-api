import { PLAYERS_REPOSITORY } from "src/constants";

import { Player } from "src/database/models/player.entity";

export const playersProviders = [
    {
        provide: PLAYERS_REPOSITORY,
        useValue: Player
    }
]