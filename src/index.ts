import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers';

const PORT = 4000;

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver]
    });

    const apolloServer = new ApolloServer({schema});
    const app = express();
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}/graphql`)
    });
}

main();