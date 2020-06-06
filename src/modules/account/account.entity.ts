import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Adresses } from '../adresses/adresses.entity';

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
