import * as bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from '../../redis';
import { forgotPasswordPrefix } from "../constants/redis-prefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { IMyContext } from '../types/MyContext';

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx: IMyContext
    ): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + token);
        if(!userId) {
            return null;
        }
        const user = await User.findOne(userId);
        if(!user) {
            return null;
        }
        await redis.del(forgotPasswordPrefix + token);
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        ctx.req.session!.userId = user.id;
        return user;
    }
}