import Api from './api';
import Client from './client';
import { IApi } from './interfaces';

export default class NfcClient extends Client {
    constructor(url: string, locale: string, authToken?: string) {
        const api: IApi = new Api({
            headers: {
                'Accept-Language': locale,
                Authorization: 'Bearer ' + authToken,
            },
        });

        super(url, locale, api);
    }
}
