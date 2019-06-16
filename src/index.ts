import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema, ResolverData } from 'type-graphql';
import { createConnection } from "typeorm";
import { GraphQLSchema } from "graphql";
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { redis } from "./redis";

const PORT: number = 4000;


const main = async (): Promise<void> => {
    // connect to DB (settings in ormconfig.json)
    try {
        await createConnection();
    } catch(error) { // handling promise rejection
        console.log(error);
    }
    // build graphql schema
    const schema: GraphQLSchema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.ts'],
        authChecker: ({ context: { req } }: ResolverData<ExpressContext>): boolean => {
            return req.session.userId !== null;
        }
    });
    // create ApolloServer with schema
    const apolloServer: ApolloServer = new ApolloServer({ 
        schema,
        context: ({ req, res }: ExpressContext) => ({ req, res }) 
    });
    // create express instance
    const app = express();
    const RedisStore: connectRedis.RedisStore = connectRedis(session);
    // apply this middleware before we reach resolvers
    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: "sajkh3214jkjl",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365
            }
        })
    );
    app.use(cors({
        credentials: true,
        origin: '*'
    }));
    // pass express instance as middleware to apolloServer
    apolloServer.applyMiddleware({ app });
    //start the server
    app.listen(PORT, (): void => {
        console.log(`Server started on http://localhost:${PORT}/graphql`)
    });
}

main();