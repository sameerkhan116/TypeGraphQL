import { Resolver, Ctx, Mutation } from "type-graphql";
import { IMyContext } from "../types/MyContext";

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: IMyContext
    ): Promise<Boolean> {
        return new Promise((res, rej) => 
            ctx.req.session!.destroy((err) => {
                if(err) {
                    console.log(err);
                    return rej(false);
                }
                ctx.res.clearCookie("qid");
                return res(true);
            }));
    }
}