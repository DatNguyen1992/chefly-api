export declare class PaginationData<T> {
    page: number;
    totalCount: number;
    totalPage: number;
    totalInList: number;
    limit: number;
    data: T[];
}
export declare class DataFilter<T> {
    condition?: Partial<T> | object;
    limit?: number;
    page?: number;
    selectCols?: string[];
    sort?: any;
    population?: PopulationQuery[];
}
export declare class PopulationQuery {
    path: string;
    select?: string;
    populate?: PopulationQuery[];
    match?: any;
}
