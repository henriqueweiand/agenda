import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

export abstract class BaseCollection {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'LOCALTIMESTAMP',
    })
    createdAt: string;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'LOCALTIMESTAMP',
    })
    updatedAt: string;

    @DeleteDateColumn({
        type: 'timestamp',
        default: null,
        nullable: true,
    })
    deletedAt: string;
}
