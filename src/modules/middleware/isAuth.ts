import { MiddlewareFn } from "type-graphql";
import { IMyContext } from "../types/MyContext";

export const isAuth: MiddlewareFn<IMyContext> = async({ context: { req } }, next) => {
    if(req.session && !req.session.userId) {
        throw new Error("Not Authenticated!");
    }
    return next();
}