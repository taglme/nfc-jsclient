import { PaginationListResource } from '../pagination';
import { TagResource } from '../tags/types';

export enum CommandStatus {
    Unknown,
    Success,
    Error,
}

export namespace CommandStatus {
    export function toString(status: CommandStatus): string {
        const names = ['unknown', 'success', 'error'];
        if (status < CommandStatus.Success || status > CommandStatus.Error) {
            return names[0];
        }
        return names[status];
    }

    export function parse(s: string): CommandStatus {
        switch (s) {
            case CommandStatus.toString(CommandStatus.Success):
                return CommandStatus.Success;
            case CommandStatus.toString(CommandStatus.Error):
                return CommandStatus.Error;
        }

        return CommandStatus.Unknown;
    }
}

export enum JobRunStatus {
    Unknown,
    Started,
    Success,
    Error,
}

export namespace JobRunStatus {
    export function toString(status: JobRunStatus): string {
        const names = ['unknown', 'started', 'success', 'error'];
        if (status < JobRunStatus.Started || status > JobRunStatus.Error) {
            return names[0];
        }
        return names[status];
    }

    export function parse(s: string): JobRunStatus {
        switch (s) {
            case JobRunStatus.toString(JobRunStatus.Started):
                return JobRunStatus.Started;
            case JobRunStatus.toString(JobRunStatus.Success):
                return JobRunStatus.Success;
            case JobRunStatus.toString(JobRunStatus.Error):
                return JobRunStatus.Error;
        }

        return JobRunStatus.Unknown;
    }
}

export interface StepResultResource {
    command: string;
    params: object;
    output: object;
    status: string;
    message: string;
}

export interface JobRunResource {
    run_id: string;
    kind: string;
    href: string;
    job_id: string;
    job_name: string;
    status: string;
    adapter_id: string;
    adapter_name: string;
    tag: TagResource;
    results: StepResultResource[];
    created_at: string;
}

export type JobRunListResource = {
    readonly items: JobRunResource[];
} & PaginationListResource;

export interface RunFilter {
    jobId?: string;
    status?: JobRunStatus;
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}
