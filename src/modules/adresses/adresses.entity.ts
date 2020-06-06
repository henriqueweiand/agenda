import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
@ObjectType()
export class Adresses {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

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

    @Field(() => Account, { nullable: false })
    @Column({ name: 'accountId', type: 'uuid' })
    @ManyToOne(
        () => Account,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    account: Account;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'LOCALTIMESTAMP',
    })
    @Field()
    createdAt: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'LOCALTIMESTAMP',
    })
    @Field()
    updatedAt: string;

    @DeleteDateColumn({
        type: 'timestamp',
        default: null,
        nullable: true,
    })
    @Field()
    deletedAt: string;
}
