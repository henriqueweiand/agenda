import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AdressesType } from 'src/modules/adresses/types/adresses.type';
import { GenreOptions } from '../account.entity';

@ObjectType('Account')
export class AccountType {
    @Field(type => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    dateOfBirth: string;

    @Field()
    genre: GenreOptions;

    @Field(() => [AdressesType], { nullable: true })
    adresses: AdressesType[];
}
