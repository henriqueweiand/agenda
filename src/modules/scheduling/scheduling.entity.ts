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
import { Establishment } from '../establishment/establishment.entity';
import { Handbook } from '../handbook/handbook.entity';
import { ColumnTimestampToDateTimeTransformer } from '../common/transformers/columnTimestampToDateTimeTransformer';

@Entity()
@ObjectType()
export class Scheduling {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field({ nullable: true })
    @Column({
        nullable: false,
    })
    title?: string;

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
        transformer: new ColumnTimestampToDateTimeTransformer(),
    })
    start: string;

    @Field({ nullable: false })
    @Column({
        type: 'timestamp',
        nullable: false,
        transformer: new ColumnTimestampToDateTimeTransformer(),
    })
    end: string;

    @Field(() => Establishment, { nullable: false })
    @Column({ name: 'establishmentId', type: 'uuid' })
    @ManyToOne(
        () => Establishment,
        establishment => establishment.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    establishment: Establishment;

    @Field(() => Account, { nullable: false })
    @Column({ name: 'patientId', type: 'uuid' })
    @ManyToOne(
        () => Account,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    patient: Account;

    @Field(() => Account, { nullable: false })
    @Column({ name: 'professionalId', type: 'uuid' })
    @ManyToOne(
        () => Account,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    professional: Account;

    @Field(() => Handbook, { nullable: true })
    @Column({ name: 'handbookId', type: 'uuid', nullable: true })
    @ManyToOne(
        () => Handbook,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: true,
        },
    )
    handbook?: Handbook;

    @Field(() => Account, { nullable: false })
    @Column({ name: 'clerkId', type: 'uuid' })
    @ManyToOne(
        () => Account,
        account => account.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    clerk: Account;

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
