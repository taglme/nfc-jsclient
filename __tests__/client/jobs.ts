import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import { Command, CommandString } from '../../src/models/commands';
import JobService, { Job, JobStep } from '../../src/client/jobs';
import { JobListResource, JobResource, JobStatus, JobStepResource } from '../../src/models/jobs';

afterEach(() => {
    mockAxios.reset();
});

const sR: JobStepResource = {
    command: CommandString.GetTags,
    params: {},
};

const jR: JobResource = {
    job_id: 'string',
    kind: 'string',
    href: 'string',
    job_name: 'string',
    status: JobStatus.toString(JobStatus.Active),
    adapter_id: 'string',
    adapter_name: 'string',
    repeat: 1,
    total_runs: 1,
    success_runs: 1,
    error_runs: 1,
    expire_after: 1,
    steps: [sR],
    created_at: '2020-03-03T10:12:03.881Z',
};

describe('JobService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new JobService(api, 'url');
        expect(a).toBeInstanceOf(JobService);
    });

    it('getFiltered', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new JobService(api, 'url');
        a.getFiltered('aId', { status: JobStatus.Active })
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId/jobs?status=active',
        });

        const responseObj = {
            data: {
                total: 1,
                length: 1,
                limit: 1,
                offset: 1,
                items: [jR],
            } as JobListResource,
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
                    jobID: 'string',
                    jobName: 'string',
                    status: JobStatus.Active,
                    adapterID: 'string',
                    adapterName: 'string',
                    repeat: 1,
                    totalRuns: 1,
                    successRuns: 1,
                    errorRuns: 1,
                    expireAfter: 1,
                    steps: [
                        new JobStep({
                            command: CommandString.GetTags,
                            params: {},
                        }),
                    ],
                    createdAt: new Date('2020-03-03T10:12:03.881Z'),
                },
            ],
        });

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('add', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new JobService(api, 'url');
        a.add('aId', {
            job_name: 'name',
            repeat: 1,
            expire_after: 1,
            steps: [sR],
        })
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: {
                job_name: 'name',
                repeat: 1,
                expire_after: 1,
                steps: [sR],
            },
            headers: { common: [] },
            method: 'post',
            params: undefined,
            url: 'url/adapters/aId/jobs',
        });

        const responseObj = {
            data: jR,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            jobID: 'string',
            jobName: 'string',
            status: JobStatus.Active,
            adapterID: 'string',
            adapterName: 'string',
            repeat: 1,
            totalRuns: 1,
            successRuns: 1,
            errorRuns: 1,
            expireAfter: 1,
            steps: [
                new JobStep({
                    command: CommandString.GetTags,
                    params: {},
                }),
            ],
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('deleteAll', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new JobService(api, 'url');
        a.deleteAll('aId')
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'delete',
            params: undefined,
            url: 'url/adapters/aId/jobs',
        });

        mockAxios.mockResponse({ data: {} });

        expect(thenFn).toHaveBeenCalledWith({});

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('delete', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new JobService(api, 'url');
        a.delete('aId', 'jId')
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'delete',
            params: undefined,
            url: 'url/adapters/aId/jobs/jId',
        });

        mockAxios.mockResponse({ data: {} });

        expect(thenFn).toHaveBeenCalledWith({});

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('update status', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new JobService(api, 'url');
        a.updateStatus('aId', 'jId', JobStatus.Active)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: { status: JobStatus.toString(JobStatus.Active) },
            headers: { common: [] },
            method: 'patch',
            params: undefined,
            url: 'url/adapters/aId/jobs/jId',
        });

        mockAxios.mockResponse({
            data: jR,
        });

        expect(thenFn).toHaveBeenCalledWith({
            jobID: 'string',
            jobName: 'string',
            status: JobStatus.Active,
            adapterID: 'string',
            adapterName: 'string',
            repeat: 1,
            totalRuns: 1,
            successRuns: 1,
            errorRuns: 1,
            expireAfter: 1,
            steps: [
                new JobStep({
                    command: CommandString.GetTags,
                    params: {},
                }),
            ],
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });

        expect(catchFn).not.toHaveBeenCalled();
    });
});

describe('Job', () => {
    it('Instance created', () => {
        const e = new Job(jR);
        expect(e).toBeInstanceOf(Job);
        expect(e).toEqual({
            jobID: 'string',
            jobName: 'string',
            status: JobStatus.Active,
            adapterID: 'string',
            adapterName: 'string',
            repeat: 1,
            totalRuns: 1,
            successRuns: 1,
            errorRuns: 1,
            expireAfter: 1,
            steps: [
                new JobStep({
                    command: CommandString.GetTags,
                    params: {},
                }),
            ],
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });
    });
});

describe('JobStep', () => {
    it('Instance created', () => {
        const s = new JobStep(sR);
        expect(s).toBeInstanceOf(JobStep);
        expect(s).toEqual({
            command: Command.GetTags,
            params: {},
        });
    });
});
