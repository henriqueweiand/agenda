import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Handbook } from 'src/modules/handbook/handbook.entity';
import { Account } from '../../../modules/account/account.entity';
import { Establishment } from '../../../modules/establishment/establishment.entity';

@InputType()
export class SchedulingInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsOptional()
    @Field({ nullable: true })
    title: string;

    @IsOptional()
    @Field({ nullable: true })
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    @Field({ nullable: false })
    startDate: string;

    @IsNotEmpty()
    @Type(() => Date)
    @Field({ nullable: false })
    endDate: string;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    establishment?: Establishment;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    patient?: Account;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    professional?: Account;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    clerk?: Account;

    @IsOptional()
    @IsUUID('4')
    @Field(() => ID, { nullable: true })
    handbook?: Handbook;
}
