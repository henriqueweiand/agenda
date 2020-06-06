import { Transform } from 'class-transformer';
import { IsOptional, Max } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BaseGetAllType {
    @Field({ nullable: true, defaultValue: 30 })
    @IsOptional()
    @Transform(value => parseInt(value))
    @Max(50)
    take?: number;

    @Field({ nullable: true, defaultValue: 0 })
    @Transform(value => parseInt(value))
    @IsOptional()
    skip?: number;

    @Field({ nullable: true })
    @IsOptional()
    search?: string;
}
