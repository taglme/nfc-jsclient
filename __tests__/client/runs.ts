import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import { Event } from '../../src/client/events';
import { EventName, EventResource } from '../../src/models/events';
import RunService, { JobRun, StepResult } from '../../src/client/runs';
import { JobRunListResource, JobRunResource, JobRunStatus, StepResultResource } from '../../src/models/run';
import { TagType } from '../../src/models/tags';
import { Command, CommandStatus } from '../../src/models/commands';
import { Tag } from '../../src/client/tags';

afterEach(() => {
    mockAxios.reset();
});

const tagR = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    tag_id: 'test',
    kind: 'test',
    href: 'test',
    type: TagType.toString(TagType.Bluetooth),
    // eslint-disable-next-line @typescript-eslint/camelcase
    adapter_id: 'test',
    // eslint-disable-next-line @typescript-eslint/camelcase
    adapter_name: 'test',
    uid: 'za7VbYcSQU2zRgGQXQAm/g==',
    atr: 'za7VbYcSQU2zRgGQXQAm/g==',
    product: 'test',
    vendor: 'test',
};

describe('RunService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new RunService(api, 'url');
        expect(a).toBeInstanceOf(RunService);
    });

    it('getFiltered', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new RunService(api, 'url');
        a.getFiltered('aId', { status: JobRunStatus.Started })
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId/runs?status=started',
        });

        const responseObj = {
            data: {
                total: 1,
                length: 1,
                limit: 1,
                offset: 1,
                items: [
                    {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        run_id: 'string',
                        kind: 'string',
                        href: 'string',
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        job_id: 'string',
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        job_name: 'string',
                        status: JobRunStatus.toString(JobRunStatus.Success),
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        adapter_id: 'string',
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        adapter_name: 'string',
                        tag: tagR,
                        results: [
                            {
                                command: Command.toString(Command.GetDump),
                                params: {},
                                output: {},
                                status: CommandStatus.toString(CommandStatus.Success),
                                message: 'string',
                            },
                        ] as StepResultResource[],
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        created_at: '2020-03-03T10:12:03.881Z',
                    },
                ],
            } as JobRunListResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            pagInfo: {
                total: 1,
                length: 1,
                limit: 1,
                offset: 1,
            },
            items: [
                {
                    runID: 'string',
                    jobID: 'string',
                    jobName: 'string',
                    status: JobRunStatus.Success,
                    adapterID: 'string',
                    adapterName: 'string',
                    tag: new Tag(tagR),
                    results: [
                        new StepResult({
                            command: Command.toString(Command.GetDump),
                            params: {},
                            output: {},
                            status: CommandStatus.toString(CommandStatus.Success),
                            message: 'string',
                        }),
                    ],
                    createdAt: new Date('2020-03-03T10:12:03.881Z'),
                },
            ],
        });

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('get', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new RunService(api, 'url');
        a.get('aId', 'runId')
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId/runs?status=started',
        });

        const responseObj = {
            data: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                run_id: 'string',
                kind: 'string',
                href: 'string',
                // eslint-disable-next-line @typescript-eslint/camelcase
                job_id: 'string',
                // eslint-disable-next-line @typescript-eslint/camelcase
                job_name: 'string',
                status: JobRunStatus.toString(JobRunStatus.Success),
                // eslint-disable-next-line @typescript-eslint/camelcase
                adapter_id: 'string',
                // eslint-disable-next-line @typescript-eslint/camelcase
                adapter_name: 'string',
                tag: tagR,
                results: [
                    {
                        command: Command.toString(Command.GetDump),
                        params: {},
                        output: {},
                        status: CommandStatus.toString(CommandStatus.Success),
                        message: 'string',
                    },
                ] as StepResultResource[],
                // eslint-disable-next-line @typescript-eslint/camelcase
                created_at: '2020-03-03T10:12:03.881Z',
            } as JobRunResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            runID: 'string',
            jobID: 'string',
            jobName: 'string',
            status: JobRunStatus.Success,
            adapterID: 'string',
            adapterName: 'string',
            tag: new Tag(tagR),
            results: [
                new StepResult({
                    command: Command.toString(Command.GetDump),
                    params: {},
                    output: {},
                    status: CommandStatus.toString(CommandStatus.Success),
                    message: 'string',
                }),
            ],
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });

        expect(catchFn).not.toHaveBeenCalled();
    });
});

describe('JobRun', () => {
    it('Instance created', () => {
        const eR = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            run_id: 'string',
            kind: 'string',
            href: 'string',
            // eslint-disable-next-line @typescript-eslint/camelcase
            job_id: 'string',
            // eslint-disable-next-line @typescript-eslint/camelcase
            job_name: 'string',
            status: JobRunStatus.toString(JobRunStatus.Success),
            // eslint-disable-next-line @typescript-eslint/camelcase
            adapter_id: 'string',
            // eslint-disable-next-line @typescript-eslint/camelcase
            adapter_name: 'string',
            tag: tagR,
            results: [
                {
                    command: Command.toString(Command.GetDump),
                    params: {},
                    output: {},
                    status: CommandStatus.toString(CommandStatus.Success),
                    message: 'string',
                },
            ] as StepResultResource[],
            // eslint-disable-next-line @typescript-eslint/camelcase
            created_at: '2020-03-03T10:12:03.881Z',
        };

        const e = new JobRun(eR);
        expect(e).toBeInstanceOf(JobRun);
        expect(e).toEqual({
            runID: 'string',
            jobID: 'string',
            jobName: 'string',
            status: JobRunStatus.Success,
            adapterID: 'string',
            adapterName: 'string',
            tag: new Tag(tagR),
            results: [
                new StepResult({
                    command: Command.toString(Command.GetDump),
                    params: {},
                    output: {},
                    status: CommandStatus.toString(CommandStatus.Success),
                    message: 'string',
                }),
            ],
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });
    });
});

describe('StepResult', () => {
    it('Instance created', () => {
        const sR = {
            command: Command.toString(Command.GetDump),
            params: {},
            output: {},
            status: CommandStatus.toString(CommandStatus.Success),
            message: 'string',
        };


        const s = new StepResult(sR);
        expect(s).toBeInstanceOf(StepResult);
        expect(s).toEqual({
            command: Command.GetDump,
            params: {},
            output: {},
            status: CommandStatus.Success,
            message: 'string',
        });
    });
});
