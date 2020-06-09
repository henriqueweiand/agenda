import { Field, ObjectType } from '@nestjs/graphql';
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
export class Attachment {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field({ nullable: false })
    @Column({
        nullable: false,
    })
    file: string;

    @Field({ nullable: false })
    @Column({
        nullable: false,
    })
    provider: string;

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
    @Field({ nullable: true })
    createdAt?: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'LOCALTIMESTAMP',
    })
    @Field({ nullable: true })
    updatedAt?: string;

    @DeleteDateColumn({
        type: 'timestamp',
        default: null,
        nullable: true,
    })
    @Field({ nullable: true })
    deletedAt?: string;
}
