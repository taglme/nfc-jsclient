import { PaginationListResource } from '../pagination';

export enum EventName {
    Unknown,
    TagDiscovery,
    TagRelease,
    AdapterDiscovery,
    AdapterRelease,
    JobSubmitted,
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

export namespace EventName {
    export function toString(name: EventName): string {
        const names = [
            'unknown',
            'tag_discovery',
            'tag_release',
            'adapter_discovery',
            'adapter_release',
            'job_submitted',
            'job_activated',
            'job_pended',
            'job_deleted',
            'job_finished',
            'run_started',
            'run_success',
            'run_error',
            'server_started',
            'server_stopped',
        ];

        if (name < EventName.TagDiscovery || name > EventName.ServerStopped) {
            return names[0];
        }

        return names[name];
    }

    export function parse(n: string): EventName {
        switch (n) {
            case EventName.toString(EventName.TagDiscovery):
                return EventName.TagDiscovery;
            case EventName.toString(EventName.TagRelease):
                return EventName.TagRelease;
            case EventName.toString(EventName.AdapterDiscovery):
                return EventName.AdapterDiscovery;
            case EventName.toString(EventName.AdapterRelease):
                return EventName.AdapterRelease;
            case EventName.toString(EventName.JobSubmitted):
                return EventName.JobSubmitted;
            case EventName.toString(EventName.JobActivated):
                return EventName.JobActivated;
            case EventName.toString(EventName.JobPended):
                return EventName.JobPended;
            case EventName.toString(EventName.JobDeleted):
                return EventName.JobDeleted;
            case EventName.toString(EventName.JobFinished):
                return EventName.JobFinished;
            case EventName.toString(EventName.RunStarted):
                return EventName.RunStarted;
            case EventName.toString(EventName.RunSuccess):
                return EventName.RunSuccess;
            case EventName.toString(EventName.RunError):
                return EventName.RunError;
            case EventName.toString(EventName.ServerStarted):
                return EventName.ServerStarted;
            case EventName.toString(EventName.ServerStopped):
                return EventName.ServerStopped;
        }

        return EventName.Unknown;
    }
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
