import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import LicenseService, { License, ApplicationLicense } from '../../src/client/license';
import { LicenseResource } from '../../src/models/license';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('LicenseService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const s = new LicenseService(api, 'url');
        expect(s).toBeInstanceOf(LicenseService);
    });

    it('get', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        const s = new LicenseService(api, 'url');

        const resp: LicenseResource = {
            start: '2024-01-01',
            end: '2025-01-01',
            support: '2025-01-01',
            features: ['Nfcd'],
            id: 'LIC-1',
            owner: 'Owner',
            email: 'o@example.com',
            machine: 'MID',
            type: 'standard',
            host_tier: 'pro',
            applications: [
                {
                    id: 'app-1',
                    name: 'App 1',
                    type: 'standard',
                    start: '2024-01-01',
                    end: '2025-01-01',
                    support: '2025-01-01',
                },
            ],
        };

        mock.onGet('url/licenses').reply(200, resp);

        const lic = await s.get();
        expect(lic).toBeInstanceOf(License);
        expect(lic).toEqual(
            expect.objectContaining({
                id: 'LIC-1',
                hostTier: 'pro',
                applications: [expect.any(ApplicationLicense)],
            }),
        );
    });

    it('getMID', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const s = new LicenseService(api, 'url');

        mock.onGet('url/licenses/mid').reply(200, { mid: 'MID123' });
        await expect(s.getMID()).resolves.toEqual('MID123');
    });

    it('getAccess', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const s = new LicenseService(api, 'url');

        const resp: LicenseResource = {
            start: '2024-01-01',
            end: '2025-01-01',
            support: '2025-01-01',
            plugins: ['Nfcd'],
            id: 'LIC-1',
            owner: 'Owner',
            email: 'o@example.com',
            machine: 'MID123',
            type: 'standard',
            host_tier: 'pro',
            applications: [],
            policies: {
                nfcd: {
                    allowed_scopes: ['job:create'],
                    create_job_rate_limit: { min_interval_ms: 10, window_ms: 1000, max_in_window: 2 },
                    job_capabilities: { allow_repeat: true, allow_batch: true, allow_multistep: true },
                    create_job_constraints: { max_repeat: 10, max_steps: 5, max_queued_jobs_per_adapter: 1 },
                },
            },
        };

        mock.onGet('url/licenses/access').reply(200, resp);
        await expect(s.getAccess()).resolves.toEqual(
            expect.objectContaining({
                hostTier: 'pro',
                machine: 'MID123',
            }),
        );
    });
});
