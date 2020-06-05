import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdressesResolver } from './adresses.resolver';
import { AdressesService } from './adresses.service';
import { Adresses } from './adresses.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Adresses])],
    providers: [AdressesResolver, AdressesService],
    exports: [AdressesService],
})
export class AdressesModule {}
