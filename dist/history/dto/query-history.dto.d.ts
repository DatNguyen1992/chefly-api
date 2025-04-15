import { QRType, SortType } from '@common/constants';
import { BaseQuery } from '@shared/interfaces/base-query.interface';
export declare class QueryHistoryDto extends BaseQuery {
    type: QRType;
    sort?: SortType;
}
