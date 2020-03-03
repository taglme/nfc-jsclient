import PaginationInfo, { ListResponse } from '../models/pagination';
import { EventResource, EventName, EventListResource, EventFilter, NewEvent } from '../models/events';
import { buildEventsQueryParams } from '../helpers/events';
import { IApi } from '../interfaces';

export class Event {
    eventID: string;
    name: EventName;
    adapterID: string;
    adapterName: string;
    data?: any;
    createdAt: Date;

    constructor(e: EventResource) {
        this.eventID = e.event_id;
        this.adapterID = e.adapter_id;
        this.adapterName = e.adapter_name;
        this.data = e.data;
        this.createdAt = new Date(e.created_at);
        this.name = EventName.parse(e.name);
    }
}

export default class EventService {
    private readonly url: string;
    private api: IApi;
    private path = '/events';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    getAll = (): Promise<ListResponse<Event> | Error> => this.getFiltered(undefined, {});

    getFiltered = (adapterId: string | undefined, filter: EventFilter): Promise<ListResponse<Event> | Error> => {
        const url = this.url + this.path + buildEventsQueryParams(adapterId, filter);

        return this.api
            .call<EventListResource>(({ get }) => get(url, {}))
            .then<ListResponse<Event>>(resp => ({
                pagInfo: new PaginationInfo(resp),
                items: resp.items.map(e => new Event(e)),
            }))
            .catch((err: Error) => new Error('Error on events get filtered: ' + err.name + err.message));
    };

    add = (e: NewEvent): Promise<Event | Error> => {
        const url = this.url + this.path;

        return this.api
            .call<EventResource>(({ post }) => post(url, { data: { e } }))
            .then<Event>(resp => new Event(resp))
            .catch((err: Error) => new Error('Error on event add: ' + err.name + err.message));
    };
}
