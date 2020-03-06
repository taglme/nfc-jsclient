import { PaginationListResource } from './pagination';
import { TagResource } from './tags';
import { CommandOutputResourceMap, CommandString } from './commands';
import { JobStepResourceParamsMap } from './jobs';

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

export type StepResultResource = {
    status: string;
    message: string;
} & (
    | {
          command: CommandString.GetTags;
          output: CommandOutputResourceMap[CommandString.GetTags];
          params: JobStepResourceParamsMap[CommandString.GetTags];
      }
    | {
          command: CommandString.TransmitAdapter;
          output: CommandOutputResourceMap[CommandString.TransmitAdapter];
          params: JobStepResourceParamsMap[CommandString.TransmitAdapter];
      }
    | {
          command: CommandString.TransmitTag;
          output: CommandOutputResourceMap[CommandString.TransmitTag];
          params: JobStepResourceParamsMap[CommandString.TransmitTag];
      }
    | {
          command: CommandString.WriteNdef;
          output: CommandOutputResourceMap[CommandString.WriteNdef];
          params: JobStepResourceParamsMap[CommandString.WriteNdef];
      }
    | {
          command: CommandString.ReadNdef;
          output: CommandOutputResourceMap[CommandString.ReadNdef];
          params: JobStepResourceParamsMap[CommandString.ReadNdef];
      }
    | {
          command: CommandString.FormatDefault;
          output: CommandOutputResourceMap[CommandString.FormatDefault];
          params: JobStepResourceParamsMap[CommandString.FormatDefault];
      }
    | {
          command: CommandString.LockPermanent;
          output: CommandOutputResourceMap[CommandString.LockPermanent];
          params: JobStepResourceParamsMap[CommandString.LockPermanent];
      }
    | {
          command: CommandString.SetPassword;
          output: CommandOutputResourceMap[CommandString.SetPassword];
          params: JobStepResourceParamsMap[CommandString.SetPassword];
      }
    | {
          command: CommandString.RemovePassword;
          output: CommandOutputResourceMap[CommandString.RemovePassword];
          params: JobStepResourceParamsMap[CommandString.RemovePassword];
      }
    | {
          command: CommandString.AuthPassword;
          output: CommandOutputResourceMap[CommandString.AuthPassword];
          params: JobStepResourceParamsMap[CommandString.AuthPassword];
      }
    | {
          command: CommandString.GetDump;
          output: CommandOutputResourceMap[CommandString.GetDump];
          params: JobStepResourceParamsMap[CommandString.GetDump];
      }
    | {
          command: CommandString.SetLocale;
          output: CommandOutputResourceMap[CommandString.SetLocale];
          params: JobStepResourceParamsMap[CommandString.SetLocale];
      }
);

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
