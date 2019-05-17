import * as bcrypt from 'bcryptjs';
import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
    @Authorized()
    @Query(() => String)
    async hello(): Promise<String> {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("input") { firstName, lastName, email, password }: RegisterInput
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