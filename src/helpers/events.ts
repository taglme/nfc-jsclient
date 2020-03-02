import { EventFilter, EventName } from '../models/events';

export const buildEventsQueryParams = (adapterID: string | undefined, filter: EventFilter): string => {
    let queryParams = '';

    if (adapterID) {
        queryParams += '&adapter_id=' + adapterID;
    }

    if (filter.name) {
        queryParams += '&name=' + EventName.toString(filter.name);
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
