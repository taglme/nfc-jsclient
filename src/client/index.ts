import AboutService from './about';
import AdapterService from './adapters';
import EventService from './events';
import { IApi } from '../interfaces';
import JobService from './jobs';
import RunService from './runs';
import { TagService } from './tags';
import { SnippetService } from './snippets';
import WsService from './ws';
import LicenseService from './license';

export default class Client {
    private locale: string;
    private api: IApi;
    About: AboutService;
    Adapters: AdapterService;
    Events: EventService;
    Snippets: SnippetService;
    Tags: TagService;
    Runs: RunService;
    Jobs: JobService;
    Licenses: LicenseService;
    Ws: WsService;

    constructor(url: string, locale: string, api: IApi) {
        const httpUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'http://' + url;
        const wsUrl = url.startsWith('https://')
            ? httpUrl.replace(/^https:\/\//, 'wss://')
            : httpUrl.replace(/^http:\/\//, 'ws://');

        this.locale = locale;
        this.api = api;
        this.About = new AboutService(api, httpUrl);
        this.Adapters = new AdapterService(api, httpUrl);
        this.Events = new EventService(api, httpUrl);
        this.Snippets = new SnippetService(api, httpUrl);
        this.Tags = new TagService(api, httpUrl);
        this.Runs = new RunService(api, httpUrl);
        this.Jobs = new JobService(api, httpUrl);
        this.Licenses = new LicenseService(api, httpUrl);
        this.Ws = new WsService(wsUrl);
    }

    setLocale(lang: string): void {
        this.locale = lang;
        this.api.setLocale(lang);
    }

    setAppKey(token: string): void {
        this.api.setAppKey(token);
    }

    setUserToken(token: string): void {
        this.api.setUserToken(token);
    }
}
