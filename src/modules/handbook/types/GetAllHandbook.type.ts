import { ArgsType } from '@nestjs/graphql';
import { BaseGetAllType } from '../../common/args/baseGetAll.type';

@ArgsType()
export class GetAllHandbookType extends BaseGetAllType {}
