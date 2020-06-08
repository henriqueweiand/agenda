import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Establishment } from '../establishment/establishment.entity';

@Entity()
@ObjectType()
export class Network {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field()
    @Column({
        nullable: false,
    })
    name: string;

    @Field(() => [Account], { defaultValue: [] })
    @OneToMany(
        () => Account,
        account => account.network,
        {
            nullable: true,
            cascade: ['insert', 'update', 'remove'],
            eager: true,
        },
    )
    account: Account[];

    @Field(() => [Establishment], { defaultValue: [] })
    @OneToMany(
        () => Establishment,
        establishment => establishment.network,
        {
            nullable: true,
            cascade: ['insert', 'update', 'remove'],
            eager: true,
        },
    )
    establishment: Establishment[];

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
