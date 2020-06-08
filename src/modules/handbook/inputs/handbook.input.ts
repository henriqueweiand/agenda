import { Field, ID, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Account } from 'src/modules/account/account.entity';
import { SchedulingInput } from '../../../modules/scheduling/inputs/scheduling.input';

@InputType()
export class HandbookSchedulingInput extends OmitType(SchedulingInput, [
    'handbook',
]) {}

@InputType()
export class HandbookInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsOptional()
    @Field({ nullable: true })
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    @Field({ nullable: false })
    date: string;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    account?: Account;

    @IsOptional()
    @Field(() => [HandbookSchedulingInput], {
        nullable: true,
        defaultValue: [],
    })
    scheduling?: HandbookSchedulingInput[];
}
