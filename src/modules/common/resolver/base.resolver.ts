import { UseFilters } from '@nestjs/common';
import { MappedExceptionFilter } from 'nestjs-mapped-exception';

@UseFilters(MappedExceptionFilter)
export class BaseResolver {}
