import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adresses } from './adresses.entity';
// import { CreateAdressesInput } from './inputs/createAdresses.input';

@Injectable()
export class AdressesService {
    constructor(
        @InjectRepository(Adresses)
        private adressesRepository: Repository<Adresses>,
    ) {}

    async getAdresses(): Promise<Adresses[]> {
        return this.adressesRepository.find();
    }

    public async getById(id: string): Promise<Adresses> {
        return await this.adressesRepository.findOne({ id });
    }

    public async getByAccount(id: string): Promise<Adresses[]> {
        return await this.adressesRepository.find({ where: { account: id } });
    }

    create(adresses: Adresses): Adresses {
        return this.adressesRepository.create(adresses);
    }

    async update(
        role: Adresses,
        createAdressesInput: Adresses,
    ): Promise<Adresses> {
        const roleUpdate = this.adressesRepository.merge(
            role,
            createAdressesInput,
        );

        return await this.adressesRepository.save(roleUpdate);
    }

    async delete(role: Adresses): Promise<boolean> {
        await this.adressesRepository.delete(role);

        return true;
    }
}
