import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", { unique: true })
    email: string;

    // not in db, only in GraphQL Schema, needs to be resolved in resolvers
    // can directly resolve this field here
    @Field()
    name(@Root() { firstName, lastName }: User): string {
        return `${firstName} ${lastName}`
    }

    @Column()
    password: string;

    @Column('bool', { default: false })
    confirmed: boolean;
}