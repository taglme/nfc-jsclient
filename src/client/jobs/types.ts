export enum Command {
    CommandGetTag = 1,
    CommandTransmitAdapter,
    CommandTransmitTag,
    CommandWriteNdef,
    CommandReadNdef,
    CommandFormatDefault,
    CommandLockPermanent,
    CommandSetPassword,
    CommandRemovePassword,
    CommandAuthPassword,
    CommandGetDump,
    CommandSetLocale,
}

export enum JobStatus {
    Pending = 1,
    JobStatusActive,
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
