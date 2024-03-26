import { MATCHS_REPOSITORY } from "src/constants";

import { Match } from "src/database/models/match.entity";

export const matchesProviders = [
    {
        provide: MATCHS_REPOSITORY,
        useValue: Match
    }
]