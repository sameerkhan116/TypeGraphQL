import * as bcrypt from 'bcryptjs';
import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { User } from "../../entity/User";

@Resolver(User)
export class RegisterResolver {
    @Query(() => String)
    async hello(): Promise<String> {
        return "Hello World";
    }

    // to resolve field in entity that is not in DB
    @FieldResolver()
    async name(@Root() parent: User): Promise<String> {
        return `${parent.firstName} ${parent.lastName}`;
    } 

    @Mutation(() => User)
    async register(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ): Promise<User> {
        const hashedPassword: string= await bcrypt.hash(password, 12);
        const user: User = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}