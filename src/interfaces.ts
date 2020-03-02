import { AxiosPromise, AxiosRequestConfig } from 'axios';

export type FunctionReq = <T extends {}>(url: string, config: AxiosRequestConfig) => AxiosPromise<T>;
export interface TRequestHandlers {
    get: FunctionReq;
    post: FunctionReq;
    put: FunctionReq;
    patch: FunctionReq;
    del: FunctionReq;
}
export type FunctionApiCallback = <T extends {}>(h: TRequestHandlers) => AxiosPromise<T>;

export interface IApi {
    updateApi: (config: AxiosRequestConfig) => void;
    call: <T extends {}>(cb: FunctionApiCallback) => Promise<T>;
    readonly requestHandlers: TRequestHandlers;
}

export interface SearchFilter {
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}
