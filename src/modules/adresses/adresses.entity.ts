import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Account } from '../account/account.entity';
import { BaseCollection } from '../common/entities/base.entity';

@Entity()
@InputType()
export class Adresses extends BaseCollection {
    @IsNotEmpty()
    @Column({ nullable: false })
    @Field()
    zip: string;

    @IsNotEmpty()
    @Field()
    @Column({ nullable: false })
    address: string;

    @IsNotEmpty()
    @Field()
    @Column({ nullable: false })
    number: string;

    @IsNotEmpty()
    @Field()
    @Column({ nullable: false })
    district: string;

    @IsNotEmpty()
    @Field()
    @Column({ nullable: false })
    city: string;

    @IsNotEmpty()
    @Field()
    @Column({ nullable: false })
    state: string;

    @IsUUID('4')
    @Field(() => ID, { nullable: false })
    @Column({ name: 'accountId', type: 'uuid' })
    @ManyToOne(
        () => Account,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    account: string;
}
