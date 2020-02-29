import Api from '../api';
import About from './about';

export default class Client {
    private locale: string;
    About: About;

    constructor(url: string, locale: string) {
        this.locale = locale;
        const api = new Api({
            headers: {
                'Accept-Language': locale,
            },
        });

        this.About = new About(api, url);
    }
}
