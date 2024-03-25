import { TOKENS_REPOSITORY } from "src/constants";
import { Token } from "../database/models/token.entity";

export const tokensProviders = [
    {
        provide: TOKENS_REPOSITORY,
        useValue: Token
    }
]