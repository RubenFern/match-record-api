import { Request } from "express";

export const getConfigAuthorization = (request: Request): { headers: { Authorization: string } } | undefined =>
{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
}