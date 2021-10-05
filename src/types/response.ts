export interface ResponseBody<T> {
    data: T;
}

export interface ResponseBodyWithRowCount<T> {
    data: T;
    rowCount: number;
}
// export interface PagedResponseBody<T> extends ResponseBody<T[]> {  // broken in typescript-rest-swagger for now...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PagedResponseBody<T extends any[]> extends ResponseBody<T> {
    paging: {
        rows: number;
        pages: number;
        offset: number;
        limit: number;
        links: {
            first: string;
            last: string;
            previous?: string;
            next?: string;
        };
    };
}
