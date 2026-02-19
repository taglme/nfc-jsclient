import AboutService, { AppInfo } from '../../src/client/about';
import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('AboutService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new AboutService(api, 'url');
        expect(a).toBeInstanceOf(AboutService);
    });

    it('get', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        const a = new AboutService(api, 'url');

        mock.onGet('url/about').reply(200, {
            name: 'Name',
            host_name: 'Host-1',
            version: 'Version',
            commit: 'Commit',
            sdk_info: '',
            platform: '',
            build_time: '',
            check_success: true,
            suported: true,
            have_update: false,
            update_version: '',
            update_download: '',
            started_at: '',
        });

        const info = await a.get();
        expect(info).toBeInstanceOf(AppInfo);
        expect(info).toEqual(
            expect.objectContaining({
                name: 'Name',
                hostName: 'Host-1',
                version: 'Version',
                commit: 'Commit',
            }),
        );
    });
});
