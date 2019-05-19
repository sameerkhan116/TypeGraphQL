import * as bcrypt from 'bcryptjs';
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { LoginInput } from './login/LoginInput';
import { IMyContext } from '../types/MyContext';

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("input") { email, password }: LoginInput,
        @Ctx() ctx: IMyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if(!user || !user.confirmed) return null;
        const valid = bcrypt.compare(password, user.password);
        if(!valid) return null;
        ctx.req.session!.userId = user.id;
        return user;
    }
}