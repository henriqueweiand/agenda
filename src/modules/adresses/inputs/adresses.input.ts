import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Account } from '../../../modules/account/account.entity';

@InputType()
export class AdressesInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    zip: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    address: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    number: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    district: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    city: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    state: string;

    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    account: Account;
}
