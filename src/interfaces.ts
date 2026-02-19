import { AxiosRequestConfig } from 'axios';

export type ApiResponse<T extends {}> = { data: T; status: number };

export type FunctionReq = <T extends {}>(url: string, config: AxiosRequestConfig) => Promise<ApiResponse<T>>;
export interface TRequestHandlers {
    get: FunctionReq;
    post: FunctionReq;
    put: FunctionReq;
    patch: FunctionReq;
    del: FunctionReq;
}
export type FunctionApiCallback = <T extends {}>(h: TRequestHandlers) => Promise<ApiResponse<T>>;

export interface IApi {
    updateApi: (config: AxiosRequestConfig) => void;
    setLocale: (lang: string) => void;
    setAppKey: (token: string) => void;
    setUserToken: (token: string) => void;
    call: <T extends {}>(cb: FunctionApiCallback) => Promise<T>;
    readonly requestHandlers: TRequestHandlers;
}

export interface SearchFilter {
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}
