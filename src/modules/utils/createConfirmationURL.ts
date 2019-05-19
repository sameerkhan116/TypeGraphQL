import { v4 } from 'uuid';
import { redis } from '../../redis';

export const createConfirmationURL = async (userId: number): Promise<string> => {
    const token = v4();
    redis.set(token, userId, "ex", 60 * 60 * 24);
    return `https://localhost:3000/user/confirm/${token}`;
}