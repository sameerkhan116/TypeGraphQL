import { buildSchema, ResolverData } from "type-graphql";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

export const createSchema = () => buildSchema({
    resolvers: [__dirname + '/modules/*/*.ts'],
    authChecker: ({ context: { req } }: ResolverData<ExpressContext>): boolean => {
        return req.session.userId !== null;
    }
});