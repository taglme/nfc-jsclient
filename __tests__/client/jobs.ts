import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { Command, CommandString } from '../../src/models/commands';
import JobService, { Job, JobStep } from '../../src/client/jobs';
import { JobListResource, JobResource, JobStatus, JobStepResource } from '../../src/models/jobs';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
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
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new JobService(api, 'url');
        expect(a).toBeInstanceOf(JobService);
    });

    it('getFiltered', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new JobService(api, 'url');

        mock.onGet('url/adapters/aId/jobs?status=active').reply(200, {
            total: 1,
            length: 1,
            limit: 1,
            offset: 1,
            items: [jR],
        } as JobListResource);

        await expect(a.getFiltered('aId', { status: JobStatus.Active })).resolves.toEqual({
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
    });

    it('add', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new JobService(api, 'url');

        mock.onPost('url/adapters/aId/jobs').reply(config => {
            expect(JSON.parse(config.data)).toEqual({
                job_name: 'name',
                repeat: 1,
                expire_after: 1,
                steps: [sR],
            });
            return [200, jR];
        });

        await expect(
            a.add('aId', {
                job_name: 'name',
                repeat: 1,
                expire_after: 1,
                steps: [sR],
            }),
        ).resolves.toEqual({
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

    it('deleteAll', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new JobService(api, 'url');

        mock.onDelete('url/adapters/aId/jobs').reply(200, {});
        await expect(a.deleteAll('aId')).resolves.toEqual({});
    });

    it('delete', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new JobService(api, 'url');

        mock.onDelete('url/adapters/aId/jobs/jId').reply(200, {});
        await expect(a.delete('aId', 'jId')).resolves.toEqual({});
    });

    it('update status', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new JobService(api, 'url');

        mock.onPatch('url/adapters/aId/jobs/jId').reply(config => {
            expect(JSON.parse(config.data)).toEqual({ status: JobStatus.toString(JobStatus.Active) });
            return [200, jR];
        });

        await expect(a.updateStatus('aId', 'jId', JobStatus.Active)).resolves.toEqual({
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
