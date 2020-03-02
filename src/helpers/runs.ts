import { JobRunStatus, RunFilter } from '../models/run';

export const buildJobRunsQueryParams = (filter: RunFilter): string => {
    let queryParams = '';

    if (filter.jobId) {
        queryParams += '&job_id=' + filter.jobId;
    }

    if (filter.status) {
        queryParams += '&status=' + JobRunStatus.toString(filter.status);
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
