import { PaginationListResource } from '../pagination';

export enum Command {
    Unknown,
    GetTags,
    TransmitAdapter,
    TransmitTag,
    WriteNdef,
    ReadNdef,
    FormatDefault,
    LockPermanent,
    SetPassword,
    RemovePassword,
    AuthPassword,
    GetDump,
    SetLocale,
}

export namespace Command {
    export function toString(c: Command): string {
        const names = [
            'unknown',
            'get_tags',
            'transmit_adapter',
            'transmit_tag',
            'write_ndef',
            'read_ndef',
            'format_default',
            'lock_permanent',
            'set_password',
            'remove_password',
            'auth_password',
            'get_dump',
            'set_locale',
        ];

        if (c < Command.GetTags || c > Command.SetLocale) {
            return names[0];
        }
        return names[c];
    }

    export function parse(s: string): Command {
        switch (s) {
            case Command.toString(Command.GetTags):
                return Command.GetTags;
            case Command.toString(Command.TransmitAdapter):
                return Command.TransmitAdapter;
            case Command.toString(Command.TransmitTag):
                return Command.TransmitTag;
            case Command.toString(Command.WriteNdef):
                return Command.WriteNdef;
            case Command.toString(Command.ReadNdef):
                return Command.ReadNdef;
            case Command.toString(Command.FormatDefault):
                return Command.FormatDefault;
            case Command.toString(Command.LockPermanent):
                return Command.LockPermanent;
            case Command.toString(Command.SetPassword):
                return Command.SetPassword;
            case Command.toString(Command.RemovePassword):
                return Command.RemovePassword;
            case Command.toString(Command.AuthPassword):
                return Command.AuthPassword;
            case Command.toString(Command.GetDump):
                return Command.GetDump;
            case Command.toString(Command.SetLocale):
                return Command.SetLocale;
        }

        return Command.Unknown;
    }
}

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
