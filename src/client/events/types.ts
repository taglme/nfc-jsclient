import { PaginationListResource } from '../pagination';

export enum EventName {
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

export interface EventResource {
    event_id: string;
    name: string;
    adapter_id: string;
    adapter_name: string;
    data?: any;
    created_at: string;
}

export type EventListResource = {
    readonly items: EventResource[];
} & PaginationListResource;

export interface EventFilter {
    name?: EventName;
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}
