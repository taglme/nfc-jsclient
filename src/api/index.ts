import axios, { AxiosInstance, AxiosRequestConfig, Method, AxiosPromise } from 'axios';
import { pick } from 'lodash';
import { IApi, FunctionApiCallback, TRequestHandlers } from '../interfaces';

const axiosInstance = axios.create();

export default class Api implements IApi {
    private axiosInstance: AxiosInstance;
    constructor(config?: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
    }

    private makeRequest = <T extends {}>(
        method: Method,
        url: string,
        options: AxiosRequestConfig = {},
    ): AxiosPromise<T> => {
        const { data, params } = options;
        const headers = { ...axiosInstance.defaults.headers, ...options.headers };

        return this.axiosInstance({ method, url, data, params, headers }).then(response =>
            pick(response, ['data', 'status']),
        );
    };

    private get = <T extends {}>(url: string, config: AxiosRequestConfig): AxiosPromise<T> =>
        this.makeRequest('get', url, config);
    private post = <T extends {}>(url: string, config: AxiosRequestConfig): AxiosPromise<T> =>
        this.makeRequest('post', url, config);
    private put = <T extends {}>(url: string, config: AxiosRequestConfig): AxiosPromise<T> =>
        this.makeRequest('put', url, config);
    private patch = <T extends {}>(url: string, config: AxiosRequestConfig): AxiosPromise<T> =>
        this.makeRequest('patch', url, config);
    private del = <T extends {}>(url: string, config: AxiosRequestConfig): AxiosPromise<T> =>
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

    public setAuth = (token: string): void => {
        this.axiosInstance.defaults.headers.Authorization = token;
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
