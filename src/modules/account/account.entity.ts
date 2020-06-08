import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AccountContact } from '../accountContact/accountContact.entity';
import { Adresses } from '../adresses/adresses.entity';
import { Network } from '../network/network.entity';

export enum GenreOptions {
    MASCULINO = 'masc',
    FEMININO = 'fem',
    OUTROS = 'others',
}

@Entity()
@ObjectType()
export class Account {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    @Field({ name: 'id', nullable: false })
    id: string;

    @Field()
    @Column({
        nullable: false,
    })
    firstName: string;

    @Field()
    @Column({
        nullable: false,
    })
    lastName: string;

    @Field()
    @Column({
        nullable: true,
    })
    email: string;

    @Field()
    @Column({
        nullable: false,
    })
    genre: GenreOptions;

    @Field()
    @Column({
        nullable: true,
    })
    dateOfBirth: string;

    @Field()
    @Column({
        nullable: false,
    })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    @Field(() => [Adresses], { defaultValue: [] })
    @OneToMany(
        () => Adresses,
        adresses => adresses.account,
        {
            nullable: true,
            cascade: ['insert', 'update', 'remove'],
            eager: true,
        },
    )
    adresses: Adresses[];

    @Field(() => [AccountContact], { defaultValue: [] })
    @OneToMany(
        () => AccountContact,
        accountContact => accountContact.account,
        {
            nullable: true,
            cascade: ['insert', 'update', 'remove'],
            eager: true,
        },
    )
    accountContact: AccountContact[];

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
