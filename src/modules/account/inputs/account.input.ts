import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { AdressesInput } from 'src/modules/adresses/inputs/adresses.input';
import { GenreOptions } from '../account.entity';

@InputType()
export class AccountAdressesInput extends OmitType(AdressesInput, [
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
    adresses: AccountAdressesInput[];
}
