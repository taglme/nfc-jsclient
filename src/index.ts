import Api from './api';
import Client from './client';
import { IApi } from './interfaces';

export default class NfcClient extends Client {
    constructor(url: string, locale: string, xAppKey: string, xUserToken?: string) {
        const api: IApi = new Api({
            headers: {
                'Accept-Language': locale,
                'X-App-Key': xAppKey,
                ...(xUserToken ? { 'X-User-Token': xUserToken } : {}),
            },
        });

        super(url, locale, api);
    }
}
