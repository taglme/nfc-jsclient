import Api from '../api';
import AboutService from './about';
import AdapterService from './adapters';

export default class Client {
    private locale: string;
    About: AboutService;
    Adapters: AdapterService;

    constructor(url: string, locale: string) {
        this.locale = locale;
        const api = new Api({
            headers: {
                'Accept-Language': locale,
            },
        });

        this.About = new AboutService(api, url);
        this.Adapters = new AdapterService(api, url);
    }
}
