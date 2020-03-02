import { PaginationListResource } from './pagination';

export enum JobStatus {
    Unknown,
    Pending,
    Active,
}

export namespace JobStatus {
    export function toString(status: JobStatus): string {
        const names = ['unknown', 'pending', 'active'];
        if (status < JobStatus.Pending || status > JobStatus.Active) {
            return names[0];
        }
        return names[status];
    }

    export function parse(s: string): JobStatus {
        switch (s) {
            case JobStatus.toString(JobStatus.Pending):
                return JobStatus.Pending;
            case JobStatus.toString(JobStatus.Active):
                return JobStatus.Active;
        }
        return JobStatus.Unknown;
    }
}

export interface JobStepResource {
    command: string;
    params: object;
}

export interface JobResource {
    job_id: string;
    kind: string;
    href: string;
    job_name: string;
    status: string;
    adapter_id: string;
    adapter_name: string;
    repeat: number;
    total_runs: number;
    success_runs: number;
    error_runs: number;
    expire_after: number;
    steps: JobStepResource[];
    created_at: string;
}

export type JobListResource = {
    readonly items: JobResource[];
} & PaginationListResource;

export interface NewJob {
    job_name: string;
    repeat: number;
    expire_after: number;
    steps: JobStepResource[];
}

export interface JobStatusUpdate {
    status: string;
}

export interface JobFilter {
    status?: JobStatus;
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    limit?: number;
}
