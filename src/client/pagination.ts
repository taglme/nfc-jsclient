export interface PaginationListResource {
    readonly total: number;
    readonly length: number;
    readonly limit: number;
    readonly offset: number;
}

export default class PaginationInfo {
    readonly total: number;
    readonly length: number;
    readonly limit: number;
    readonly offset: number;

    constructor(i: PaginationListResource) {
        this.total = i.total;
        this.length = i.length;
        this.limit = i.limit;
        this.offset = i.offset;
    }
}

export interface ListResponse<T extends {}> {
    items: T[];
    pagInfo: PaginationListResource;
}
