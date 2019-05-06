import { Resolver, Ctx, Query } from "type-graphql";
import { User } from "../../entity/User";
import { IMyContext } from '../types/MyContext';

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() ctx: IMyContext
    ): Promise<User | null> {
        const id = ctx.req.session!.userId;
        if(!id) return null;
        const user = await User.findOne({ where: { id }});
        if(!user) return null;
        return user;
    }
}