import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Account } from '../../../modules/account/account.entity';
import { AccountContactTypeOptions } from '../accountContact.entity';

@InputType()
export class AccountContactInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    type: AccountContactTypeOptions;

    @IsNotEmpty()
    @Field({ nullable: false })
    value: string;

    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    account: Account;
}
