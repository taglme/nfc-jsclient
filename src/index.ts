import Api from './api';
import Client from './client';
import { IApi } from './interfaces';

export default class NfcClient extends Client {
    constructor(url: string, locale: string) {
        const api: IApi = new Api({
            headers: {
                'Accept-Language': locale,
            },
        });

        super(url, locale, api);
    }
}

// Below is written for testing purposes and  will be removed
const client = new NfcClient('http://127.0.0.1:3011', 'en');
client.About.get();
