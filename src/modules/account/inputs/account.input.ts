import { Field, ID, InputType, OmitType } from '@nestjs/graphql';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    MinLength,
} from 'class-validator';
import { AccountContactInput } from '../../../modules/accountContact/inputs/accountContact.input';
import { AdressesInput } from '../../../modules/adresses/inputs/adresses.input';
import { AttachmentInput } from '../../../modules/attachment/inputs/attachment.input';
import { Network } from '../../../modules/network/network.entity';
import { GenreOptions } from '../account.entity';
import { AccountNetworkInput } from 'src/modules/accountNetwork/inputs/accountNetwork.input';

@InputType()
export class AccountAccountNetworkInput extends OmitType(AccountNetworkInput, [
    'account',
]) {}

@InputType()
export class AccountAdressesInput extends OmitType(AdressesInput, [
    'account',
]) {}

@InputType()
export class AccountAttachmentInput extends OmitType(AttachmentInput, [
    'account',
]) {}

@InputType()
export class AccountAccountContactInput extends OmitType(AccountContactInput, [
    'account',
]) {}

@InputType()
export class AccountInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @MinLength(3)
    @Field({ nullable: false })
    firstName: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field({ nullable: true })
    email: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    genre: GenreOptions;

    @IsNotEmpty()
    @Field({ nullable: false })
    dateOfBirth: string;

    @IsOptional()
    @MinLength(6)
    @Field({ nullable: true })
    password?: string;

    @Field(() => [AccountAdressesInput], { defaultValue: [], nullable: true })
    adresses?: AccountAdressesInput[];

    @Field(() => [AccountAccountNetworkInput], {
        defaultValue: [],
        nullable: true,
    })
    accountNetwork?: AccountAccountNetworkInput[];

    @Field(() => [AccountAttachmentInput], { defaultValue: [], nullable: true })
    attachment?: AccountAttachmentInput[];

    @Field(() => [AccountAccountContactInput], {
        defaultValue: [],
        nullable: true,
    })
    accountContact?: AccountAccountContactInput[];

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    network: Network;
}
