import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AccountInput } from '../../../modules/account/inputs/account.input';
import { EstablishmentInput } from '../../../modules/establishment/inputs/establishment.input';

@InputType()
export class NetworkEstablishmentInput extends OmitType(EstablishmentInput, [
    'network',
]) {}

@InputType()
export class NetworkInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    name: string;

    @Field(() => [AccountInput], { defaultValue: [], nullable: true })
    account: AccountInput[];

    @Field(() => [NetworkEstablishmentInput], {
        defaultValue: [],
        nullable: true,
    })
    establishment?: NetworkEstablishmentInput[];
}
