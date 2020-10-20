import { ObjectType, Field } from '@nestjs/graphql';
import { Account } from '../../account/account.entity'

@ObjectType('Login')
export class LoginType {
    @Field()
    expiresIn: number;

    @Field()
    accessToken: string;

    @Field()
    account: Account;
}
