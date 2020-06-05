import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountType } from 'src/modules/account/types/account.type';

@ObjectType('Adresses')
export class AdressesType {
    @Field(type => ID)
    id: string;

    @Field()
    zip: string;

    @Field()
    address: string;

    @Field()
    number: string;

    @Field()
    district: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field(() => AccountType, { nullable: false })
    account: AccountType;
}
