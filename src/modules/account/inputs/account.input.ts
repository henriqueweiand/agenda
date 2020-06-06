import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { AdressesInput } from 'src/modules/adresses/inputs/adresses.input';
import { GenreOptions } from '../account.entity';
import { AccountContactInput } from 'src/modules/accountContact/inputs/accountContact.input';

@InputType()
export class AccountAdressesInput extends OmitType(AdressesInput, [
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

    @MinLength(6)
    @Field({ nullable: false })
    password: string;

    @Field(() => [AccountAdressesInput], { defaultValue: [], nullable: true })
    adresses?: AccountAdressesInput[];

    @Field(() => [AccountAccountContactInput], {
        defaultValue: [],
        nullable: true,
    })
    accountContact?: AccountAccountContactInput[];
}
