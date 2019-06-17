import * as bcrypt from 'bcryptjs';
import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationURL } from '../utils/createConfirmationURL';

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth)
    @Query(() => String)
    async hello(): Promise<String> {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("input") { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword: string = await bcrypt.hash(password, 12);
        const user: User = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();
        await sendEmail(email, await createConfirmationURL(user.id));
        return user;
    }
}