import Api from '../api';
import AboutService from './about';
import AdapterService from './adapters';
import EventService from './events';

export default class Client {
    private locale: string;
    About: AboutService;
    Adapters: AdapterService;
    Events: EventService;

    constructor(url: string, locale: string) {
        this.locale = locale;
        const api = new Api({
            headers: {
                'Accept-Language': locale,
            },
        });

        this.About = new AboutService(api, url);
        this.Adapters = new AdapterService(api, url);
        this.Events = new EventService(api, url);
    }
}
