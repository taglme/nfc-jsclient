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
        this.locale = locale;
        this.api = api;
        this.About = new AboutService(api, url);
        this.Adapters = new AdapterService(api, url);
        this.Events = new EventService(api, url);
        this.Snippets = new SnippetService(api, url);
        this.Tags = new TagService(api, url);
        this.Runs = new RunService(api, url);
        this.Jobs = new JobService(api, url);
        this.Ws = new WsService(url);
    }
}
