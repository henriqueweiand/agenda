import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Scheduling } from '../scheduling/scheduling.entity';

@Entity()
@ObjectType()
export class Handbook {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field({ nullable: true })
    @Column({
        nullable: false,
        type: 'text',
    })
    description?: string;

    @Field({ nullable: false })
    @Column({
        type: 'timestamp',
        nullable: false,
    })
    date: string;

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

    @Field(() => [Scheduling], { defaultValue: [] })
    @OneToMany(
        () => Scheduling,
        scheduling => scheduling.handbook,
        {
            nullable: true,
            cascade: ['insert', 'update', 'remove'],
            eager: true,
        },
    )
    scheduling: Scheduling[];

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
