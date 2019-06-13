import { IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { PasswordInput } from 'src/modules/shared/PasswordInput';

@InputType()
export class LoginInput extends PasswordInput {
    @Field()
    @IsEmail()
    email: string;
}