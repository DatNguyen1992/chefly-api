import { FolderType, SortType } from '../enums/folder-type.enum';
import { BaseQuery } from '@shared/interfaces/base-query.interface';
export declare class QueryFolderDto extends BaseQuery {
    type?: FolderType;
    sort?: SortType;
}
