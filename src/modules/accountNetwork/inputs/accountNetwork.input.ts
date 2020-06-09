import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Account } from '../../../modules/account/account.entity';
import { Network } from 'src/modules/network/network.entity';
import { RoleOptions } from '../accountNetwork.entity';

@InputType()
export class AccountNetworkInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    role: RoleOptions;

    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    account: Account;

    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    network: Network;
}
