import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { ApiResponse, IApi, FunctionApiCallback, TRequestHandlers } from '../interfaces';

function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const out = {} as Pick<T, K>;
    for (const k of keys) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, k)) {
            out[k] = obj[k];
        }
    }
    return out;
}

export default class Api implements IApi {
    private axiosInstance: AxiosInstance;
    constructor(config?: AxiosRequestConfig, instance?: AxiosInstance) {
        this.axiosInstance = instance || axios.create(config);
        if (config && instance) {
            // Merge provided config into the injected instance defaults (useful for tests).
            this.axiosInstance.defaults = { ...this.axiosInstance.defaults, ...config } as any;
        }
    }

    private makeRequest = <T extends {}>(
        method: Method,
        url: string,
        options: AxiosRequestConfig = {},
    ): Promise<ApiResponse<T>> => {
        const { data, params } = options;
        const headers = {
            ...(this.axiosInstance.defaults.headers as any),
            ...(options.headers as any),
        } as any;

        return (this.axiosInstance as any)({ method, url, data, params, headers } as any).then((response: any) => {
            const picked = pick(response as any, ['data', 'status']);
            return picked as ApiResponse<T>;
        });
    };

    private get = <T extends {}>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        this.makeRequest('get', url, config);
    private post = <T extends {}>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        this.makeRequest('post', url, config);
    private put = <T extends {}>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        this.makeRequest('put', url, config);
    private patch = <T extends {}>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        this.makeRequest('patch', url, config);
    private del = <T extends {}>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        this.makeRequest('delete', url, config);

    public readonly requestHandlers: TRequestHandlers = {
        get: this.get,
        post: this.post,
        put: this.put,
        patch: this.patch,
        del: this.del,
    };

    public updateApi = (config: AxiosRequestConfig): void => {
        this.axiosInstance = axios.create(config);
    };

    public setLocale = (lang: string): void => {
        this.axiosInstance.defaults.headers['Accept-Language'] = lang;
    };

    public setAppKey = (token: string): void => {
        this.axiosInstance.defaults.headers['X-App-Key'] = token;
    };

    public setUserToken = (token: string): void => {
        this.axiosInstance.defaults.headers['X-User-Token'] = token;
    };

    public call = <T extends {}>(cb: FunctionApiCallback): Promise<T> =>
        cb<T>(this.requestHandlers)
            .then(r => r.data)
            .catch(error =>
                error.response
                    ? Promise.reject({
                          error: true,
                          ...pick(error.response, ['data', 'status']),
                      })
                    : Promise.reject({ error: error.message }),
            );
}
