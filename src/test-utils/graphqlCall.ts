import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../createSchema";
import Maybe from "graphql/tsutils/Maybe";

interface IOptions {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any
    }>
}

let schema: GraphQLSchema;

export const graphqlCall = async (
    { source, variableValues }: IOptions
) => {
    if(!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues
    });
}