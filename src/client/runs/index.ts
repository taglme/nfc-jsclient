import Api from '../../api';
import PaginationInfo, { ListResponse } from '../pagination';
import {
    JobRunResource,
    JobRunStatus,
    JobRunListResource,
    RunFilter,
    CommandStatus,
    StepResultResource,
} from './types';
import { buildJobRunsQueryParams } from './helpers';
import { Tag } from '../tags';
import { Command } from '../jobs/types';

class StepResult {
    command: Command;
    params: object;
    output: object;
    status: CommandStatus;
    message: string;

    constructor(s: StepResultResource) {
        this.command = Command.parse(s.command);
        this.params = s.params;
        this.output = s.output;
        this.status = CommandStatus.parse(s.status);
        this.message = s.message;
    }
}

class JobRun {
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

interface NewEvent {
    name: string;
    adapter_id: string;
    data?: any;
}

export default class RunService {
    private readonly url: string;
    private api: Api;
    private path = '/runs';
    private basePath = '/adapters';

    constructor(api: Api, url: string) {
        this.url = url;
        this.api = api;
    }

    getAll = (adapterId: string): Promise<ListResponse<JobRun>> => this.getFiltered(adapterId, {});

    getFiltered = (adapterId: string, filter: RunFilter): Promise<ListResponse<JobRun>> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + buildJobRunsQueryParams(filter);

        return this.api
            .call<JobRunListResource>(({ get }) => get(url, {}))
            .then<ListResponse<JobRun>>(resp => ({
                pagInfo: new PaginationInfo(resp),
                items: resp.items.map(j => new JobRun(j)),
            }));
    };

    get = (adapterId: string, runId: string): Promise<JobRun> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + '/' + runId;

        return this.api
            .call<JobRunResource>(({ post }) => post(url, {}))
            .then<JobRun>(resp => new JobRun(resp));
    };
}
