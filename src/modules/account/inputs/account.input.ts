import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AdressesInput } from 'src/modules/adresses/inputs/adresses.input';
import { GenreOptions } from '../account.entity';

@InputType()
export class AccountAdressesInput extends OmitType(AdressesInput, [
    'account',
]) {}

@InputType()
export class AccountInput {
    @MinLength(3)
    @Field()
    firstName: string;

    @IsNotEmpty()
    @Field()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @Field()
    genre: GenreOptions;

    @IsNotEmpty()
    @Field()
    dateOfBirth: string;

    @MinLength(6)
    @Field()
    password: string;

    @Field(() => [AccountAdressesInput], { defaultValue: [] })
    adresses: AccountAdressesInput[];
}
