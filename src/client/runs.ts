import PaginationInfo, { ListResponse } from '../models/pagination';
import { JobRunResource, JobRunStatus, JobRunListResource, RunFilter, StepResultResource } from '../models/run';
import { buildJobRunsQueryParams } from '../helpers/runs';
import { Tag } from './tags';
import {
    AuthPasswordOutputResource,
    Command,
    CommandStatus,
    CommandString,
    GetDumpOutputResource,
    GetTagsOutputResource,
    ReadNdefOutputResource,
    TransmitAdapterOutputResource,
    TransmitTagOutputResource,
} from '../models/commands';
import { IApi } from '../interfaces';
import { base64ToHex } from '../helpers/base64';
import { ParamsLocale, ParamsNdefMessages, ParamsPassword, ParamsTxBytes } from '../models/jobs';
import { buildMultipleActionQueryParams } from '../helpers/common';

export class StepResult {
    command: Command;
    params: ParamsTxBytes | ParamsNdefMessages | ParamsPassword | ParamsLocale | {};
    output:
        | GetTagsOutputResource
        | ReadNdefOutputResource
        | GetDumpOutputResource
        | TransmitAdapterOutputResource
        | TransmitTagOutputResource
        | AuthPasswordOutputResource
        | {};
    status: CommandStatus;
    message: string;

    constructor(s: StepResultResource) {
        this.command = Command.parse(s.command);
        this.params = s.params;
        this.output = s.output;
        this.status = CommandStatus.parse(s.status);
        this.message = s.message;

        switch (s.command) {
            case CommandString.SetPassword:
                (this.params as ParamsPassword).password = base64ToHex((s.params as ParamsPassword).password);
                break;
            case CommandString.TransmitTag:
            case CommandString.TransmitAdapter:
                (this.params as ParamsTxBytes).tx_bytes = base64ToHex((s.params as ParamsTxBytes).tx_bytes);

                if (s.output) {
                    (this.output as TransmitTagOutputResource | TransmitAdapterOutputResource).rx_bytes = base64ToHex(
                        (s.output as TransmitTagOutputResource | TransmitAdapterOutputResource).rx_bytes,
                    );
                }
                break;
            case CommandString.AuthPassword:
                (this.params as ParamsPassword).password = base64ToHex((s.params as ParamsPassword).password);

                if (s.output) {
                    (this.output as AuthPasswordOutputResource).ack = base64ToHex(
                        (s.output as AuthPasswordOutputResource).ack,
                    );
                }
                break;
            default:
                break;
        }
    }
}

export class JobRun {
    runID: string;
    jobID: string;
    jobName: string;
    status: JobRunStatus;
    adapterID: string;
    adapterName: string;
    tag: Tag;
    results: StepResult[];
    createdAt: Date;

    constructor(e: JobRunResource) {
        this.createdAt = new Date(e.created_at);
        this.runID = e.run_id;
        this.jobID = e.job_id;
        this.jobName = e.job_name;
        this.status = JobRunStatus.parse(e.status);
        this.adapterID = e.adapter_id;
        this.adapterName = e.adapter_name;
        this.tag = new Tag(e.tag);
        this.results = e.results.map(s => new StepResult(s));
    }
}

export default class RunService {
    private readonly url: string;
    private api: IApi;
    private path = '/runs';
    private basePath = '/adapters';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Get Run list for adapter with all details
    getAll = (adapterId: string): Promise<ListResponse<JobRun>> => this.getFiltered(adapterId, {});

    // Get Run list for adapter with all details
    // adapterId – Unique identifier in form of UUID representing a specific adapter.
    // filter.status – Runs' status filter.
    // filter.job_id – Filter Run by specified Job
    // filter.limit – Limit number of events in response.
    // filter.offset – Offset from start of list.
    // filter.sortBy – Sort field for list.
    // filter.sortDir – Sort direction for list
    getFiltered = (adapterId: string, filter: RunFilter): Promise<ListResponse<JobRun>> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + buildJobRunsQueryParams(filter);

        return this.api
            .call<JobRunListResource>(({ get }) => get(url, {}))
            .then<ListResponse<JobRun>>(resp => ({
                pagInfo: new PaginationInfo(resp),
                items: resp.items.map(j => new JobRun(j)),
            }))
            .catch((err: Error) => {
                throw new Error('Error on job runs get filtered: ' + JSON.stringify(err));
            });
    };

    // Get all specefied jobrun's details
    // runId – Unique identifier in form of UUID representing a specific job run.
    // adapterId – Unique identifier in form of UUID representing a specific adapter.
    get = (adapterId: string, runId: string): Promise<JobRun> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + '/' + runId;

        return this.api
            .call<JobRunResource>(({ get }) => get(url, {}))
            .then<JobRun>(resp => new JobRun(resp))
            .catch((err: Error) => {
                throw new Error('Error on job run get: ' + JSON.stringify(err));
            });
    };

    // Delete all jobs from adapter
    // adapterId – Unique identifier in form of UUID representing a specific adapter.
    // keyword - Filter keyword.
    // ids - Stringified array of ID's to reset (can be empty)
    deleteAll = (adapterId: string, keyword?: string, ids?: string): Promise<{}> => {
        const url =
            `${this.url}${this.basePath}/${adapterId}${this.path}` + buildMultipleActionQueryParams(keyword, ids);

        return this.api
            .call<{}>(({ del }) => del(url, {}))
            .catch((err: Error) => {
                throw new Error('Error on runs delete all: ' + JSON.stringify(err));
            });
    };

    // Delete job from adapter
    // adapterId – Unique identifier in form of UUID representing a specific adapter.
    // runId – Unique identifier in form of UUID representing a specific job run.
    delete = (adapterId: string, runId: string): Promise<{}> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + '/' + runId;

        return this.api
            .call<{}>(({ del }) => del(url, {}))
            .catch((err: Error) => {
                throw new Error('Error on run delete: ' + JSON.stringify(err));
            });
    };
}
