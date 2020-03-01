import Api from '../../api';
import PaginationInfo, { ListResponse } from '../pagination';
import { EventResource, EventName, EventListResource, EventFilter } from './types';
import { buildEventsQueryParams } from './helpers';

class Event {
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

interface NewEvent {
    name: string;
    adapter_id: string;
    data?: any;
}

export default class EventService {
    private readonly url: string;
    private api: Api;
    private path = '/events';

    constructor(api: Api, url: string) {
        this.url = url;
        this.api = api;
    }

    getAll = (): Promise<ListResponse<Event>> => this.getFiltered(undefined, {});

    getFiltered = (adapterId: string | undefined, filter: EventFilter): Promise<ListResponse<Event>> => {
        const url = this.url + this.path + buildEventsQueryParams(adapterId, filter);

        return this.api
            .call<EventListResource>(({ get }) => get(url, {}))
            .then<ListResponse<Event>>(resp => ({
                pagInfo: new PaginationInfo(resp),
                items: resp.items.map(e => new Event(e)),
            }));
    };

    add = (e: NewEvent): Promise<Event> => {
        const url = this.url + this.path;

        return this.api
            .call<EventResource>(({ post }) => post(url, { data: { e } }))
            .then<Event>(resp => new Event(resp));
    };
}
