import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength, IsUUID } from 'class-validator';
import { Network } from 'src/modules/network/network.entity';

@InputType()
export class EstablishmentInput {
    @IsOptional()
    @Field({ nullable: true })
    id?: string;

    @MinLength(3)
    @Field({ nullable: false })
    name: string;

    @IsOptional()
    @Field({ nullable: false, defaultValue: false })
    main: boolean;

    @IsNotEmpty()
    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    network?: Network;
}
