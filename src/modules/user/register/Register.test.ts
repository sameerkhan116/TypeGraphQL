import { Connection } from "typeorm";
import { testConn } from "../../../test-utils/testConn";
import { graphqlCall } from "../../../test-utils/graphqlCall";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutation = `
    mutation Register($input: RegisterInput!) {
        register(
            input: $input
        ) {
            id
            firstName
            lastName
            email
            name
        }
    }
`;

describe('Register', () => {
    it("create user", async () => {
        console.log(await graphqlCall({
            source: registerMutation,
            variableValues: {
                input: {
                    firstName: 'Sam',
                    lastName: 'Khan',
                    email: 'sam@sam.com',
                    password: 'sjadkajsd'
                }
            }
        }));
    });
});