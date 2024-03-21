import { Inject, Injectable } from "@nestjs/common";

import { TOKENS_REPOSITORY } from "src/constants";
import { Token } from "./token.entity";

@Injectable()
export class TokenService
{
    constructor(
        @Inject(TOKENS_REPOSITORY)
        private readonly tokensRepository: typeof Token
    ) {}

    async save(token: string, userId: string, createdAt: Date, expiredAt: Date): Promise<Token>
    {
        const token_ = new Token();

        token_.token = token;
        token_.userId = userId;
        token_.createdAt = createdAt;
        token_.expiredAt = expiredAt;

        const tokenData = await token_.save();

        return tokenData;
    }

    async findOne(token: string): Promise<Token | undefined>
    {
        return await this.tokensRepository.findOne({ where: { token: token } });
    }
}