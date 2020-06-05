import { InputType, ObjectType } from '@nestjs/graphql';
import { Adresses } from '../adresses.entity';

@InputType()
export class CreateAdressesInput extends Adresses {}
