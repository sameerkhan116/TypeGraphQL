import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { DoesEmailAlreadyExist } from './doesEmailAlreadyExist';

@InputType()
export class RegisterInput {
    @Field()
    @Length(2, 30)
    firstName: string;

    @Field()
    @Length(2, 30)
    lastName: string;

    @Field()
    @IsEmail()
    @DoesEmailAlreadyExist({ message: "A user with that email already exists." })
    email: string;

    @Field()
    password: string;
}