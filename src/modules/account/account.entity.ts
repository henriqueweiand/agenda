import { Field, ObjectType, InputType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseCollection } from '../common/entities/base.entity';
import { Adresses } from '../adresses/adresses.entity';
import { CreateAdressesInput } from '../adresses/inputs/createAdresses.input';

export enum GenreOptions {
    MASCULINO = 'masc',
    FEMININO = 'fem',
    OUTROS = 'others',
}

@Entity()
@InputType()
export class Account extends BaseCollection {
    @MinLength(3)
    @Field()
    @Column({
        nullable: false,
    })
    firstName: string;

    @IsNotEmpty()
    @Field()
    @Column({
        nullable: false,
    })
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Field()
    @Column({
        nullable: true,
    })
    email: string;

    @IsNotEmpty()
    @Field()
    @Column({
        nullable: false,
    })
    genre: GenreOptions;

    @IsNotEmpty()
    @Field()
    @Column({
        nullable: true,
    })
    dateOfBirth: string;

    @MinLength(6)
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

    // @Field()
    @Field(() => [CreateAdressesInput], { defaultValue: [] })
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
}
