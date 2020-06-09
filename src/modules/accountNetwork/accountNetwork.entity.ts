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
import { Network } from '../network/network.entity';

export enum RoleOptions {
    ADMIN = 'admin',
    MANAGER = 'manager',
    PROFESSIONAL = 'professional',
    CLERK = 'clerk',
    PATIENT = 'patient',
}

@Entity()
@ObjectType()
export class AccountNetwork {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: RoleOptions,
        default: RoleOptions.PATIENT,
    })
    @Field({ nullable: false })
    role: RoleOptions;

    @Field(() => Network, { nullable: false })
    @Column({ name: 'networkId', type: 'uuid' })
    @ManyToOne(
        () => Network,
        network => network.id,
        {
            onDelete: 'CASCADE',
            nullable: false,
        },
    )
    network: Network;

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
