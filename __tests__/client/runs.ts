import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import RunService, { JobRun, StepResult } from '../../src/client/runs';
import { JobRunListResource, JobRunResource, JobRunStatus, StepResultResource } from '../../src/models/run';
import { TagType } from '../../src/models/tags';
import { Command, CommandStatus, CommandString } from '../../src/models/commands';
import { Tag } from '../../src/client/tags';

afterEach(() => {
    mockAxios.reset();
});

const tagR = {
    tag_id: 'test',
    kind: 'test',
    href: 'test',
    type: TagType.toString(TagType.Bluetooth),
    adapter_id: 'test',
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
                        run_id: 'string',
                        kind: 'string',
                        href: 'string',
                        job_id: 'string',
                        job_name: 'string',
                        status: JobRunStatus.toString(JobRunStatus.Success),
                        adapter_id: 'string',
                        adapter_name: 'string',
                        tag: tagR,
                        results: [
                            {
                                command: CommandString.GetDump,
                                params: {},
                                output: {
                                    memory_dump: [
                                        {
                                            page: 'string',
                                            data: 'string',
                                            info: 'string',
                                        },
                                    ],
                                },
                                status: CommandStatus.toString(CommandStatus.Success),
                                message: 'string',
                            },
                        ] as StepResultResource[],
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
                            command: CommandString.GetDump,
                            params: {},
                            output: {
                                memory_dump: [
                                    {
                                        page: 'string',
                                        data: 'string',
                                        info: 'string',
                                    },
                                ],
                            },
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
                run_id: 'string',
                kind: 'string',
                href: 'string',
                job_id: 'string',
                job_name: 'string',
                status: JobRunStatus.toString(JobRunStatus.Success),
                adapter_id: 'string',
                adapter_name: 'string',
                tag: tagR,
                results: [
                    {
                        command: CommandString.FormatDefault,
                        params: {},
                        output: {},
                        status: CommandStatus.toString(CommandStatus.Success),
                        message: 'string',
                    },
                ] as StepResultResource[],
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
                    command: CommandString.FormatDefault,
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
            run_id: 'string',
            kind: 'string',
            href: 'string',
            job_id: 'string',
            job_name: 'string',
            status: JobRunStatus.toString(JobRunStatus.Success),
            adapter_id: 'string',
            adapter_name: 'string',
            tag: tagR,
            results: [
                {
                    command: Command.toString(Command.FormatDefault),
                    params: {},
                    output: {},
                    status: CommandStatus.toString(CommandStatus.Success),
                    message: 'string',
                },
            ] as StepResultResource[],
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
                    command: CommandString.FormatDefault,
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
            command: CommandString.FormatDefault,
            params: {},
            output: {},
            status: CommandStatus.toString(CommandStatus.Success),
            message: 'string',
        };

        const s = new StepResult(sR as StepResultResource);
        expect(s).toBeInstanceOf(StepResult);
        expect(s).toEqual({
            command: Command.FormatDefault,
            params: {},
            output: {},
            status: CommandStatus.Success,
            message: 'string',
        });
    });
});
