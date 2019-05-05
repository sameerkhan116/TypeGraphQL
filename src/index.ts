import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { RegisterResolver } from './modules/user/Register';

const PORT: number = 4000;

const main = async (): Promise<void> => {
    // connect to DB (settings in ormconfig.json)
    await createConnection();
    // build graphql schema
    const schema: GraphQLSchema = await buildSchema({
        resolvers: [RegisterResolver]
    });
    // create ApolloServer with schema
    const apolloServer: ApolloServer = new ApolloServer({ schema });
    // create express instance
    const app = express();
    // pass express instance as middleware to apolloServer
    apolloServer.applyMiddleware({ app });
    //start the server
    app.listen(PORT, (): void => {
        console.log(`Server started on http://localhost:${PORT}/graphql`)
    });
}

main();