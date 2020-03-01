import Api from '../api';
import PaginationInfo, { PaginationListResource } from './pagination';

enum EventName {
    TagDiscovery = 1,
    TagRelease,
    AdapterDiscovery,
    AdapterRelease,
    JobSubmited,
    JobActivated,
    JobPended,
    JobDeleted,
    JobFinished,
    RunStarted,
    RunSuccess,
    RunError,
    ServerStarted,
    ServerStopped,
}

interface EventResource {
    event_id: string;
    name: string;
    adapter_id: string;
    adapter_name: string;
    data?: any;
    created_at: string;
}

type EventListResource = {
    readonly items: EventResource[];
} & PaginationListResource;

interface EventFilter {
    name?: EventName;
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}

// Function builds events get query params
const buildEventsQueryParams = (adapterID: string | undefined, filter: EventFilter): string => {
    let queryParams = '';

    if (adapterID) {
        queryParams += '&adapter_id=' + adapterID;
    }

    if (filter.name) {
        queryParams += '&name=' + filter.name;
    }

    if (filter.sortBy) {
        queryParams += '&sortby=' + filter.sortBy;
    }

    if (filter.sortDir) {
        queryParams += '&sortdir=' + filter.sortDir;
    }

    if (filter.offset) {
        queryParams += '&offset=' + filter.offset;
    }

    if (filter.limit) {
        queryParams += '&limit=' + filter.limit;
    }

    return queryParams.replace('&', '?');
};

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
        this.name = EventName[EventName[parseInt(e.name)]];
    }
}

interface ListResponse {
    items: Event[];
    pagInfo: PaginationListResource;
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

    getAll = (): Promise<ListResponse> => this.getFiltered(undefined, {});

    getFiltered = (adapterId: string | undefined, filter: EventFilter): Promise<ListResponse> => {
        const url = this.url + this.path + buildEventsQueryParams(adapterId, filter);

        return this.api
            .call<EventListResource>(({ get }) => get(url, {}))
            .then<ListResponse>(resp => ({
                pagInfo: new PaginationInfo(resp),
                items: resp.items.map(e => new Event(e)),
            }));
    };

    add = (e: NewEvent): Promise<Event> => {
        const url = this.url + this.path;

        return this.api
            .call<EventResource>(({ post }) => post(url, { data: e }))
            .then<Event>(resp => new Event(resp));
    };
}
