import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { Account } from '../../../modules/account/account.entity';

@InputType()
export class AttachmentInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @IsOptional()
    @Field({ nullable: false })
    file: string;

    @IsOptional()
    @Field({ nullable: false })
    provider: string;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    account: Account;
}
