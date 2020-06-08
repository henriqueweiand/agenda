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
import { Network } from '../network/network.entity';

@Entity()
@ObjectType()
export class Establishment {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field({ nullable: false })
    @Column({
        nullable: false,
    })
    name: string;

    @Field({ defaultValue: false, nullable: false })
    @Column({
        nullable: false,
        default: false,
        type: 'boolean',
    })
    main: boolean;

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

    // @Field(() => [Scheduling], { defaultValue: [] })
    // @OneToMany(
    //     () => Scheduling,
    //     scheduling => scheduling.account,
    //     {
    //         nullable: true,
    //     },
    // )
    // network: Scheduling[];

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
