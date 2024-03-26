import { TOURNAMENTS_REPOSITORY } from "src/constants";

import { Tournament } from "src/database/models/tournament.entity";

export const tournamentsProviders = [
    {
        provide: TOURNAMENTS_REPOSITORY,
        useValue: Tournament
    }
]