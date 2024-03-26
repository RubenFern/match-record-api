import { MATCHS_REPOSITORY } from "src/constants";

import { Match } from "src/database/models/match.entity";

export const matchsProviders = [
    {
        provide: MATCHS_REPOSITORY,
        useValue: Match
    }
]