import AboutService from './about';
import AdapterService from './adapters';
import EventService from './events';
import { IApi } from '../interfaces';
import JobService from './jobs';
import RunService from './runs';
import { TagService } from './tags';
import { SnippetService } from './snippets';
import WsService from './ws';

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
    Ws: WsService;

    constructor(url: string, locale: string, api: IApi) {
        const httpUrl = 'http://' + url;
        const wsUrl = 'ws://' + url;

        this.locale = locale;
        this.api = api;
        this.About = new AboutService(api, httpUrl);
        this.Adapters = new AdapterService(api, httpUrl);
        this.Events = new EventService(api, httpUrl);
        this.Snippets = new SnippetService(api, httpUrl);
        this.Tags = new TagService(api, httpUrl);
        this.Runs = new RunService(api, httpUrl);
        this.Jobs = new JobService(api, httpUrl);
        this.Ws = new WsService(wsUrl);
    }
}
