import { PaginationListResource } from './pagination';
import { CommandString } from './commands';
import { NdefRecordResource } from './ndefconv';

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

export type ParamsTxBytes = {
    tx_bytes: string;
};

export type ParamsNdefMessages = {
    message: NdefRecordResource[];
};

export type ParamsPassword = {
    password: string;
};

export type ParamsLocale = { locale: string };

export type JobStepResourceParamsMap = {
    [CommandString.Unknown]: {};
    [CommandString.GetTags]: {};
    [CommandString.ReadNdef]: {};
    [CommandString.FormatDefault]: {};
    [CommandString.LockPermanent]: {};
    [CommandString.GetDump]: {};
    [CommandString.TransmitAdapter]: ParamsTxBytes;
    [CommandString.TransmitTag]: ParamsTxBytes;
    [CommandString.WriteNdef]: ParamsNdefMessages;
    [CommandString.SetPassword]: ParamsPassword;
    [CommandString.AuthPassword]: ParamsPassword;
    [CommandString.SetLocale]: ParamsLocale;
    [CommandString.RemovePassword]: {};
};

export type JobStepResource =
    | {
          command: CommandString.GetTags;
          params: JobStepResourceParamsMap[CommandString.GetTags];
      }
    | {
          command: CommandString.TransmitAdapter;
          params: JobStepResourceParamsMap[CommandString.TransmitAdapter];
      }
    | {
          command: CommandString.TransmitTag;
          params: JobStepResourceParamsMap[CommandString.TransmitTag];
      }
    | {
          command: CommandString.WriteNdef;
          params: JobStepResourceParamsMap[CommandString.WriteNdef];
      }
    | { command: CommandString.ReadNdef; params: JobStepResourceParamsMap[CommandString.ReadNdef] }
    | { command: CommandString.FormatDefault; params: JobStepResourceParamsMap[CommandString.FormatDefault] }
    | { command: CommandString.LockPermanent; params: JobStepResourceParamsMap[CommandString.LockPermanent] }
    | {
          command: CommandString.SetPassword;
          params: JobStepResourceParamsMap[CommandString.SetPassword];
      }
    | { command: CommandString.RemovePassword; params: JobStepResourceParamsMap[CommandString.RemovePassword] }
    | {
          command: CommandString.AuthPassword;
          params: JobStepResourceParamsMap[CommandString.AuthPassword];
      }
    | { command: CommandString.GetDump; params: JobStepResourceParamsMap[CommandString.GetDump] }
    | { command: CommandString.SetLocale; params: JobStepResourceParamsMap[CommandString.SetLocale] };

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

export interface JobFilter {
    status?: JobStatus;
    sortBy?: string;
    sortDir?: string;
    offset?: number;
    keyword?: string;
    limit?: number;
}
