import * as moment from 'moment';

export class ColumnTimestampToDateTimeTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string | number): string {
        return moment(data).format('YYYY-MM-DD HH:mm:ss');
    }
}
